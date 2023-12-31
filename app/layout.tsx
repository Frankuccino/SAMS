import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/components/AuthProvider"
import { Laptop, User } from "lucide-react"
import Sidebar, { SidebarItem } from "@/components/Sidebar"

import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import SidebarComponent from "@/components/SidebarComponent"


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "https://www.spud.edu.ph/assets/logo/spud_logo.png",
    // shortcut: "/favicon-16x16.png",
    // apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

// const Sidebar = dynamic(() => import('@/components/Sidebar'), { ssr: true})

export default function RootLayout({ children }: RootLayoutProps) {

  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <head /> */}
        <body className={cn("h-full min-h-screen overflow-hidden bg-background font-sans antialiased", fontSans.variable)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          <div className="flex h-screen">
            
          <SidebarComponent />

                <div className="container flex-col">
                  <SiteHeader />
                  {children}
                </div>
          </div>

          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
