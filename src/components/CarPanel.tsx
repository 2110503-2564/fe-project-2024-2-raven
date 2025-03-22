'use client'
import { useReducer,useState } from 'react'
import ProductCard from "./ProductCard"
import Link from 'next/link'
import { useRef,useEffect } from 'react'
import getCoworkingSpace from '@/libs/getCoworkingSpace'
import { getCoworkingSpaces } from '@/libs/getCoworkingSpaces'
import { CoworkingSpaceItem,CoworkingSpaceJson } from '../../interfaces'

export default function CoworkingSpacePanel() {

    const [coworkingSpaceResponse,setCoworkingSpaceResponse]=useState<CoworkingSpaceJson|null>(null)

    useEffect(()=>{
        const fetchData = async()=>{
            const coworkingspaces = await getCoworkingSpaces()
            setCoworkingSpaceResponse(coworkingspaces)
        }
        fetchData()
    },[])


    const countRef = useRef(0)
    const inputRef = useRef<HTMLInputElement>(null)

    const compareReducer = ( compareList:Set<string>, action:{type:string, coworkingspaceName:string} )=> {
        switch(action.type) {
            case 'add': {
                return new Set( compareList.add(action.coworkingspaceName) )
            }
            case 'remove': {
                compareList.delete(action.coworkingspaceName)
                return new Set(compareList)
            }
            default: return compareList
        }
    }

    const [compareList, dispatchCompare] = useReducer(compareReducer, new Set<string>())

    /**
     * Mock Data for Demonstration Only
     */
    
    const mockCoworkingSpaceRepo = [
        {cid: "001", name: "WeWork", image: "/img/civic.jpg"},
        {cid: "002", name: "The Hive", image: "/img/accord.jpg"},
        {cid: "003", name: "JustCo", image: "/img/Fabbit.jpg"},
        {cid: "004", name: "Spaces", image: "/img/tesla.jpg"}
    ]

    if(!coworkingSpaceResponse) return (<p>Co-working Space Panel is Loading ...</p>)

    return (
        <div>
            <div style={{margin:"20px", display:"flex", 
            flexDirection:"row", alignContent:"space-around",
            justifyContent:"space-around", flexWrap:"wrap", padding:"10px"}}>
                {
                    mockCoworkingSpaceRepo.map((coworkingSpaceItem) => (
                        <Link href={`/coworking-space/${coworkingSpaceItem.cid}`} className='w-1/5' key={coworkingSpaceItem.cid}>
                            <ProductCard
                                carName={coworkingSpaceItem.name}
                                imgSrc={coworkingSpaceItem.image}
                                onCompare={(spaceName: string) => dispatchCompare({ type: 'add', coworkingspaceName: spaceName })}
                            />
                        </Link>
                    )
                )
                }
            </div>
            <div className='w-full text-xl font-medium'>Compare List: {compareList.size}</div>
            {Array.from(compareList).map((space) => <div key={space}
                onClick={() => dispatchCompare({ type: 'remove', coworkingspaceName: space })}>
                {space}</div>)}

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={() => { countRef.current = countRef.current + 1; alert(countRef.current) }}>
                Count with Ref object
            </button>

            <input type='text' placeholder='please fill' className='block text-gray-900 text-sm
                    rounded-lg p-2 m-2 bg-purple-50 ring-1 ring-inset ring-purple-400
                    focus:outline-none focus:bg-purple-200 focus:ring-2'
                ref={inputRef} />

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                    shadow-sm text-white"
                onClick={() => { if (inputRef.current != null) inputRef.current.focus() }}>
                Focus Input
            </button>
        </div>     
    )
}