"use client"
import React from 'react'
import Sidebar, { SidebarItem } from './Sidebar'
import { CalendarDays, Laptop, Users } from 'lucide-react'
import { FolderOpen } from 'lucide-react'
import { usePathname } from 'next/navigation'

// work on this tomorrow to just conditionally render the sidebar in the layout once user is signed in.

export default function SidebarComponent() {
// also try here to conditionally render the page of the sidebar if there is an authenticated user if not don't render it yet.

const url = usePathname()

  return (
    <div>
        <Sidebar>
            <SidebarItem 
            icon={<Laptop />} 
            text="Dashboard" 
            active={url === '/dashboard'} 
            link="/dashboard" 
            />
            <SidebarItem 
            icon={<Users />} 
            text="Users" 
            active={url === '/users'} 
            link="/users" 
            />
            <SidebarItem 
            icon={<CalendarDays />} 
            text="Job Order Request" 
            active={url === '/job-order-request'} 
            link="/job-order-request" 
            />
            <SidebarItem 
            icon={<FolderOpen />} 
            text="Reports" 
            active={url === '/reports'} 
            link="/reports"
            alert={true} 
            />
        </Sidebar>
    </div>

    // What i'll do tomorrow is do the crud functionality starting with the users page so that I would be able to make use of it and secondly do the job order request CRUD functionality along side with the API authorization with the 3 user's or account I'll be creating.
  )
}
