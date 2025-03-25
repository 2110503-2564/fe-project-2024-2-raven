import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import userLogin from "@/libs/userLogin";
import getUserProfile from "@/libs/getUserProfile"; // Adjust path

export const authOptions:AuthOptions={
    providers: [
        //Authentication Provider, use Credentials Provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              
              if(!credentials) return null

              const user = await userLogin(credentials.email, credentials.password)
   
              if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }
          })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
          if (user) {
            try {
              const profile = await getUserProfile(user.token);
              return { ...token, ...profile.data };
            } catch (error) {
              console.error("Error fetching user profile:", error);
              // Handle the error (e.g., return the token without profile data)
              return token;
            }
          }
          return token;
        },
        async session({ session, token, user }) {
          session.user = token as any;
          return session;
        },
        async redirect({ url, baseUrl }) {
          return `${baseUrl}/coworking-space`;
        },
      },
    };