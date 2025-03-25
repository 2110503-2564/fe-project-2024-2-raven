import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import React from 'react';
import bcrypt from "bcryptjs";

export default function RegisterPage() {

    const registerUser = async (registrationForm: FormData) => {
        "use server";
        const name = registrationForm.get("name");
        const email = registrationForm.get("email");
        const password = registrationForm.get("password");
        const telephone_number = registrationForm.get("telephone_number");
        const role = registrationForm.get("role");

        try {
            await dbConnect();
            console.log("Database connected!"); // Log database connection

            const User = await import("@/db/models/User").then(
                (module) => module.default
            );

            const hashedPassword = await bcrypt.hash(password as string, 10);
            console.log("Hashed password:", hashedPassword); // Log hashed password

            await User.create({
                name,
                email,
                password: hashedPassword,
                telephone_number,
                role,
            });
            revalidateTag("Users");
            redirect("/");
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    return (
        <main className="bg-slate-100 m-5 p-5">
            <form action={registerUser}>
                <div className="text-xl text-blue-700">Register User</div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Name</label>
                    <input type="text" required id="name" name="name" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="email">Email</label>
                    <input type="email" required id="email" name="email" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="password">Password</label>
                    <input type="password" required id="password" name="password" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="telephone_number">Telephone Number</label>
                    <input type="text" required id="telephone_number" name="telephone_number" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                </div>
                <div className="flex items-center w-1/2 my-2">
                    <label className="w-auto block text-gray-700 pr-4" htmlFor="role">Role</label>
                    <select name="role" id="role" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Register</button>
            </form>
        </main>
    );
}