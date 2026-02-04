import { FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/schemas";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function Login() {
    const { register, handleSubmit, isSubmitting, formState: { errors } } = useForm({ resolver: yupResolver(loginSchema) })

    async function onSubmit(data) {
        console.log("Form submitted:", data);
        try {
            const res = await fetch(BACKEND_URL + "api/v1/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                data
            })
            const result = res.json()
            console.log(result);
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

                {/* Header */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Email */}
                    <Input {...register("identifier")} icon={<FiMail />} placeholder="Enter Email or Username" type="email" />
                    {errors.identifier && (
                        <p className="text-red-500 text-sm -mt-3">{errors.identifier.message}</p>
                    )}

                    {/* Password */}
                    <Input {...register("password")} icon={<FiLock />} placeholder="Password" type="password" />
                    {errors.password && (
                        <p className="text-red-500 text-sm -mt-3">{errors.password.message}</p>
                    )}

                    {/* Button */}
                    <button type="submit" disabled={isSubmitting}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium transition
                            ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                    >
                        Login
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <span className="text-orange-500 cursor-pointer hover:underline">
                        <Link to="/">Register</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;

/* Reusable Input */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        <input {...props}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
    </div>
);
