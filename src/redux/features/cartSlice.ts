import { createSlice , PayloadAction } from '@reduxjs/toolkit'
import { ReservationItem } from '../../../interfaces'

type CartState = {
    coworkingSpaceItems:ReservationItem[]
}

const initialState:CartState = { coworkingSpaceItems: []}

export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers: {
        addReservation:(state,action:PayloadAction<ReservationItem>)=>{
            state.coworkingSpaceItems.push(action.payload)
        },
        removeReservation: (state,action:PayloadAction<ReservationItem>)=>{
            const remainItems = state.coworkingSpaceItems.filter(obj => {
                return ((obj.coworkingSpaceName !== action.payload.coworkingSpaceName)
                || (obj.pickupDate!==action.payload.pickupDate)
                || (obj.startTime!==action.payload.startTime)
                ||(obj.endTime!==action.payload.endTime));
            })
            state.coworkingSpaceItems=remainItems
        }
    }
})
export const { addReservation, removeReservation } = cartSlice.actions
export default cartSlice.reducer