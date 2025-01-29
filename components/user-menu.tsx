"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function UserMenu() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Button asChild variant="outline">
        <Link href="api/auth/signin">Log in</Link>
      </Button>
    )
  }

  return (
    <Button onClick={() => signOut()} variant="outline">
      {session.user?.image && (
        <img
          src={session.user.image}
          alt={session.user?.name ?? ""}
          title={`${session.user?.name} - ${session.user?.email}`}
          className="w-6 h-6 rounded-full mr-2"
        />
      )}
      Log out
    </Button>
  )
}
