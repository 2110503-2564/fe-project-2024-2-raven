import getCars from "@/libs/getCoworkingSpaces"
import CarCatalog from "@/components/CarCatalog"
import {Suspense} from 'react'
import { LinearProgress } from "@mui/material"
import CarPanel from "@/components/CarPanel"
import { CoworkingSpaceJson } from "../../../../interfaces"

export default async function Car() {
    const coworkingSpaces:CoworkingSpaceJson= await getCars()
    return (
        <main className='text-center p-5'>
            <h1 className="text-xl font-medium">Select Your Co-working Space</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <CarCatalog coworkingSpaceJson={coworkingSpaces}/>
            </Suspense>
            <hr className="my-10"/>
            <h1 className="text-xl font-medium">TRY Client-Side Co-working Space Panel</h1>
            <CarPanel/>
        </main>
    )
}