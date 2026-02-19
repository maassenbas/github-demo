import { Request, Response } from "express";
import * as userService from "../services/userService";

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await userService.register({ email, password });
  res.status(201).json({ user });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await userService.login({ email, password });
  res.json({ token });
}
