import connectDB from "@/lib/db"
import User from "@/models/user"
import { NextResponse } from "next/server"


export const GET = async() => {
    await connectDB()
    const users = await User.find({}).select('-password')
    return NextResponse.json({ users })
}


