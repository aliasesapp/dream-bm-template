import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
          Multiplayer AI has arrived.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          AI is now a Team Sport
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild variant="default">
          <Link href={siteConfig.links.dream} target="_blank" rel="noreferrer">
            Visit askdream.ai
          </Link>
        </Button>
      </div>
    </section>
  )
}
