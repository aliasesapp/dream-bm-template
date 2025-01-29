import { siteConfig } from "@/config/site"
import { isAuthEnabled } from "@/lib/auth"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"

export function SiteHeader() {
  const authEnabled = isAuthEnabled()
  return (
    <header className="w-full border-b bg-background">
      <div className="flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0 md:px-8">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-3">
            {authEnabled && <UserMenu />}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
