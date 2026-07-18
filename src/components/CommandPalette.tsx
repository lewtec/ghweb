import { Command } from 'cmdk';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { githubUrlToAppPath } from '@/lib/githubUrl';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: Props) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  useEffect(() => {
    if (!open) setQ('');
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

  if (!open) return null;

  const go = (path: string) => {
    onOpenChange(false);
    void navigate({ to: path });
  };

  const asGithub = githubUrlToAppPath(q);
  const searchPath = `/search?q=${encodeURIComponent(q)}`;

  return (
    <div className="modal modal-open">
      <div className="modal-box p-0 overflow-hidden max-w-lg">
        <Command label="Command palette" className="bg-base-100">
          <Command.Input
            value={q}
            onValueChange={setQ}
            placeholder="Jump to repo, paste github.com URL, or search…"
            className="input input-bordered w-full rounded-none border-0 border-b border-base-300 focus:outline-none"
            autoFocus
          />
          <Command.List className="max-h-72 overflow-auto p-2">
            <Command.Empty className="p-3 text-sm opacity-60">
              Type a query or owner/repo
            </Command.Empty>
            <Command.Item
              value="home"
              onSelect={() => go('/')}
              className="px-3 py-2 rounded cursor-pointer aria-selected:bg-base-200"
            >
              Home
            </Command.Item>
            {asGithub ? (
              <Command.Item
                value={`open ${asGithub}`}
                onSelect={() => go(asGithub)}
                className="px-3 py-2 rounded cursor-pointer aria-selected:bg-base-200"
              >
                Open {asGithub}
              </Command.Item>
            ) : null}
            {q.includes('/') && !q.includes(' ') ? (
              <Command.Item
                value={`repo ${q}`}
                onSelect={() => go(`/${q.replace(/^\/+/, '')}`)}
                className="px-3 py-2 rounded cursor-pointer aria-selected:bg-base-200"
              >
                Repo /{q.replace(/^\/+/, '')}
              </Command.Item>
            ) : null}
            {q.trim() ? (
              <Command.Item
                value={`search ${q}`}
                onSelect={() => go(searchPath)}
                className="px-3 py-2 rounded cursor-pointer aria-selected:bg-base-200"
              >
                Search “{q.trim()}”
              </Command.Item>
            ) : null}
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
