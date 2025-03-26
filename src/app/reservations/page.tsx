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
console.log(urlParams,"urlparams")
console.log(cid,"cid is")
console.log("name is",name)

    const dispatch = useDispatch<AppDispatch>()

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null);
    const [startTime, setStartTime] = useState<string>(''); // HH:mm format
    const [endTime, setEndTime] = useState<string>(''); // HH:mm format

    const makeReservation = () => {
  
        if (cid && name && pickupDate && startTime && endTime) {
            const startDateTime = dayjs(pickupDate).set('hour', parseInt(startTime.split(':')[0])).set('minute', parseInt(startTime.split(':')[1]));
            const endDateTime = dayjs(pickupDate).set('hour', parseInt(endTime.split(':')[0])).set('minute', parseInt(endTime.split(':')[1]));
          
            const diffInHours = endDateTime.diff(startDateTime, 'hour');

            const item:ReservationItem = {
                coworkingSpaceId:cid,
                coworkingSpaceName:name,
                numOfHours: diffInHours,
                pickupDate: startDateTime.toISOString(), // Use ISO format
                startTime: startTime,
                endTime: endTime,
            }
            dispatch(addReservation(item))
        }
    }

    return (
        
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium">Co-working Space {name}</div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">

                    Start Date</div>
                <DateReserve onDateChange={(value:Dayjs)=>{setPickupDate(value)}}
                />
                
                <div className="text-md text-left text-gray-600">Start Time</div>
                <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                />

                <div className="text-md text-left text-gray-600">End Time</div>
                <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                />
                
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
            shadow-sm text-white" onClick={makeReservation}>
                Reserve This Co-working Space</button>
        </main>
    );
}