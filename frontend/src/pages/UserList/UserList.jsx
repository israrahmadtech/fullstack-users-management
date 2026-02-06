import { useState, useMemo } from "react";
import { FiUsers } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserCard from "../../components/UserCard/UserCard";
import FormModal from "../../components/FormModal/FormModal";
import UserDetailsPanel from "../../components/UserDetailsPanel/UserDetailsPanel";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, logout } from "../../../services/users.services";
import { useNavigate } from "react-router-dom";
import CurrentUserCard from "../../components/CurrentUserCard/CurrentUserCard";

const UserList = () => {
    const navigate = useNavigate()
    let token = JSON.parse(localStorage.getItem("token"));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");

    // Fetch Users Query
    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: () => fetchUsers(token),
        enabled: !!token,
    });

    const users = data?.users || [];
    const totalUsers = users.length;

    // Filter Users
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // if no token error
    if (!token) return <p className="text-center py-10 text-red-500">Token not found. Please login again.</p>

    // loading
    if (isLoading) return <p className="text-center py-10">Loading...</p>

    // error
    if (error) return <p className="text-center py-10 text-red-500">{error.message}</p>

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <FiUsers className="flex-shrink-0 text-3xl" />
                    <span className="whitespace-nowrap">Users Dashboard</span>

                    <span className="ml-auto sm:ml-3 text-sm bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-medium flex-shrink-0">
                        {filteredUsers.length} / {totalUsers}
                    </span>
                </h2>

                {/* Search */}
                <div className="flex items-center gap-3 max-w-xl w-full">
                    <SearchBar value={search} onChange={setSearch} />

                    <button
                        className="cursor-pointer flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
                        onClick={() => { logout(); navigate("/login", { replace: true }); }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <CurrentUserCard/>

            {/* Cards */}
            {!users.length ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p className="text-xl font-medium text-gray-700">No users found</p>
                    <p className="mt-2 text-sm">No users available</p>
                </div>
            ) : filteredUsers.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    <p className="text-lg font-medium">No matching users found</p>
                    <p className="text-sm mt-1">Try searching with a different keyword</p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredUsers.map((user) => (
                        <UserCard
                            key={"user-" + user._id}
                            onClick={() => setSelectedUser(user)}
                            setIsModalOpen={setIsModalOpen}
                            setEditUser={setEditUser}
                            user={user}
                        />
                    ))}
                </div>
            )}

            {/* User Details Panel */}
            <UserDetailsPanel
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onEdit={() => {
                    setEditUser(selectedUser);
                    setIsModalOpen(true);
                }}
            />

            {/* Form Modal (Only Update) */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditUser(null);
                }}
                initialData={editUser}
                onUpdated={(updatedUser) => {
                    setSelectedUser(updatedUser);   // 👈 user details panel update
                }}
            />
        </div>
    );
};

export default UserList;
