import { createSlice } from '@reduxjs/toolkit';
import { users } from './usersData';
import toast from 'react-hot-toast';
import { isValidEmail } from '../../components/utils/utils';

const initialState = {
    users,
    selectedUser: null,
    totalUsers: users?.length
};

let nextId = initialState.users.length + 1;

const userSlice = createSlice({
    name: 'usersManager',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const payload = action.payload || {};

            // Required fields
            if (!payload.name || !payload.email || !payload.phone || !payload.city || !payload.company) {
                toast.error("All fields are required!");
                return;
            }

            // Email format validation
            const email = payload.email.trim().toLowerCase();
            if (!isValidEmail(email)) {
                toast.error("Invalid email!");
                return;
            }

            // Duplicate email check
            const alreadyExists = state.users.some(user => user.email.toLowerCase() === email);
            if (alreadyExists) {
                toast.error("User with this email already exists!");
                return;
            }

            // Add user
            const newUser = { ...payload, id: nextId++ };
            state.users.push(newUser);
            state.totalUsers += 1;
            toast.success(`${newUser.name} added successfully!`);
        },

        updateUser: (state, action) => {
            const payload = action.payload || {};

            if (!payload.name || !payload.email || !payload.phone || !payload.city || !payload.company) {
                toast.error("All fields are required!");
                return;
            }

            // Validate email format
            const email = payload.email.trim().toLowerCase();
            if (!isValidEmail(email)) {
                toast.error("Invalid email!");
                return;
            }

            // user exists or not
            const index = state.users.findIndex(user => user.email.toLowerCase() === email);
            if (index === -1) {
                toast.error("User not found!");
                return;
            }

            // Prevent duplicate email with other users
            const duplicate = state.users.find(user => user.email.toLowerCase() === email && user.id !== state.users[index].id);
            if (duplicate) {
                toast.error("Another user with this email already exists!");
                return;
            }

            // Update user
            const updatedUser = { ...state.users[index], ...payload };
            state.users[index] = updatedUser;
            state.selectedUser = updatedUser;

            toast.success(`${updatedUser.name} updated successfully!`);
        },

        deleteUser: (state, action) => {
            const id = action.payload;
            if (!id) {
                toast.error("Invalid user ID");
                return;
            }

            const user = state.users.find((u) => u.id === id);
            if (!user) {
                toast.error("User not found!");
                return;
            }

            state.users = state.users.filter((u) => u.id !== id);
            state.totalUsers -= 1

            // Clear selected user if it's the deleted one
            if (state.selectedUser?.id === id) {
                state.selectedUser = null;
            }

            toast.success(`${user.name} deleted successfully!`);
        },

        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload || null;
        },
    },
});

export const { addUser, updateUser, deleteUser, setSelectedUser } = userSlice.actions;
export const usersReducer = userSlice.reducer;