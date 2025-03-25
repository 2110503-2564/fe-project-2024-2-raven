export default async function makeReservation(id: string) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'; // Default to localhost for development

    const response = await fetch(`${baseUrl}/api/v1/co-working-spaces/${id}/reservations`, {
        method: 'POST', // Assuming you're creating a reservation
        headers: {
            'Content-Type': 'application/json', // If you're sending JSON data
            // Add any other necessary headers (e.g., authorization)
        },
        // body: JSON.stringify({ /* your reservation data */ }), // If you have data to send
    });

    if (!response.ok) {
        // Log the error response for debugging
        console.error('Failed to make reservation:', response.status, response.statusText);

        // Include the error text in the thrown error for better debugging.
        const errorText = await response.text();
        throw new Error(`Failed to make reservation: ${response.status} - ${response.statusText}. Error: ${errorText}`);
    }

    return await response.json();
}