export interface CarItem {
    _id: string,
    model: string,
    description: string,
    picture: string,
    seats: number,
    doors: number,
    largebags: number,
    smallbags: number,
    automatic:boolean,
    dayRate: number,
    __v: number,
    id: string,
  }
  
export interface CarJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CarItem[]
  }

<<<<<<< HEAD

=======
>>>>>>> d65c6d78ac505b5e2b7444424f3de8685c308342

export interface CoworkingSpaceItem {
  _id: string,
  name: string,
  description: string,
  picture: string,
  address: string,
  district: string,
  province: string,
  postalcode: string,
  tel: string,
  open_close_time: string,
  __v: number,
  id: string,
}

export interface CoworkingSpaceJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: CoworkingSpaceItem[]
}

export interface ReservationItem{
coworkingSpaceId:string,
coworkingSpaceName:string,
numOfDays: number,
pickupDate:string,
returnDate: string,
}