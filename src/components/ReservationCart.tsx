'use client' 
import { removeReservation } from "@/redux/features/cartSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"


export default function ReservationCart() {
    const coworkingSpaceItems = useAppSelector((state)=>state.cartSlice.coworkingSpaceItems)
    const dispatch = useDispatch<AppDispatch>()

    if (!Array.isArray(coworkingSpaceItems) || coworkingSpaceItems.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <>
        {
            coworkingSpaceItems.map((reservationItem)=>(
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={reservationItem.coworkingSpaceId}>
                    <div className="text-xl">{reservationItem.coworkingSpaceName}</div>
                    <div className="text-sm">start time {reservationItem.startTime}
                       </div>
                    <div className="text-sm">End Time {reservationItem.endTime}
                      </div>
                    <div className="text-md">Duration: {reservationItem.numOfHours} hours</div>
                    
                    <div className="text-md">customerName: {reservationItem.customerName} </div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1
                    text-white shadow-sm" onClick={()=>dispatch(removeReservation(reservationItem))}>
                        Remove from Cart
                    </button>
                    
                </div>
            ))
        }
        </>
    )
}