// actions/order-actions.ts
"use server"

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData) {
  const serviceId = formData.get("serviceId") as string;
  const price = parseFloat(formData.get("price") as string);

  try {
    const firstUser = await prisma.user.findFirst();
    
    if (!firstUser) {
      return { success: false, message: "No user found in database. Please create a user first." };
    }

    await prisma.order.create({
      data: {
        userId: firstUser.id, 
        serviceId: serviceId,
        totalAmount: price,
        status: "PENDING",
      },
    });

    revalidatePath("/"); 
    return { success: true, message: "Order placed successfully!" };
  } catch (error) {
    console.error("Order Error:", error); 
    return { success: false, message: "Database Error. Check your console." };
  }
}