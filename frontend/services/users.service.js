import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Register/Create User
export async function registerUser(data) {
    const { confirmPassword, ...newUser } = data;

    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(newUser),
        });

        const result = await res.json();

        // Backend validation errors / custom error messages
        if (!res.ok) {
            return {
                isSuccess: false,
                message: result?.message || "Registration failed",
            };
        }

        return {
            isSuccess: true, data: result,
            message: result?.message || "Registered successfully",
        };

    } catch (error) {
        console.error("Register User Error:", error);

        return {
            isSuccess: false,
            message: "Network error or server not responding",
        };
    }
}

// Login User
export async function loginUser(data) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json", },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                isSuccess: false,
                message: result?.message || "Login failed",
            };
        }

        return {
            isSuccess: true, user: result?.user, token: result?.token,
            message: result?.message || "Login successful",
        };

    } catch (error) {
        console.error("Login User Error:", error);

        return {
            isSuccess: false,
            message: "Network error or server not responding",
        };
    }
}

// Logout User
export function logout(){
    localStorage.removeItem("token");
    toast.success("Logout Successfully")
}

// Fetch Users
export async function fetchUsers(token) {
    const res = await fetch(`${BACKEND_URL}/api/v1/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch users");
    }

    return data;
}

// Update user
export async function updateUser(token, userId, updatedData) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result?.message || "Failed to update user");
        }

        return result;
    } catch (error) {
        console.log("Update User Error:", error.message);
        throw error;
    }
}

// Delete User
export async function deleteUser(token, userId) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw data;
        }

        return data;
    } catch (error) {
        throw error || { message: "Something went wrong!" };
    }
}
