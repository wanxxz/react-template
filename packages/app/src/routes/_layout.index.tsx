import { createFileRoute } from '@tanstack/react-router'
import { type FunctionComponent, type PropsWithChildren } from 'react'

const IndexComponent: FunctionComponent<PropsWithChildren> = props => {
  return <main>{props.children}</main>
}

const Route = createFileRoute('/_layout/')({
  component: IndexComponent
})

export { Route }
