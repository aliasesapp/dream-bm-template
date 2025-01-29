"use client"

import { ReactNode, useEffect } from "react"
import * as fullstory from "@fullstory/browser"

interface FullstoryProviderProps {
  children: ReactNode
}

function FullstoryProvider({ children }: FullstoryProviderProps) {
  useEffect(() => {
    const orgId = process.env.NEXT_PUBLIC_FULLSTORY_ORG
    if (orgId) {
      fullstory.init({ orgId })
      ;(window as any)._fs_run_in_iframe = true
    } else {
      console.warn("Fullstory orgId not found. Skipping initialization.")
    }
  }, [])

  return <>{children}</>
}

export default FullstoryProvider
