import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/config')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/config"!</div>
}
