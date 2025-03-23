export async function getCoworkingSpaces() {
    try {
        const response = await fetch("http://localhost:5000/api/v1/co-working-spaces"); // Replace with your URL
        console.log("Response:", response);
        console.log("Response Status:", response.status);
        if (!response.ok) {
            throw new Error("Failed to fetch coworking space");
        }
        return await response.json();
    } catch (error) { 
        console.error("Network error:", error);
        console.error("Network error, stringified:", JSON.stringify(error)); // Add this line
        throw new Error("Failed to fetch coworking space");
       }
}