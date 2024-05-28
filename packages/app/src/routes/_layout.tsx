import { Outlet, createFileRoute, useRouter } from '@tanstack/react-router'
import { type FunctionComponent, type PropsWithChildren } from 'react'

const LayoutComponent: FunctionComponent<PropsWithChildren> = props => {
  const router = useRouter()

  return (
    <>
      <Outlet />
    </>
  )
}

const Route = createFileRoute('/_layout')({
  component: LayoutComponent
})

export { Route }
