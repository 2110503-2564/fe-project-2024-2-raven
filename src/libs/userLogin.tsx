export default async function userLogin(userEmail: string, userPassword: string) {
    try {
        const response = await fetch("http://localhost:5000/api/v1/auth/login", { // Ensure correct endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: userEmail,
                password: userPassword,
            }),
        });

        const data = await response.json(); // Parse the JSON response

        if (!response.ok) {
            // Backend returned an error (e.g., 401 Unauthorized)
            throw new Error(data.msg || "Login failed"); // Use backend message if available
        }

        // Login successful
        if (data.success && data.token) {
            // Store the token securely (e.g., localStorage)
           // localStorage.setItem("authToken", data.token);

            // Return the entire data for any additional information
            return data;
        } else {
            // Backend returned success: true, but no token, or an unexpected format
            throw new Error("Login successful, but token missing or invalid response");
        }
    } catch (error: any) {
        // Handle network errors or errors from the backend
        console.error("Login error:", error);
        throw error; // Re-throw the error for component-level handling
    }
}