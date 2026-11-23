"use server";

import prisma from "@/lib/prisma";
import { comparePassword, hashPassword, signAdminToken, setAdminSessionCookie, removeAdminSessionCookie, getAdminSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function loginAdminAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { success: false, error: "Please provide both username and password." };
  }

  try {
    const trimmedUsername = username.trim();
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { username: trimmedUsername },
          { email: trimmedUsername },
          ...(trimmedUsername.toLowerCase() === "admin" ? [{ username: "gcs@admin" }] : []),
          ...(trimmedUsername.toLowerCase() === "gcs@admin" ? [{ username: "admin" }] : []),
        ],
      },
    });

    if (!admin) {
      return { success: false, error: "Invalid username or password." };
    }

    const isValid = await comparePassword(password, admin.password);
    if (!isValid) {
      return { success: false, error: "Invalid username or password." };
    }

    const token = signAdminToken({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      avatar: admin.avatar,
    });

    await setAdminSessionCookie(token);

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred during login." };
  }
}

export async function logoutAdminAction() {
  await removeAdminSessionCookie();
  return { success: true };
}

export async function updateAdminProfileAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const avatar = formData.get("avatar") as string;

  try {
    await prisma.admin.update({
      where: { id: session.id },
      data: { name, email, avatar },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update profile." };
  }
}

export async function changeAdminPasswordAction(formData: FormData) {
  const session = await getAdminSession();
  if (!session) return { success: false, error: "Unauthorized" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword || newPassword.length < 6) {
    return { success: false, error: "New password must be at least 6 characters." };
  }

  const admin = await prisma.admin.findUnique({ where: { id: session.id } });
  if (!admin) return { success: false, error: "Admin not found." };

  const isValid = await comparePassword(currentPassword, admin.password);
  if (!isValid) return { success: false, error: "Current password is incorrect." };

  const newHash = await hashPassword(newPassword);
  await prisma.admin.update({
    where: { id: session.id },
    data: { password: newHash },
  });

  return { success: true };
}
