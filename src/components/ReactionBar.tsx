import {
  graphql,
  useFragment,
  useMutation,
} from 'react-relay';
import { useId, useState, type CSSProperties } from 'react';
import { SmilePlus } from 'lucide-react';
import type {
  ReactionBar_reactable$key,
  ReactionContent,
} from './__generated__/ReactionBar_reactable.graphql';
import type { ReactionBarAddMutation } from './__generated__/ReactionBarAddMutation.graphql';
import type { ReactionBarRemoveMutation } from './__generated__/ReactionBarRemoveMutation.graphql';
import { useToast } from '@/lib/toast';
import { cn } from '@/lib/cls';

type KnownReaction = Exclude<ReactionContent, '%future added value'>;

const REACTIONS: ReadonlyArray<{
  content: KnownReaction;
  emoji: string;
  label: string;
}> = [
  { content: 'THUMBS_UP', emoji: '👍', label: 'Thumbs up' },
  { content: 'THUMBS_DOWN', emoji: '👎', label: 'Thumbs down' },
  { content: 'LAUGH', emoji: '😄', label: 'Laugh' },
  { content: 'HOORAY', emoji: '🎉', label: 'Hooray' },
  { content: 'CONFUSED', emoji: '😕', label: 'Confused' },
  { content: 'HEART', emoji: '❤️', label: 'Heart' },
  { content: 'ROCKET', emoji: '🚀', label: 'Rocket' },
  { content: 'EYES', emoji: '👀', label: 'Eyes' },
];

const REACTION_META = Object.fromEntries(
  REACTIONS.map((r) => [r.content, r]),
) as Record<KnownReaction, (typeof REACTIONS)[number]>;

const fragment = graphql`
  fragment ReactionBar_reactable on Reactable {
    id
    viewerCanReact
    reactionGroups {
      content
      viewerHasReacted
      reactors(first: 1) {
        totalCount
      }
    }
  }
`;

const addMutation = graphql`
  mutation ReactionBarAddMutation($subjectId: ID!, $content: ReactionContent!) {
    addReaction(input: { subjectId: $subjectId, content: $content }) {
      subject {
        __typename
        ... on Reactable {
          id
          ...ReactionBar_reactable
        }
      }
    }
  }
`;

const removeMutation = graphql`
  mutation ReactionBarRemoveMutation(
    $subjectId: ID!
    $content: ReactionContent!
  ) {
    removeReaction(input: { subjectId: $subjectId, content: $content }) {
      subject {
        __typename
        ... on Reactable {
          id
          ...ReactionBar_reactable
        }
      }
    }
  }
`;

type Props = {
  reactable: ReactionBar_reactable$key;
  className?: string;
};

/**
 * GitHub reaction chips + picker (👍 👎 😄 🎉 😕 ❤️ 🚀 👀).
 * Toggles via addReaction / removeReaction; store updates via fragment.
 */
export function ReactionBar({ reactable, className }: Props) {
  const toast = useToast();
  const data = useFragment(fragment, reactable);
  const [commitAdd, addBusy] =
    useMutation<ReactionBarAddMutation>(addMutation);
  const [commitRemove, removeBusy] =
    useMutation<ReactionBarRemoveMutation>(removeMutation);
  const busy = addBusy || removeBusy;
  const pickerId = `react-pick-${useId().replace(/:/g, '')}`;
  const pickerAnchor = `--${pickerId}`;
  const [pending, setPending] = useState<KnownReaction | null>(null);

  const groups = (data.reactionGroups ?? []).filter(
    (g): g is NonNullable<typeof g> => g != null,
  );
  const visible = groups.filter((g) => (g.reactors?.totalCount ?? 0) > 0);
  const canReact = Boolean(data.viewerCanReact);

  const toggle = (content: KnownReaction, hasReacted: boolean) => {
    if (!canReact || busy) return;
    setPending(content);
    const vars = { subjectId: data.id, content };
    const onDone = () => setPending(null);
    const onError = (e: Error) => {
      setPending(null);
      toast.error(
        hasReacted ? 'Could not remove reaction' : 'Could not add reaction',
        e.message,
      );
    };
    if (hasReacted) {
      commitRemove({ variables: vars, onCompleted: onDone, onError });
    } else {
      commitAdd({ variables: vars, onCompleted: onDone, onError });
    }
  };

  const closePicker = () => {
    const el = document.getElementById(pickerId);
    if (el && 'hidePopover' in el) {
      try {
        (el as HTMLElement & { hidePopover: () => void }).hidePopover();
      } catch {
        /* already closed */
      }
    }
  };

  if (!canReact && visible.length === 0) return null;

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-1 mt-2',
        className,
      )}
    >
      {visible.map((g) => {
        if (g.content === '%future added value') return null;
        const content = g.content as KnownReaction;
        const meta = REACTION_META[content];
        if (!meta) return null;
        const count = g.reactors?.totalCount ?? 0;
        const mine = Boolean(g.viewerHasReacted);
        return (
          <button
            key={content}
            type="button"
            className={cn(
              'btn btn-xs gap-1 font-normal tabular-nums',
              mine ? 'btn-primary' : 'btn-ghost border border-base-300',
            )}
            disabled={!canReact || busy}
            aria-pressed={mine}
            title={
              mine
                ? `Remove your ${meta.label} reaction`
                : `React with ${meta.label}`
            }
            onClick={() => toggle(content, mine)}
          >
            <span aria-hidden>{meta.emoji}</span>
            <span>{count}</span>
            {pending === content && busy ? (
              <span className="loading loading-spinner loading-xs" />
            ) : null}
          </button>
        );
      })}

      {canReact ? (
        <>
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square"
            popoverTarget={pickerId}
            style={{ anchorName: pickerAnchor } as CSSProperties}
            disabled={busy}
            title="Add reaction"
            aria-label="Add reaction"
          >
            <SmilePlus className="size-3.5" aria-hidden />
          </button>
          <div
            id={pickerId}
            popover="auto"
            className={cn(
              'dropdown',
              'rounded-box bg-base-100 p-1.5 shadow border border-base-300',
              'flex flex-wrap gap-0.5 max-w-[12rem]',
            )}
            style={
              {
                positionAnchor: pickerAnchor,
                positionArea: 'top span-right',
                positionTryFallbacks: 'flip-block, flip-inline',
              } as CSSProperties
            }
          >
            {REACTIONS.map((r) => {
              const group = groups.find((g) => g.content === r.content);
              const mine = Boolean(group?.viewerHasReacted);
              return (
                <button
                  key={r.content}
                  type="button"
                  className={cn(
                    'btn btn-ghost btn-sm btn-square text-base',
                    mine && 'btn-active',
                  )}
                  title={mine ? `Remove ${r.label}` : r.label}
                  aria-label={r.label}
                  disabled={busy}
                  popoverTarget={pickerId}
                  popoverTargetAction="hide"
                  onClick={() => {
                    closePicker();
                    toggle(r.content, mine);
                  }}
                >
                  <span aria-hidden>{r.emoji}</span>
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
