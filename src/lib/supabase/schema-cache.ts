import { createClient as createServerClient } from './server'
import { createClient as createBrowserClient } from './client'

let serverClient: ReturnType<typeof createServerClient> | null = null
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function resetSupabaseClients() {
  // Force new instances to be created on next access
  serverClient = null
  browserClient = null
}

export function getServerClient() {
  if (!serverClient) {
    serverClient = createServerClient()
  }
  return serverClient
}

export function getBrowserClient() {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
} 