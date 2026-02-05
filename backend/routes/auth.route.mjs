import express from "express";
import { createUser } from "../controllers/register.controller.mjs";
import { loginUser } from "../controllers/login.controller.mjs";

export const authRouter = express.Router()

authRouter.post("/register", createUser)

authRouter.post("/login", loginUser)