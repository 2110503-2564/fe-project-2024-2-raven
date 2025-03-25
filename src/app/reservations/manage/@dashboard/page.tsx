import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import React from 'react';

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);
console.log(session?.user.telephone_number,"abcde");

    if (!session || !session.user) return null;

    const addReservation = async (reservationForm: FormData) => {
        "use server";
        const apptDate = reservationForm.get("apptDate");
        const user = reservationForm.get("user");
        const coworkingSpaceName = reservationForm.get("coworkingSpaceName");
        const coworkingSpaceId = reservationForm.get("coworkingSpaceId");
        const numOfHours = reservationForm.get("numOfHours");
        const startTime = reservationForm.get("startTime");
        const endTime = reservationForm.get("endTime");
        const pickupDate = reservationForm.get("pickupDate");

        try {
            await dbConnect();
            // Assuming you have a Reservation model. Replace with your actual model.
            const Reservation = await import("@/db/models/Reservation").then(
                (module) => module.default
            );
            await Reservation.create({
                apptDate: apptDate,
                user: user,
                coworkingSpaceName: coworkingSpaceName,
                coworkingSpaceId: coworkingSpaceId,
                numOfHours: numOfHours,
                startTime: startTime,
                endTime: endTime,
                pickupDate: pickupDate,
            });
        } catch (error) {
            console.log(error);
        }
        revalidateTag("Reservations"); // Adjust the tag as needed
        redirect("/reservations"); // Adjust the redirect path as needed
    };

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{session?.user.name}</div>
            <table className="table-auto border-separate border-spacing-2">
                <tbody>
                    <tr><td>Email</td><td>{session.user.email}</td></tr>
                    <tr><td>Tel.</td><td>{session.user.telephone_number}</td></tr>
                    <tr><td>Member Since</td><td>{session.user.createdAt ? new Date(session.user.createdAt).toString() : "N/A"}</td></tr>
                </tbody>
            </table>
            {session.user.role && session.user.role.toLowerCase() === "admin" ? (
                <form action={addReservation}>
                    <div className="text-xl text-blue-700">Create Reservation</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="apptDate">Appt Date</label>
                        <input type="datetime-local" required id="apptDate" name="apptDate" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="user">User ID</label>
                        <input type="text" required id="user" name="user" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="coworkingSpaceName">Coworking Space Name</label>
                        <input type="text" required id="coworkingSpaceName" name="coworkingSpaceName" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="coworkingSpaceId">Coworking Space ID</label>
                        <input type="text" required id="coworkingSpaceId" name="coworkingSpaceId" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="numOfHours">Num of Hours</label>
                        <input type="number" required id="numOfHours" name="numOfHours" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="pickupDate">Date</label>
                        <input type="date" required id="pickupDate" name="pickupDate" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="startTime">Start Time</label>
                        <input type="text" required id="startTime" name="startTime" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="endTime">End Time</label>
                        <input type="text" required id="endTime" name="endTime" className="bg-white border-2 border-gray-200 rounded w-full p-2 text-gray-700 focus:outline-none focus:border-blue-400" />
                    </div>
                    
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add Reservation</button>
                </form>
            ) : null}
        </main>
    );
}