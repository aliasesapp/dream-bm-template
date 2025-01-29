import "@/app/globals.css"

import { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Viewport } from "next/types"
import { AuthProvider } from "@/contexts/auth-provider"
import FullstoryProvider from "@/contexts/fullstory-provider"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: `https://www.bmc.com/etc/clientlibs/bmc/head/touch-icon.png`,
        sizes: "16x16",
      },
      {
        url: `https://www.bmc.com/etc/clientlibs/bmc/head/touch-icon.png`,
        sizes: "32x32",
      },
    ],
    shortcut: `https://www.bmc.com/etc/clientlibs/bmc/head/touch-icon.png`,
    apple: `https://www.bmc.com/etc/clientlibs/bmc/head/touch-icon.png`,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#050A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            poppins.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FullstoryProvider>
              <AuthProvider>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
              </AuthProvider>
            </FullstoryProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
