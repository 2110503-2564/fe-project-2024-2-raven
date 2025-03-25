import ProductCard from "./ProductCard";
import Link from "next/link";
import { CoworkingSpaceItem,CoworkingSpaceJson } from "../../interfaces";

export default async function CoworkingSpaceCatalog({coworkingSpaceJson}:{coworkingSpaceJson:CoworkingSpaceJson}){
    const coworkingSpaceJsonReady = await coworkingSpaceJson
    return (
        <>
        Explore {coworkingSpaceJsonReady.count} co-working spaces in our catalog
        <div style={{margin:'20px',display:'flex',
            flexDirection:'row',alignContent:'space-around',
            justifyContent:'space-around',flexWrap:'wrap',padding:'10px'}}>
                {
                    coworkingSpaceJsonReady.data.map((coworkingSpaceItem:CoworkingSpaceItem)=>(
                        <Link href={`/coworking-space/${coworkingSpaceItem.id}`} 
                        className='w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%]
                        p-2 sm:p-4 md:p-4 lg:p-8'>
                            <ProductCard coworkingSpaceName={coworkingSpaceItem.name} imgSrc={coworkingSpaceItem.picture}/>
                        </Link>
                    ))
                }
            </div>
        
        </>
    )
}