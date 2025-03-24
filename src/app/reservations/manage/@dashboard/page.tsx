import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import CoworkingSpace from "@/db/models/CoworkingSpace";
import { dbConnect } from "@/db/dbConnect";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    
    const addCoworkingSpace = async (addCoworkingSpaceForm:FormData)=>{
        "use server"
        const name = addCoworkingSpaceForm.get("name")
        const description = addCoworkingSpaceForm.get("desc")
        const picture = addCoworkingSpaceForm.get("picture")
        const address = addCoworkingSpaceForm.get("address")
        const district = addCoworkingSpaceForm.get("district")
        const province = addCoworkingSpaceForm.get("province")
        const postalcode = addCoworkingSpaceForm.get("postalcode")
        const tel = addCoworkingSpaceForm.get("postalcode")
        const open_close_time = addCoworkingSpaceForm.get("open_close_time")

        try {
            await dbConnect()
            const car = await CoworkingSpace.create({
                "name":name,
                "description" : description,
                "picture" : picture,
                "address" : address,
                "district" : district,               
                "province" : province,              
                "postalcode" : postalcode,
                "tel" : tel,
                "open_close_time" : open_close_time
            })
        } catch (error) {
            console.log(error)
        }
        revalidateTag("CoworkingSpaces")
        redirect("/coworking-spaces")
    }

    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null;
    
    const profile = await getUserProfile(session.user.token)
    var createdAt = new Date(profile.data.createdAt);

    return (
        <main className="bg-slate-100 m-5 p-5">
            <div className="text-2xl">{profile.data.name}</div>
            <table className="table-auto border-separate border-spacing-2"><tbody>
                <tr><td>Email</td><td>{profile.data.email}</td></tr>
                <tr><td>Tel.</td><td>{profile.data.telephone_number}</td></tr>
                <tr><td>Member Since</td><td>{createdAt.toString()}</td></tr>
            </tbody>

            </table>
            {
                (profile.data.role=="admin")?
                <form action={addCoworkingSpace}>
                    <div className="text-xl text-blue-700">Create Co-working Space Name</div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
                            Name</label>
                        <input type="text" required id="name" name="name" placeholder="Co-working-Space name"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="desc">
                        Description</label>
                        <input type="text" required id="desc" name="desc" placeholder="Co-working-Space Description"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">
                        Picture</label>
                        <input type="text" required id="picture" name="picture" placeholder="URL"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="address">
                        Address</label>
                        <input type="text" required id="address" name="address" placeholder="Co-working-Space Address"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="district">
                        District</label>
                        <input type="text" required id="district" name="district" placeholder="Co-working-Space District"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="province">
                        Province</label>
                        <input type="text" required id="province" name="province" placeholder="Co-working-Space Province"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="postalcode">
                        Postalcode</label>
                        <input type="text" required id="postalcode" name="postalcode" placeholder="Co-working-Space postalcode"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="tel">
                        Tel.</label>
                        <input type="text" required id="tel" name="tel" placeholder="Co-working-Space tel."
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="open_close_time">
                        open_close_time</label>
                        <input type="text" required id="open_close_time" name="open_close_time" placeholder="Co-working-Space open_close_time"
                        className="bg-white border-2 border-gray-200 rounded w-full p-2
                        text-gray-700 focus:outline-none focus:border-blue-400"
                        />
                    </div>
                    
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700
                        text-white p-2 rounded">
                            Add New Coworking Space</button>
                </form>
                :null
            }
        </main>
    )
}
