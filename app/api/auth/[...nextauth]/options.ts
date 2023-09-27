import connectDB from "@/lib/db";
import User from "@/models/user";
import { NextAuthOptions } from "next-auth";
import CredentialProviders from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialProviders({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string
                };
                await connectDB();

                const user = await User.findOne({ email });
                if (!user) throw Error ("email/password mismatch!");

                const passwordMatch = await user.comparePassword(password);
                if (!passwordMatch) throw Error("email/password mismatch!");

                return {
                    email: user.email,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    id: user._id
                }
            }
        })

    ],
    callbacks: {
        jwt(params: any) {
            if (params.user?.role) {
                params.token.role = params.user.role;
                params.token.id = params.user.id;
            }
            return params.token
        },
        session({session, token}) {
            if (session.user) {
                (session.user as { id: string }).id = token.id as string;
                (session.user as { role: string }).role = token.role  as string;
            }
            return session
        },
    }
}
