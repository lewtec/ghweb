import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';

/** Memory router with the blob/tree routes those tests navigate. */
export function makeRepoCodeRouter(initialPath: string) {
  const rootRoute = createRootRoute({ component: () => null });
  const repoLayoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/$owner/$name',
    component: () => null,
  });
  const repoIndex = createRoute({
    getParentRoute: () => repoLayoutRoute,
    path: '/',
    component: () => null,
  });
  const treeRootRoute = createRoute({
    getParentRoute: () => repoLayoutRoute,
    path: '/tree/$ref',
    component: () => null,
  });
  const treeRoute = createRoute({
    getParentRoute: () => repoLayoutRoute,
    path: '/tree/$ref/$',
    component: () => null,
  });
  const blobRoute = createRoute({
    getParentRoute: () => repoLayoutRoute,
    path: '/blob/$ref/$',
    component: () => null,
  });
  const routeTree = rootRoute.addChildren([
    repoLayoutRoute.addChildren([
      repoIndex,
      treeRootRoute,
      treeRoute,
      blobRoute,
    ]),
  ]);
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
}
