import { DataTable } from '@/components/DataTable';
import { UserResponse } from '@/types/user';
import React from 'react'
import { columns } from './columns';

const getUsers = async () => {
  try {
    const res = await fetch(`${process.env.URI}/api/users`, {
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
      <DataTable columns={columns} data={users} />
    </div>
  )
}
