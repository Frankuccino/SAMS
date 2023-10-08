import { UserResponse } from '@/types/user';
import React from 'react'

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function UsersPage() {

  const { users } = await getUsers()

  return (
    <div>
      Lists of Users:
      <ul>
        {users.map((user: UserResponse)  => (
          <li 
          className='pt-2'
          key={user._id}
          >
            username: {user.username}  <br />role: {user.role} <br /> email: {user.email} 
          
          </li>
        ))}
      </ul>
      
    </div>
  )
}
