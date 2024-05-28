import { createRouter } from '@tanstack/react-router'
import { DefaultCatchBoundary } from './components/default-catch-boundary'
import { NotFound } from './components/not-found'
import { routeTree } from './routeTree.gen'

function create() {
  const router = new createRouter({
    routeTree,
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    context: {
      assets: []
    },
    defaultNotFoundComponent: () => <NotFound />,
    dehydrate: (() => {
      return {
        assets: router.options.context.assets
      }
    }) as any,
    hydrate: data => {
      router.options.context.assets = data.assets
    }
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof create>
  }
}

export { create as createRouter }
