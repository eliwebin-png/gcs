import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

const JWT_SECRET = process.env.NEXTAUTH_SECRET || "school-portal-super-secret-key-2025-9834293-jwt";
const TOKEN_NAME = "school_admin_token";

export interface AdminSession {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(admin: AdminSession): string {
  return jwt.sign(
    {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  const decoded = verifyAdminToken(token);
  if (!decoded) return null;

  // Optional verify against database
  const admin = await prisma.admin.findUnique({
    where: { id: decoded.id },
    select: { id: true, username: true, email: true, name: true, role: true, avatar: true },
  });

  return admin;
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function removeAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
}
