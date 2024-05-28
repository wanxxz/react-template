import { Outlet, ScrollRestoration, createRootRouteWithContext, type ErrorComponentProps } from '@tanstack/react-router'
import { Body, Head, Html, Meta, RouterManagedTag, Scripts } from '@tanstack/start'
import { Suspense, lazy, type FunctionComponent, type PropsWithChildren } from 'react'
import { DefaultCatchBoundary, NotFound } from '../components'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() => import('@tanstack/router-devtools').then(res => ({ default: res.TanStackRouterDevtools })))

const RootDocument: FunctionComponent<PropsWithChildren> = (props: PropsWithChildren) => {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <Suspense fallback={null}>{props.children}</Suspense>
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  )
}

const ErrorComponent: FunctionComponent<ErrorComponentProps> = props => {
  return (
    <RootDocument>
      <DefaultCatchBoundary {...props} />
    </RootDocument>
  )
}

const RootComponent: FunctionComponent<PropsWithChildren> = props => {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

const Route = createRootRouteWithContext<{ assets: RouterManagedTag[] }>()({
  meta: () => [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  links: () => [
    { rel: 'stylesheet', href: '' },
    { rel: 'icon', href: '/favicon.ico' }
  ],
  errorComponent: ErrorComponent,
  notFoundComponent: NotFound,
  component: RootComponent
})

export { Route }
