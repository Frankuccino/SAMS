// import { getSession } from 'next-auth/react'

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// // Without a defined matcher, this one line applies next-auth to the entire project
// export { default } from 'next-auth/middleware'


export default withAuth(
  // withAuth augments the 'Request' with the user's
 async function middleware(request: NextRequestWithAuth) {
   
    const authRole = request.nextauth.token?.role
    const isAccessibleByAdmin = authRole === "admin"
    const isAccessibleByManager = authRole === "manager"
    
      // if user role accessed the route / he isnt' allowed to acess it based of the role
        if (request.nextUrl.pathname.startsWith("/profile")
            && !isAccessibleByManager) {
            return NextResponse.rewrite(
                new URL("/unauthorized", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/users")
            && !isAccessibleByAdmin
            && !isAccessibleByManager) {
            return NextResponse.rewrite(
                new URL("/unauthorized", request.url)
            )
        }
    },
    {
    callbacks: {
        authorized: ({ token }) => !!token
    },
  }
)


// // https://next-auth.js.org/configuration/nextjs#middleware
export const config = { 
  matcher: 
  [ 
    '/dashboard',
    '/users',
    '/register',
    '/job-order-request',
    '/reports'
    
  ]}
