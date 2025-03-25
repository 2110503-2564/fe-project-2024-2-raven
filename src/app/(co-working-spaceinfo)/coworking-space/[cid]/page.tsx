import Image from "next/image"
import getCoworkingSpace from "@/libs/getCoworkingSpace"
import Link from "next/link"

export default async function CoworkingSpaceDetailPage( {params} : { params: {cid:string}} ) {
    
    const coworkingSpaceDetail = await getCoworkingSpace(params.cid)
    /*
    *   Mock Data for Demonstration Only
    */
   /*const mockCarRepo = new Map()
   mockCarRepo.set("001", {name:"Honda Civic", image:"/img/civic.jpg"})
   mockCarRepo.set("002", {name:"Honda Accord", image:"/img/accord.jpg"})
   mockCarRepo.set("003", {name:"Toyota Fortuner", image:"/img/fortuner.jpg"})
   mockCarRepo.set("004", {name:"Tesla Model 3", image:"/img/tesla.jpg"})
    */
    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{coworkingSpaceDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={ coworkingSpaceDetail.data.picture }
                alt='CoworkingSpace Image'
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
            <div className="text-md mx-5 text-left">{ coworkingSpaceDetail.data.description }
            <div>Address: { coworkingSpaceDetail.data.address }</div>
            <div>District: { coworkingSpaceDetail.data.district }</div>
            <div>Province: { coworkingSpaceDetail.data.province }</div>
            <div>Postal Code: { coworkingSpaceDetail.data.postalcode }</div>
            <div>Tel. : { coworkingSpaceDetail.data.tel }</div>
            <div>Open-close time: { coworkingSpaceDetail.data.open_close_time }</div>

            <Link href={`/reservations?id=${params.cid}&model=${coworkingSpaceDetail.data.model}`}>
            <button className= 'block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm'>
                Make Reservation
            </button>
            </Link>
            
            </div>
            </div>
        </main>
    )
}

export async function generateStaticParams() {
    return [{cid:'001'},{cid:'002'},{cid:'003'},{cid:'004'}]
}