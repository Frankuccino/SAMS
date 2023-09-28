import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  return (
    <section className="">
      {/* <SiteHeader /> */}
    <div>This is the home page</div>
    </section>
  )
}

{/* <Link
target="_blank"
rel="noreferrer"
href={siteConfig.links.github}
className={buttonVariants({ variant: "outline" })}
>
GitHub
</Link> */}