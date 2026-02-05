import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { registerSchema } from "../../schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Register() {
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(registerSchema) })

    async function onSubmit(data) {
        try {
            const { confirmPassword, ...newUser } = data

            const res = await fetch(BACKEND_URL + "/api/v1/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            })

            const result = await res.json()
            navigate('/login')
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

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
                    <Input {...register("email")} icon={<FiMail />} placeholder="Email Address" type="email" />
                    {errors.email && (
                        <p className="text-red-500 text-sm -mt-3">{errors.email.message}</p>
                    )}

                    {/* Username */}
                    <Input {...register("username")} icon={<FiMail />} placeholder="Username" type="username" />
                    {errors.username && (
                        <p className="text-red-500 text-sm -mt-3">{errors.username.message}</p>
                    )}

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
