export async function getCoworkingSpaces() {
    try {
        const response = await fetch("YOUR_API_URL"); // Replace with your URL
        console.log("Response:", response);
        console.log("Response Status:", response.status);
        if (!response.ok) {
            throw new Error("Failed to fetch coworking space");
        }
        return await response.json();
    } catch (error) {
        console.error("Network error:", error);
        throw new Error("Failed to fetch coworking space"); // Or a more specific network error message
    }
}