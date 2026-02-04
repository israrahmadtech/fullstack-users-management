import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { FiUsers, FiPlus } from "react-icons/fi";
import SearchBar from "../../components/SearchBar/SearchBar";
import UserCard from "../../components/UserCard/UserCard";
import FormModal from "../../components/FormModal/FormModal";
import { addUser, setSelectedUser, updateUser } from "../../store/users/usersSlice";
import UserDetailsPanel from "../../components/UserDetailsPanel/UserDetailsPanel";

// Initial form data(reset)
const initialFormState = {
    name: "",
    email: "",
    phone: "",
    city: "",
    company: "",
};

const UserList = () => {
    // users slice - RTK
    const { users = [], totalUsers = 0, selectedUser = null } = useSelector(
        (state) => state?.usersManager || {}
    );
    const dispatch = useDispatch()

    // Form state
    const [formData, setFormData] = useState(initialFormState);

    // states for form model
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editUser, setEditUser] = useState(null);

    const [search, setSearch] = useState("");
    // Realtime filter
    const filteredUsers = useMemo(() => {
        return users.filter((user) =>
            `${user.name} ${user.email}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [users, search]);

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex  items-center gap-2">
                    <FiUsers className="flex-shrink-0 text-3xl" />
                    <span className="whitespace-nowrap">Users Dashboard</span>
                    <span className="ml-auto sm:ml-3 text-sm bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-medium flex-shrink-0">
                        {filteredUsers.length} / {totalUsers}
                    </span>
                </h2>
                {/* Search */}
                <div className="flex items-center gap-3 flex-wrap max-w-lg w-full">
                    <SearchBar value={search} onChange={setSearch} />
                </div>
            </div>

            {/* Cards */}
            {!users.length ?
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                    <p className="text-xl font-medium text-gray-700">No users found</p>
                    <p className="mt-2 text-sm">Start by adding a new team member</p>
                </div> :
                filteredUsers?.length === 0 ?
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg font-medium">No matching users found</p>
                        <p className="text-sm mt-1">Try searching with a different keyword</p>
                    </div> :
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredUsers?.map((user) => (
                            <UserCard key={"user-" + user.id} onClick={() => { dispatch(setSelectedUser({ ...user })); }}
                                setIsModalOpen={setIsModalOpen} setEditUser={setEditUser} user={user} />
                        ))}
                    </div>
            }

            {/* user details panel */}
            {selectedUser && (
                <UserDetailsPanel
                    user={selectedUser}
                    onClose={() => dispatch(setSelectedUser(null))}
                    onEdit={() => {
                        setEditUser(selectedUser);
                        setIsModalOpen(true);
                    }}
                />
            )}

            {/* form modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setFormData({ ...selectedUser }) }}
                mode={editUser ? "edit" : "add"}
                initialData={editUser}
                formData={formData}
                setFormData={setFormData}
                onSubmit={(data) => {
                    if (editUser) {
                        dispatch(updateUser({ ...data }))
                    } else {
                        dispatch(addUser({ ...data }))
                    }
                }}
            />
        </div>
    );
};

export default UserList;
