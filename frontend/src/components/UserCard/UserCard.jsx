import { FiUser, FiCalendar, FiAtSign } from "react-icons/fi";

function UserCard({ user, setEditUser, onClick }) {
    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "—";

    return (
        <div
            onClick={() => {
                onClick();
                setEditUser(null);
            }}
            key={user._id}
            className="cursor-pointer bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:border-orange-400 transition-all"
        >
            {/* avatar + name */}
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-md">
                    {
                        !user.image ? <FiUser className="text-2xl" /> :
                        <img className="w-full h-full rounded-full object-cover" src={user.image} alt="" />
                    }
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {user?.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                </div>
            </div>

            {/* username + joined */}
            <div className="mt-5 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                    <FiAtSign />
                    {user?.username}
                </span>

                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    <FiCalendar />
                    Joined: {joinedDate}
                </span>
            </div>
        </div>
    );
}

export default UserCard;
