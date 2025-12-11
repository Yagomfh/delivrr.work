import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings/_settings/account')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/settings/accout"!</div>
}
