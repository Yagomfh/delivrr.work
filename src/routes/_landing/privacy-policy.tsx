import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/privacy-policy"!</div>
}
