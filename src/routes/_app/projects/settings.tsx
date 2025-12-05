import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/projects/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/projects/settings"!</div>
}
