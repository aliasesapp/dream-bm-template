import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-end gap-2 md:gap-3">
      <Link
        href="https://askdream.ai"
        target="_blank"
        className="flex items-center space-x-2"
        title={siteConfig.description}
      >
        <Icons.logo className="h-auto w-[80px]" />
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 align-bottom sm:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex text-sm font-medium text-secondary dark:text-secondary-foreground relative bottom-1",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
