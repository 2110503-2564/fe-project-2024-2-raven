import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";
import { compare } from "bcryptjs";
import { dbConnect } from "@/db/dbConnect"; // Adjust path as needed
import CoworkingSpace from "@/db/models/CoworkingSpace";
import { User } from "../../../../../interfaces";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };