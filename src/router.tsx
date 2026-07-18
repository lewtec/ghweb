import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { Suspense, lazy, useState, type ReactNode } from 'react';
import { SimpleErrorBoundary } from '@/components/SimpleErrorBoundary';
import { TopBar } from '@/components/TopBar';
import { CommandPalette } from '@/components/CommandPalette';
import { LoadingBlock } from '@/components/LoadingBlock';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { routerViewerQuery } from './__generated__/routerViewerQuery.graphql';

const HomePage = lazy(() =>
  import('@/screens/HomePage').then((m) => ({ default: m.HomePage })),
);
const RepoPage = lazy(() =>
  import('@/screens/RepoPage').then((m) => ({ default: m.RepoPage })),
);
const CodeBrowserPage = lazy(() =>
  import('@/screens/CodeBrowserPage').then((m) => ({
    default: m.CodeBrowserPage,
  })),
);
const IssuesListPage = lazy(() =>
  import('@/screens/IssuesListPage').then((m) => ({
    default: m.IssuesListPage,
  })),
);
const IssueDetailPage = lazy(() =>
  import('@/screens/IssueDetailPage').then((m) => ({
    default: m.IssueDetailPage,
  })),
);
const PullsListPage = lazy(() =>
  import('@/screens/PullsListPage').then((m) => ({ default: m.PullsListPage })),
);
const PullDetailPage = lazy(() =>
  import('@/screens/PullDetailPage').then((m) => ({
    default: m.PullDetailPage,
  })),
);
const SearchPage = lazy(() =>
  import('@/screens/SearchPage').then((m) => ({ default: m.SearchPage })),
);

const viewerQuery = graphql`
  query routerViewerQuery {
    viewer {
      login
      avatarUrl
    }
  }
`;

function ViewerChrome({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingBlock label="Loading session…" />}>
      <ViewerChromeInner>{children}</ViewerChromeInner>
    </Suspense>
  );
}

function ViewerChromeInner({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const viewer = useLazyLoadQuery<routerViewerQuery>(viewerQuery, {});

  return (
    <div className="min-h-screen flex flex-col w-full min-w-0">
      <TopBar
        onOpenPalette={() => setPaletteOpen(true)}
        viewerLogin={viewer.viewer.login}
        viewerAvatarUrl={viewer.viewer.avatarUrl}
        signedIn
        onSignedOut={() => {
          window.location.href = '/';
        }}
      />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <main className="flex-1 min-w-0 overflow-auto w-full">
        <Suspense fallback={<LoadingBlock />}>
          <SimpleErrorBoundary>{children}</SimpleErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
}

function Suspend({ children }: { children: ReactNode }) {
  return <Suspense fallback={<LoadingBlock />}>{children}</Suspense>;
}

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ViewerChrome>
      <Suspend>
        <HomePage />
      </Suspend>
    </ViewerChrome>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  validateSearch: (s: Record<string, unknown>) => ({
    q: typeof s.q === 'string' ? s.q : '',
  }),
  component: function SearchRoute() {
    const { q } = searchRoute.useSearch();
    return (
      <ViewerChrome>
        <Suspend>
          <SearchPage q={q} />
        </Suspend>
      </ViewerChrome>
    );
  },
});

const repoLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$owner/$name',
  component: function RepoLayout() {
    return (
      <ViewerChrome>
        <Outlet />
      </ViewerChrome>
    );
  },
});

const repoIndexRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/',
  component: function RepoIndex() {
    const { owner, name } = repoLayoutRoute.useParams();
    return (
      <Suspend>
        <RepoPage owner={owner} name={name} />
      </Suspend>
    );
  },
});

const treeRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/tree/$ref/$',
  component: function TreeRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    const { ref } = treeRoute.useParams();
    const splat = treeRoute.useParams()._splat ?? '';
    return (
      <Suspend>
        <CodeBrowserPage
          owner={owner}
          name={name}
          refName={ref}
          path={splat}
          mode="tree"
        />
      </Suspend>
    );
  },
});

const blobRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/blob/$ref/$',
  component: function BlobRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    const { ref } = blobRoute.useParams();
    const splat = blobRoute.useParams()._splat ?? '';
    return (
      <Suspend>
        <CodeBrowserPage
          owner={owner}
          name={name}
          refName={ref}
          path={splat}
          mode="blob"
        />
      </Suspend>
    );
  },
});

const issuesRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/issues',
  component: function IssuesRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    return (
      <Suspend>
        <IssuesListPage owner={owner} name={name} />
      </Suspend>
    );
  },
});

const issueDetailRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/issues/$number',
  component: function IssueDetailRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    const { number } = issueDetailRoute.useParams();
    return (
      <Suspend>
        <IssueDetailPage owner={owner} name={name} number={Number(number)} />
      </Suspend>
    );
  },
});

const pullsRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/pulls',
  component: function PullsRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    return (
      <Suspend>
        <PullsListPage owner={owner} name={name} />
      </Suspend>
    );
  },
});

const pullDetailRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/pull/$number',
  component: function PullDetailRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    const { number } = pullDetailRoute.useParams();
    return (
      <Suspend>
        <PullDetailPage
          owner={owner}
          name={name}
          number={Number(number)}
          tab="conversation"
        />
      </Suspend>
    );
  },
});

const pullFilesRoute = createRoute({
  getParentRoute: () => repoLayoutRoute,
  path: '/pull/$number/files',
  component: function PullFilesRoute() {
    const { owner, name } = repoLayoutRoute.useParams();
    const { number } = pullFilesRoute.useParams();
    return (
      <Suspend>
        <PullDetailPage
          owner={owner}
          name={name}
          number={Number(number)}
          tab="files"
        />
      </Suspend>
    );
  },
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  repoLayoutRoute.addChildren([
    repoIndexRoute,
    treeRoute,
    blobRoute,
    issuesRoute,
    issueDetailRoute,
    pullsRoute,
    pullDetailRoute,
    pullFilesRoute,
  ]),
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
