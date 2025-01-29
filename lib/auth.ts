import NextAuth from "next-auth"
import type { Provider } from "next-auth/providers"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"

// Define a type for the provider functions
type ProviderBuilder = (config: any) => Provider

const PROVIDER_MAP: Record<string, ProviderBuilder> = {
  google: Google,
  github: GitHub,
  discord: Discord,
} as const

function getEnabledProviders() {
  const providers: Provider[] = []
  const envVars = process.env

  Object.keys(envVars).forEach(key => {
    if (key.match(/^AUTH_(.+)_ID$/)) {
      const provider = key.split('_')[1].toLowerCase()
      const secretKey = `AUTH_${provider.toUpperCase()}_SECRET`
      
      if (envVars[secretKey] && provider in PROVIDER_MAP) {
        providers.push(
          PROVIDER_MAP[provider]({
            clientId: envVars[key],
            clientSecret: envVars[secretKey],
          })
        )
      }
    }
  })

  return providers
}

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: getEnabledProviders(),
  callbacks: {
    signIn({ profile }) {
      // ends with bmc.com or aliases.app
      return profile.email.endsWith("@bmc.com") || profile.email.endsWith("@aliases.app")
    }
  },
})

export { handlers, auth, signIn, signOut }

export function isAuthEnabled() {
  return getEnabledProviders().length > 0
}