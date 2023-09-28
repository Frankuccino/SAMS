import Sidebar, { SidebarItem } from '@/components/Sidebar'
import { SiteHeader } from '@/components/site-header'
import { Laptop } from 'lucide-react'
import React from 'react'

export default async function Profile() {


  return (
    <div className='flex h-screen flex-col'>
      <SiteHeader />

      <div className='flex h-screen items-center justify-center'>

      This is the profile page 
      </div>
   

    </div>
  )
}
