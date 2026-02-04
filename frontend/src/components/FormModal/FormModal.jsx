import { useEffect } from "react";
import toast from "react-hot-toast";
import { FiX, FiUser, FiMail, FiMapPin, FiBriefcase, FiPhone } from "react-icons/fi";
import { useSelector } from "react-redux";
import { isValidEmail } from "../utils/utils";

function FormModal({ isOpen, onClose, onSubmit, mode = "add", initialData, formData, setFormData }) {
    const { users = [], selectedUser = null } = useSelector(state => state.usersManager)
    // Edit mode
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData(initialData);
        }
    }, [mode, initialData]);

    if (!isOpen) {
        return null
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.city || !formData.company) {
            toast.error("All fields are required!");
            return;
        }

        const email = formData.email.trim().toLowerCase();

        if (!isValidEmail(email)) {
            toast.error("Invalid email!")
            return
        }

        // Duplicate email check based on mode
        if (mode === "add") {
            // Adding a new user
            const alreadyExists = users?.find((u) => u.email.toLowerCase() === email);
            if (alreadyExists) {
                toast.error("User with this email already exists!");
                return;
            }
        } else if (mode === "edit") {
            // Editing an existing user
            const alreadyExists = users?.find( (u) => u.email.toLowerCase() === email && u.id !== selectedUser?.id );
            if (alreadyExists) {
                toast.error("Another user with this email already exists!");
                return;
            }
        }

        onSubmit(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-0"
            onClick={onClose}
        >
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button onClick={() => { onClose() }}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FiX size={20} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {mode === "add" ? "Add New User" : "Edit User"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <Input
                        icon={<FiUser />} name="name"
                        placeholder="Full Name" value={formData.name || ""}
                        onChange={handleChange} type={"text"} />

                    {/* Email */}
                    <Input
                        icon={<FiMail />} name="email"
                        placeholder="Email Address" value={formData.email || ""}
                        onChange={handleChange} type="email"
                    />

                    {/* Phone */}
                    <Input
                        icon={<FiPhone />} name="phone"
                        placeholder="Phone" value={formData.phone || ""}
                        onChange={handleChange} type="tel"
                    />

                    {/* City */}
                    <Input
                        icon={<FiMapPin />} name="city"
                        placeholder="City" value={formData.city || ""}
                        onChange={handleChange} type={"text"}
                    />

                    {/* Company */}
                    <Input
                        icon={<FiBriefcase />} name="company"
                        placeholder="Company" value={formData.company || ""}
                        onChange={handleChange} type={"text"}
                    />

                    {/* btns */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => { onClose() }} type="button"
                            className="cursor-pointer flex-1 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button type="submit"
                            className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2.5 text-sm font-medium"
                        >
                            {mode === "add" ? "Add User" : "Update User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormModal;

/* Reusable Input */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input {...props} required
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);