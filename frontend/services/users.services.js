const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch Users
export async function fetchUsers(token) {
    token = JSON.stringify(token)
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
    token = JSON.stringify(token)
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
    token = JSON.stringify(token)
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
