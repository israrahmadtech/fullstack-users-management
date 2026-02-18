import { FiUser, FiMail, FiLock, FiImage } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { registerSchema } from "../../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { registerUser } from "../../../services/users.service";
import { uploadImg } from "../../../services/upload.service";
import { useState } from "react";

function Register() {
    const navigate = useNavigate()
    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) })

    const imageUrl = watch("image")

    async function onSubmit(data) {
        const result = await registerUser(data);

        if (result.isSuccess) {
            toast.success(result.message);
            navigate("/login");
        } else {
            toast.error(result.message);
        }
    }

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true)

            const data = await uploadImg(file)

            setValue("image", data?.imageUrl, { shouldValidate: true })

            toast.success("Image upload successfully!")
        }
        catch (error) {
            toast.error("Image upload failed!")
            console.log(error)
        }
        finally {
            setUploading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                    {/* Image Preview */}
                    {imageUrl && (
                        <div className="flex justify-center">
                            <img
                                src={imageUrl}
                                alt="preview"
                                className="w-20 h-20 rounded-full object-cover border"
                            />
                        </div>
                    )}

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Create Account
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Name */}
                    <Input {...register("name")} icon={<FiUser />} placeholder="Full Name" type="text" />
                    {errors.name && (
                        <p className="text-red-500 text-sm -mt-3">{errors.name.message}</p>
                    )}

                    {/* Email */}
                    <Input {...register("email")} icon={<FiMail />} placeholder="Email Address" />
                    {errors.email && (
                        <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>
                    )}

                    {/* Username */}
                    <Input {...register("username")} icon={<FiMail />} placeholder="Username" />
                    {errors.username && (
                        <p className="text-red-500 text-sm -mt-3">{errors.username.message}</p>
                    )}

                    {/* Profile Image Upload */}
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FiImage />
                        </span>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    {/* Image Error */}
                    {errors.image && (
                        <p className="text-red-500 text-sm -mt-3">{errors.image.message}</p>
                    )}

                    {/* Hidden Input to register image field */}
                    <input type="hidden" {...register("image")} />

                    {/* Password */}
                    <Input {...register("password")} icon={<FiLock />} placeholder="Password" type="password" />
                    {errors.password && (
                        <p className="text-red-500 text-sm -mt-3">{errors.password.message}</p>
                    )}

                    {/* Confirm Password */}
                    <Input {...register("confirmPassword")} icon={<FiLock />} placeholder="Confirm Password" type="password" />
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm -mt-3">{errors.confirmPassword.message}</p>
                    )}

                    {/* Button */}
                    <button type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-2.5 text-sm font-medium transition"
                    >
                        Register
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 text-center mt-4">
                    Already have an account?{" "}
                    <span className="text-orange-500 cursor-pointer hover:underline">
                        <Link to="/login">Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Register;

/* Reusable Input */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input {...props}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg
      focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);
