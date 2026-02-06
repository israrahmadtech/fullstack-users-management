import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FiUser, FiMail, FiShield } from "react-icons/fi";

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

    if (!user) {
        return (
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
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

            <div className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2">
                    <FiUser className="text-orange-500" />
                    <span className="font-medium">ID:</span> {user?.id || user?._id}
                </p>

                <p className="flex items-center gap-2">
                    <FiMail className="text-orange-500" />
                    <span className="font-medium">Email:</span> {user?.email || "N/A"}
                </p>

                <p className="flex items-center gap-2">
                    <FiShield className="text-orange-500" />
                    <span className="font-medium">Role:</span> {user?.role || "User"}
                </p>
            </div>
        </div>
    );
}

export default CurrentUserCard;
