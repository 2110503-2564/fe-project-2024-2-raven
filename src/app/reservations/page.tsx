'use client'
import DateReserve from "@/components/DateReserve";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import dayjs,{ Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addReservation } from "@/redux/features/cartSlice";
import { ReservationItem } from "../../../interfaces";

export default function Reservations () {

    const urlParams = useSearchParams()
    const cid = urlParams.get('id')
    const name = urlParams.get('name')

    const dispatch = useDispatch<AppDispatch>()

    const makeReservation = () => {
        if(cid && name && pickupDate && returnDate ) {
            const item:ReservationItem = {
                coworkingSpaceId:cid,
                coworkingSpaceName:name,
                numOfDays:returnDate.diff(pickupDate, "day"),
                pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
                returnDate: dayjs(returnDate).format("YYYY/MM/DD")
              }
              dispatch(addReservation(item))
        }
    }

    const [pickupDate,setPickupDate] = useState<Dayjs|null>(null)
    const [returnDate,setReturnDate] = useState<Dayjs|null>(null)

    return (
        
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Co-working Space {name}</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">

                    Start Date</div>
                <DateReserve onDateChange={(value:Dayjs)=>{setPickupDate(value)}}
                   />
                <div className="text-md text-left text-gray-600">
                    Last Day</div>
                <DateReserve onDateChange={(value:Dayjs)=>setReturnDate(value)}
                    />

                
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
            shadow-sm text-white" onClick={makeReservation}>
                Reserve This Co-working Space</button>
        </main>
    );
}