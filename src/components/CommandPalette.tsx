import { Command } from 'cmdk';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import {
  CircleDot,
  Code2,
  FileCode2,
  GitPullRequest,
  Home,
  Search,
  type LucideIcon,
} from 'lucide-react';
import {
  buildGotoContext,
  collectGotoCandidates,
  executeGoto,
  groupCandidates,
  suggestPaths,
  type GotoCandidate,
  type GotoIcon,
} from '@/lib/goto';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/cls';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ICONS: Record<GotoIcon, LucideIcon> = {
  code: Code2,
  issues: CircleDot,
  prs: GitPullRequest,
  path: FileCode2,
  home: Home,
  search: Search,
  repo: Code2,
};

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const toast = useToast();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [pathItems, setPathItems] = useState<GotoCandidate[]>([]);
  const [pathLoading, setPathLoading] = useState(false);
  /** Controlled selection so Enter always hits the first match after list updates. */
  const [selected, setSelected] = useState('');

  const ctx = useMemo(() => buildGotoContext(pathname), [pathname]);

  useEffect(() => {
    if (!open) {
      setQ('');
      setBusy(false);
      setPathItems([]);
      setPathLoading(false);
      setSelected('');
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === 'Escape' && open) onOpenChange(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  // Debounced path autocomplete from live repo contents
  useEffect(() => {
    if (!open || !ctx.pathNav) {
      setPathItems([]);
      setPathLoading(false);
      return;
    }
    const qtrim = q.trim();
    if (!qtrim) {
      setPathItems([]);
      setPathLoading(false);
      return;
    }

    let cancelled = false;
    setPathLoading(true);
    const handle = window.setTimeout(() => {
      void suggestPaths(ctx, qtrim)
        .then((items) => {
          if (!cancelled) setPathItems(items);
        })
        .catch(() => {
          if (!cancelled) setPathItems([]);
        })
        .finally(() => {
          if (!cancelled) setPathLoading(false);
        });
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [open, q, ctx]);

  const syncItems = useMemo(
    () => collectGotoCandidates(q, ctx),
    [q, ctx],
  );

  const items = useMemo(() => {
    // Path suggestions first, then other goto providers
    const seen = new Set(pathItems.map((i) => i.id));
    const rest = syncItems.filter((i) => !seen.has(i.id));
    return [...pathItems, ...rest];
  }, [pathItems, syncItems]);

  const groups = useMemo(() => groupCandidates(items), [items]);

  // Keep first item selected when the list rebuilds (async paths, typing).
  // Without this, Enter does nothing until the user arrows.
  useEffect(() => {
    if (items.length === 0) {
      setSelected('');
      return;
    }
    const stillThere = items.some((i) => i.value === selected);
    if (!stillThere) {
      setSelected(items[0]!.value);
    }
  }, [items, selected]);

  if (!open) return null;

  const selectByValue = async (value: string) => {
    const item = items.find((i) => i.value === value);
    if (!item || busy) return;
    setBusy(true);
    try {
      const result = await executeGoto(item.action, {
        navigate: (to) => navigate({ href: to }),
        toastError: (title, detail) => toast.error(title, detail),
      });
      if (result === 'navigated') onOpenChange(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box p-0 overflow-hidden w-full max-w-lg">
        <Command
          label="Command palette"
          className="bg-base-100"
          shouldFilter={false}
          value={selected}
          onValueChange={setSelected}
          // Remount item tree identity when list identity shifts so selection applies
          loop
        >
          <Command.Input
            value={q}
            onValueChange={setQ}
            placeholder={
              ctx.pathNav
                ? 'Path autocomplete: src  DESIGN  ../  ·  /code · owner/repo'
                : '/code /issues /prs  ·  owner/repo  ·  search…'
            }
            className="input input-bordered w-full rounded-none border-0 border-b border-base-300 focus:outline-none"
            autoFocus
            disabled={busy}
          />
          <Command.List className="max-h-[min(60vh,24rem)] overflow-auto p-2">
            <Command.Empty className="p-3 text-sm opacity-60">
              {busy
                ? 'Going…'
                : pathLoading
                  ? 'Loading paths…'
                  : 'No matches'}
            </Command.Empty>
            {Object.entries(groups).map(([group, list]) => (
              <Command.Group
                key={group}
                heading={group}
                className="text-xs [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:opacity-50 [&_[cmdk-group-heading]]:font-medium"
              >
                {list.map((item) => {
                  const Icon = item.icon ? ICONS[item.icon] : undefined;
                  return (
                    <Command.Item
                      key={item.id}
                      value={item.value}
                      disabled={busy}
                      onSelect={(value) => void selectByValue(value)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded cursor-pointer',
                        'aria-selected:bg-base-200 data-[selected=true]:bg-base-200',
                      )}
                    >
                      {Icon ? (
                        <Icon className="size-4 shrink-0 opacity-70" />
                      ) : null}
                      <span className="min-w-0 flex-1 truncate">
                        {item.label}
                      </span>
                      {item.hint ? (
                        <span className="text-xs opacity-50 shrink-0 font-mono">
                          {item.hint}
                        </span>
                      ) : null}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
      <button
        type="button"
        className="modal-backdrop bg-black/40"
        onClick={() => onOpenChange(false)}
        aria-label="Close"
      />
    </div>
  );
}
