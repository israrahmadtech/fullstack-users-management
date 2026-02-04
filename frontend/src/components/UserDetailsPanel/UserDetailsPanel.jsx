import { FiX, FiMail, FiPhone, FiMapPin, FiBriefcase, FiEdit, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../store/users/usersSlice";


const UserDetailsPanel = ({ onClose, onEdit }) => {
    const { selectedUser } = useSelector(state => state.usersManager)
    const dispatch = useDispatch()

    if (!selectedUser) return null;
    
    // delete user
    function handleDeleteUser(userId) {
        const confirmed = confirm("Do you really want to delete user?")
        if (confirmed) {
            dispatch(deleteUser(userId))
            onClose()
        }
        else return
    }

    return (
        <div>
            <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={onClose}
            />

            {/* Side Panel */}
            <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slideIn">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        User Details
                    </h2>
                    <button onClick={onClose}
                        className="cursor-pointer text-gray-400 hover:text-gray-600"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
                            {selectedUser.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {selectedUser.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {selectedUser.email}
                            </p>
                        </div>
                    </div>

                    {/* Info */}
                    <InfoRow icon={<FiMail />} label="Email" value={selectedUser.email} />
                    <InfoRow icon={<FiPhone />} label="Phone" value={selectedUser.phone || "—"} />
                    <InfoRow icon={<FiMapPin />} label="City" value={selectedUser.city} />
                    <InfoRow
                        icon={<FiBriefcase />}
                        label="Company"
                        value={selectedUser.company}
                    />

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">
                        <button
                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg py-2.5 text-sm font-medium"
                            onClick={onEdit}
                        >
                            <FiEdit /> Edit
                        </button>

                        <button
                            className="cursor-pointer flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg py-2.5 text-sm font-medium"
                            onClick={() => handleDeleteUser(selectedUser.id)}
                        >
                            <FiTrash2 /> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPanel;

/* Small helper */
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <span className="mt-1 text-gray-400">{icon}</span>
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-800">
                {value}
            </p>
        </div>
    </div>
);
