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

export interface ReservationItem{
  carId:string,
  carModel:string,
  numOfDays: number,
  pickupDate:string,
  pickupLocation: string,
  returnDate: string,
  returnLocation: string
}