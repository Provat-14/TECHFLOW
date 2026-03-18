// actions/auth-actions.ts
"use server"

import prisma from "@/lib/db";
import { hashPassword } from "@/lib/auth-utils";

import { comparePassword } from "@/lib/auth-utils";
import { SignJWT } from "jose"; 
import { cookies } from "next/headers";

import { redirect } from "next/navigation";


// reg
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return { error: "User already exists!" };

  const hashedPassword = await hashPassword(password);
  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, 
      },
    });
    return { success: "Registration successful! Please login." };
  } catch (e) {
    return { error: "Something went wrong." };
  }
}

// login
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    return { error: "Invalid email or password" };
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return { error: "Invalid email or password" };
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error("Missing JWT_SECRET env var");

  const secret = new TextEncoder().encode(jwtSecret);
  const token = await new SignJWT({ id: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { success: "Login successful!" };
}

//logout
export async function logoutUser() {
  (await cookies()).delete("session");
  redirect("/login");
}