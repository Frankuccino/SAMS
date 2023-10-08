import connectDB from "@/lib/db";
import User from "@/models/user";
import { UserRequest, UserResponse } from "@/types/user";
import { NextResponse } from "next/server";

type NewResponse = NextResponse<{ user?: UserResponse ; error?: string}>;

export const POST = async (req: Request): Promise<NewResponse> => {
    const body = (await req.json()) as UserRequest;

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
            _id: user._id.email,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        },
    })
};