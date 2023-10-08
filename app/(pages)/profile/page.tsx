import Sidebar, { SidebarItem } from '@/components/Sidebar'
import { SiteHeader } from '@/components/site-header'
import { Laptop, User } from 'lucide-react'
import React from 'react'

export default function ProfilePage() {
 
  return (
    <div className='flex h-screen flex-col'>
     
      <div className='flex h-screen items-center justify-center p-10'>

      This is the profile page where the route should be a get dynamic route for the user profile /profile 
      so basically you would need to have a /users/:id which :id is the dynamic route where in the page.tsx you can get the params of the id from the props by doing curly braces then params inside.
      </div>
   

    </div>
  )
}
