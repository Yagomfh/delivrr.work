import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/integrations/$provider')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/integrations/$provider"!</div>
}
