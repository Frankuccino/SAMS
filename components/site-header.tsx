import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b  ">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
            href='/login'
            ><Button>Sign in</Button>
            </Link>
            <Link
            href='/register'
            ><Button 
            className={buttonVariants({variant: "secondary"})}
            >Register</Button>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

{/* <Link
href=''
target="_blank"
rel="noreferrer"
>
<div
  className={buttonVariants({
    size: "icon",
    variant: "ghost",
  })}
>
  <Icons.gitHub className="h-5 w-5" />
  <span className="sr-only">GitHub</span>
</div>
</Link> */}