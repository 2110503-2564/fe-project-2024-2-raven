// @/db/models/Reservation.ts

import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Reservation document
export interface IReservation extends Document {
  apptDate: Date;
  user: string; // Assuming user ID as a string
  coworkingSpaceName: string;
  coworkingSpaceId: string;
  numOfHours: number;
  startTime: string;
  endTime: string;
  pickupDate: Date;
}

// Define the Mongoose schema
const ReservationSchema: Schema = new Schema({
  apptDate: { type: Date, required: true },
  user: { type: String, required: true },
  coworkingSpaceName: { type: String, required: true },
  coworkingSpaceId: { type: String, required: true },
  numOfHours: { type: Number, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  pickupDate: { type: Date, required: true },
});

// Create the Mongoose model
const Reservation = mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);

export default Reservation;