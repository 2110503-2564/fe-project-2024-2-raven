import { getCoworkingSpaces } from "@/libs/getCoworkingSpaces"
import CoworkingSpaceCatalog from "@/components/CoworkingSpaceCatalog"
import {Suspense} from 'react'
import { LinearProgress } from "@mui/material"
import { CoworkingSpaceJson } from "../../../../interfaces"

export default async function CoworkingSpace() {
    const coworkingSpaces:CoworkingSpaceJson= await getCoworkingSpaces()
    return (
        <main className='text-center p-5'>
            <h1 className="text-xl font-medium">Select Your Co-working Space</h1>
            <Suspense fallback={<p>Loading...<LinearProgress/></p>}>
            <CoworkingSpaceCatalog coworkingSpaceJson={coworkingSpaces}/>
            </Suspense>
            <hr className="my-10"/>
          
        </main>
    )
}