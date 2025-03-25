import { ObjectId } from "mongoose";

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
numOfHours: number,
pickupDate:string,
startTime: string,
endTime: string,
}

export interface User {
  _id:ObjectId;
  name:string;
  telephone_number:string;
  email: string;
  role:string;
  createdAt:Date;
}