import { handlers, isAuthEnabled } from "@/lib/auth"

export const { GET, POST } = isAuthEnabled() ? handlers : {
  GET: () => new Response(JSON.stringify({ error: "Auth not configured" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  }),
  POST: () => new Response(JSON.stringify({ error: "Auth not configured" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}