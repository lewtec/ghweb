import { Link } from '@tanstack/react-router';
import { Code2, CircleDot, GitPullRequest } from 'lucide-react';
import { cn } from '@/lib/cls';

type Props = {
  owner: string;
  name: string;
  className?: string;
};

const items = [
  { to: '/$owner/$name' as const, label: 'Code', icon: Code2, end: true },
  {
    to: '/$owner/$name/issues' as const,
    label: 'Issues',
    icon: CircleDot,
    end: false,
  },
  {
    to: '/$owner/$name/pulls' as const,
    label: 'PRs',
    icon: GitPullRequest,
    end: false,
  },
];

export function RepoSideNav({ owner, name, className }: Props) {
  return (
    <nav className={cn('menu menu-sm p-2 gap-0.5', className)}>
      {items.map(({ to, label, icon: Icon, end }) => (
        <li key={label}>
          <Link
            to={to}
            params={{ owner, name }}
            activeOptions={{ exact: end }}
            activeProps={{ className: 'active' }}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        </li>
      ))}
    </nav>
  );
}
