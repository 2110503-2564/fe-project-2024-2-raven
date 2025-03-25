// getReservations.tsx

import React, { useState, useEffect } from 'react';

interface Reservation {
  _id: string; // Assuming MongoDB ObjectId
  apptDate: string; // or Date, adjust as needed
  user: string; // or user object
  coworkingSpaceName: string;
  coworkingSpaceId: string;
  numOfHours: number;
  startTime: string;
  endTime: string;
  pickupDate: string; // or Date
  // ... other reservation properties
}

const GetReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'; // Important!

        const response = await fetch(`${baseUrl}/api/v1/reservations`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data: Reservation[] = await response.json();
        setReservations(data);
        setLoading(false);
      } catch (err: any) { // Type assertion for err
        setError(err.message || 'Failed to fetch reservations.');
        setLoading(false);
      }
    };

    fetchReservations();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Reservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation._id}>
              {/* Display reservation details */}
              <p>Appt Date: {reservation.apptDate}</p>
              <p>User: {reservation.user}</p>
              <p>Coworking Space Name: {reservation.coworkingSpaceName}</p>
              <p>Coworking Space ID: {reservation.coworkingSpaceId}</p>
              <p>Hours: {reservation.numOfHours}</p>
              <p>Start: {reservation.startTime}</p>
              <p>End: {reservation.endTime}</p>
              <p>Pickup: {reservation.pickupDate}</p>
              {/* ... other properties */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default GetReservations;