import { object, ref, string } from "yup"

export const registerSchema = object()
    .test(
        "email-or-username",
        "Email or Username is required",
        function (values) {
            const { email, username } = values;
            return Boolean(email || username);
        }
    )
    .shape({
        name: string().required("Name is required").min(3, "Minimum 3 characters").max(50, "Name too long"),
        email: string().trim().lowercase().email("Invalid email address").required("Email is required"),
        username: string().trim().lowercase().nullable(),
        password: string().required().min(6, "Minimum 6 characters").max(20, "Too long").matches(/[A-Z]/, "1 uppercase required").matches(/\d/, "1 number required"),
        confirmPassword: string().oneOf([ref("password")], "Password must match").required("Confirm password is required")
    })

export const loginSchema = object({
    identifier: string()
        .trim()
        .required("Email or Username is required")
        .test(
            "email-or-username",
            "Enter a valid email or username",
            (value) => {
                if (!value) return false;

                // email check
                if (value.includes("@")) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                }

                // username check
                return /^[a-zA-Z0-9_]{3,20}$/.test(value);
            }
        ),

    password: string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const updateUserSchema = object(
    {
        name: string().required("Name is required").min(3, "Minimum 3 characters").max(50, "Name too long"),
        email: string().trim().lowercase().email("Invalid email address").required("Email is required"),
        username: string().trim().lowercase().nullable(),
    }
)