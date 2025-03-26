import Image from "next/image"
import getCoworkingSpace from "@/libs/getCoworkingSpace"
import Link from "next/link"
import { useState, useEffect } from "react";


export default async function CoworkingSpaceDetailPage( {params} : { params: {cid:string}} ) {
    
    const coworkingSpaceDetail = await getCoworkingSpace(params.cid)
    
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

            <Link href={`/reservations?id=${params.cid}&model=${coworkingSpaceDetail.data.model}&name=${encodeURIComponent(coworkingSpaceDetail.data.name)}`}
          >
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