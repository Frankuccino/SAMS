import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import AuthProvider from "@/components/AuthProvider"
import Sidebar, { SidebarItem } from "@/components/Sidebar"
import { Laptop, User } from "lucide-react"


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

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        {/* <head /> */}
        <body
          className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>


            <div className="relative flex min-h-screen flex-col">

              {/* <SiteHeader /> */}
              <Sidebar>
                <SidebarItem icon={<Laptop/>} text="Dashboard"  active={true} link='/'/>
                <SidebarItem icon={<User/>} text="Profile" link='/profile'/>
                <SidebarItem icon={<Laptop/>} text="Contact" />
              </Sidebar>

              <div className="flex-1 ">
                {children}
                </div>

            </div>


          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  )
}
