import { useEffect } from "react";
import { FiX, FiUser, FiMail, FiAtSign } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserSchema } from "../../schemas/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../../services/users.services";

function FormModal({ isOpen, onClose, initialData, onUpdated }) {
    const queryClient = useQueryClient();

    let token = JSON.parse(localStorage.getItem("token"))

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(updateUserSchema),
    });

    // Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: ({ userId, updatedData }) =>
            updateUser(token, userId, updatedData),

        onSuccess: (data) => {
            toast.success(data?.message || "User updated successfully!");
            queryClient.invalidateQueries(["users"]);
            onClose();
            if (onUpdated) {
                onUpdated(data?.updatedUser); // 👈 backend se updated user bhejna hoga
            }
        },

        onError: (error) => {
            toast.error(error?.message || "Something went wrong!");
        },
    });

    // Default Values Set
    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData?.name || "",
                email: initialData?.email || "",
                username: initialData?.username || "",
            });
        }
    }, [initialData, reset]);

    if (!isOpen) return null;

    // Submit Handler (inside modal)
    const submitHandler = (data) => {
        if (!initialData?._id) {
            toast.error("User ID not found!");
            return;
        }

        mutate({
            userId: initialData._id,
            updatedData: data,
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-2 sm:px-0"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FiX size={20} />
                </button>

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Update User
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(submitHandler, (err) => { console.log("FORM ERRORS:", err); })}
                    className="space-y-4">
                    {/* Name */}
                    <Input
                        {...register("name")}
                        icon={<FiUser />}
                        placeholder="Full Name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm -mt-3">
                            {errors.name.message}
                        </p>
                    )}

                    {/* Email */}
                    <Input
                        {...register("email")}
                        icon={<FiMail />}
                        placeholder="Email Address"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm -mt-3">
                            {errors.email.message}
                        </p>
                    )}

                    {/* Username */}
                    <Input
                        {...register("username")}
                        icon={<FiAtSign />}
                        placeholder="Username"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm -mt-3">
                            {errors.username.message}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer flex-1 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="cursor-pointer flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2.5 text-sm font-medium disabled:opacity-50"
                        >
                            {isPending ? "Updating..." : "Update User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormModal;

/* Reusable Input */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
        </span>

        <input
            {...props}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);
