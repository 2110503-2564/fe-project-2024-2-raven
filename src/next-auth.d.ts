import NextAuth from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            _id:string,
            name: string,
            email:string,
            role: string,
            token: string
        }
    }
    interface User {
        id: string;
        name: string;
        email: string;
        telephone_number:string;
        token: string;
        // Add other user properties here
      }
}

declare module "next-auth/jwt" {
    interface JWT {
    id: string;
    name: string;
    email: string;
    token: string;
    // Add other user properties here
    }
}
