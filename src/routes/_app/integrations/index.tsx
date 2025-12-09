import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/integrations/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/integrations/"!</div>
}
