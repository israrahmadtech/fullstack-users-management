import express from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../controllers/users.controller.mjs";

export const usersRoute = express.Router()

usersRoute.get('/', getUsers)

usersRoute.get('/:userId', getUserById)

usersRoute.patch("/:userId", updateUser);

usersRoute.delete("/:userId", deleteUser);
