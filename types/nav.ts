export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}


export interface UserSessionData {
  role?: string | null | undefined;
  email?: string | null | undefined;
  firstName?: string | null | undefined; 
  lastName?: string | null | undefined; 
  username?: string | null | undefined; 
}