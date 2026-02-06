import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FiUser, FiMail, FiAtSign, FiClock } from "react-icons/fi";

function CurrentUserCard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            setUser(decoded);
        } catch (error) {
            console.log("Invalid token:", error.message);
        }
    }, []);

    // Convert JWT timestamp into readable date
    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp * 1000).toLocaleString();
    };

    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full max-w-md">
                <h2 className="text-lg font-semibold text-gray-800">
                    Current User
                </h2>
                <p className="text-gray-500 mt-2">No user logged in</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Current User
            </h2>

            <div className="space-y-3 text-gray-700 text-sm">

                {/* Name */}
                <p className="flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    <span className="font-medium">Name:</span> {user?.name || "N/A"}
                </p>

                {/* Email */}
                <p className="flex items-center gap-2">
                    <FiMail className="text-orange-500" />
                    <span className="font-medium">Email:</span> {user?.email || "N/A"}
                </p>

                {/* Username */}
                <p className="flex items-center gap-2">
                    <FiAtSign className="text-orange-500" />
                    <span className="font-medium">Username:</span>{" "}
                    {user?.username ? user.username : "Not Set"}
                </p>

                {/* User ID */}
                <p className="flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    <span className="font-medium">User ID:</span> {user?.id}
                </p>

                {/* Token Issued At */}
                <p className="flex items-center gap-2">
                    <FiClock className="text-orange-500" />
                    <span className="font-medium">Issued At:</span>{" "}
                    {formatDate(user?.iat)}
                </p>

                {/* Token Expiry */}
                <p className="flex items-center gap-2">
                    <FiClock className="text-orange-500" />
                    <span className="font-medium">Expires At:</span>{" "}
                    {formatDate(user?.exp)}
                </p>
            </div>
        </div>
    );
}

export default CurrentUserCard;
