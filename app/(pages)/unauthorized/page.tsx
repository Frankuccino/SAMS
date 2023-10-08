import Alert from '@/components/Alert'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'

export default function UnauthorizedPage() {
  return (
    <div>
      <Alert value="You are not authorized to access this page"></Alert>
      <Link 
      href='/'
      className={buttonVariants({ variant: "default" })}
      >
        Back to home
      </Link>
      
    </div>
  )
}
