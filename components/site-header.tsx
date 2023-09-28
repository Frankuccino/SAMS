"use client"

import Link from "next/link"

import { signOut, useSession } from "next-auth/react"
import { siteConfig } from "@/config/site"

import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserSessionData } from "@/types/nav"

export function SiteHeader() {
  const { data, status } = useSession() as { data: { user: UserSessionData }; status: string }
  const isAuth = status === 'authenticated' 

  return (
    <header className="z-2 sticky top-0 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
          {isAuth ? (
            <div className="flex items-center gap-5 text-center">
              <p>
              {data?.user?.firstName} {data?.user?.lastName}
              </p>
              <Button onClick={() => signOut()}>Logout</Button>
            </div>
            ) : (
            <>
              <Link 
              href='/login'
              className={buttonVariants({ variant: "default" })}
              > 
              Sign In
              </Link>
            </>
          )}
          <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
