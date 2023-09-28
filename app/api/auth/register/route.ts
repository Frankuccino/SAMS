import connectDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

interface NewUserRequest {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
}

interface NewUserResponse {
    id: string;
    email: string; 
    username: string;
    fistName: string;
    lastName: string;
    role: string;
}

type NewResponse = NextResponse<{ user?: NewUserResponse ; error?: string}>;

export const POST = async (req: Request): Promise<NewResponse> => {
    const body = (await req.json()) as NewUserRequest;

    await connectDB();
    
    const isEmailRegistered = await User.findOne({ email: body.email });
    const isUsernameRegistered = await User.findOne({ username: body.username });
    if(isEmailRegistered)
        return NextResponse.json(
            { error: "email is already in use!"},
            { status: 422}
            )
    if(isUsernameRegistered)
        return NextResponse.json(
            { error: "username is already in use!"},
            { status: 422}
            )
    
    const user = await User.create({ ...body })
    console.log(user);
    
    return NextResponse.json({
        user: {
            id: user._id.email,
            email: user.email,
            username: user.username,
            fistName: user.firstName,
            lastName: user.lastName,
            role: user.role
        },
    })
};