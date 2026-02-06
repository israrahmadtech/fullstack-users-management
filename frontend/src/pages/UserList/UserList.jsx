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

    const formatDate = (timestamp) => {
        if (!timestamp) return "N/A";
        return new Date(timestamp * 1000).toLocaleString();
    };

    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full">
                <h2 className="text-lg font-semibold text-gray-800">
                    Current User
                </h2>
                <p className="text-gray-500 mt-2">No user logged in</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
                Current User
            </h2>

            {/* Responsive Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">

                {/* Name */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiUser className="text-orange-500" />
                    <span className="font-medium">Name:</span>
                    <span className="truncate">{user?.name || "N/A"}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiMail className="text-orange-500" />
                    <span className="font-medium">Email:</span>
                    <span className="truncate">{user?.email || "N/A"}</span>
                </div>

                {/* Username */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiAtSign className="text-orange-500" />
                    <span className="font-medium">Username:</span>
                    <span className="truncate">
                        {user?.username ? user.username : "Not Set"}
                    </span>
                </div>

                {/* User ID */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiUser className="text-orange-500" />
                    <span className="font-medium">User ID:</span>
                    <span className="truncate">{user?.id}</span>
                </div>

                {/* Issued At */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiClock className="text-orange-500" />
                    <span className="font-medium">Issued At:</span>
                    <span className="truncate">{formatDate(user?.iat)}</span>
                </div>

                {/* Expiry */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <FiClock className="text-orange-500" />
                    <span className="font-medium">Expires At:</span>
                    <span className="truncate">{formatDate(user?.exp)}</span>
                </div>

            </div>
        </div>
    );
}

export default CurrentUserCard;
