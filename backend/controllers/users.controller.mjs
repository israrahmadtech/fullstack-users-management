import User from "../models/User.mjs";

export async function getUsers(req, res) {
    try {
        const users = await User.find().select("-password")

        res.status(200).json({ isSuccess: true, message: "Users fetched successfully", totalUsers: users.length, users })
    }
    catch (error) {
        res.status(500).json({ isSuccess: false, message: "Internal server error" })
    }
}

// Get Single User using ID
export async function getUserById(req, res) {
    try {
        const { userId } = req.params;

        // check userId exists
        if (!userId) {
            return res.status(400).json({
                isSuccess: false,
                message: "User ID is required"
            });
        }

        // find user
        const user = await User.findById(userId).select("-password");

        // check user exists
        if (!user) {
            return res.status(404).json({ isSuccess: false, message: "User not found" });
        }

        res.status(200).json({ isSuccess: true, message: "User fetched successfully", user });

    }
    catch (error) {
        res.status(500).json({ isSuccess: false, message: "Internal server error" });
    }
}

// Update User
export async function updateUser(req, res) {
    try {
        const { userId } = req.params;

        const { name, email, username } = req.body;

        // Check userId
        if (!userId) {
            return res
                .status(400)
                .json({ isSuccess: false, message: "User ID is required!" });
        }

        // At least one field required
        if (!name && !email && !username) {
            return res.status(400).json({
                isSuccess: false,
                message: "At least one field is required to update!",
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ isSuccess: false, message: "User not found!" });
        }

        // Duplicate email check
        if (email) {
            const emailExists = await User.findOne({
                email,
                _id: { $ne: userId },
            });

            if (emailExists) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "Email already exists!",
                });
            }
        }

        // Duplicate username check
        if (username) {
            const usernameExists = await User.findOne({
                username,
                _id: { $ne: userId },
            });

            if (usernameExists) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "Username already exists!",
                });
            }
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                ...(name && { name }),
                ...(email && { email }),
                ...(username && { username }),
            },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            isSuccess: true,
            message: "User updated successfully!",
            updatedUser,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ isSuccess: false, message: "Internal server error" });
    }
}

// Delete User
export async function deleteUser(req, res) {
    try {
        const { userId } = req.params;

        // check id
        if (!userId) {
            return res.status(400).json({
                isSuccess: false,
                message: "User ID is required",
            });
        }

        // find user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                message: "User not found",
            });
        }

        // delete user
        await User.findByIdAndDelete(userId);

        return res.status(200).json({
            isSuccess: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
        });
    }
}
