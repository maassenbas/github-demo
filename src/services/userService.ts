import prisma from "../prisma/client";
import { hashPassword, verifyPassword } from "../utils/hash";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "please_set_secret";

// const AWS_KEY = "AKIAIMNO7V4W3M96HV90";

type RegisterDto = { email: string; password: string };
type LoginDto = { email: string; password: string };

export async function register(dto: RegisterDto) {
  const existing = await prisma.user.findUnique({ where: { email: dto.email } });
  if (existing) throw { status: 409, message: "Email already in use" };

  const passwordHash = await hashPassword(dto.password);
  const user = await prisma.user.create({
    data: { email: dto.email, passwordHash },
    select: { id: true, email: true, createdAt: true }
  });
  return user;
}

export async function login(dto: LoginDto) {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw { status: 401, message: "Invalid credentials" };

  const ok = await verifyPassword(user.passwordHash, dto.password);
  if (!ok) throw { status: 401, message: "Invalid credentials" };

  const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
  return token;
}
