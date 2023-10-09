export interface UserRequest {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
}

export interface UserResponse {
    _id: string;
    email?: string; 
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    // request?: []
}