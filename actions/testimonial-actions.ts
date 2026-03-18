//actions/testimonial-actioncs.ts
"use server"
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";    
import { redirect } from "next/navigation";

export async function createReview(formData: FormData) {
  const user = formData.get("name") as string;
  const comment = formData.get("review") as string;
  const rating = formData.get("rating") as string;
  const product = formData.get("service_id") as string;

  try {
    await prisma.review.create({
      data: {
        user,
        comment,
        rating: parseInt(rating),
        product,
      },
    });
    revalidatePath("/dashboard/review"); 
    return { success: "Review added successfully!" };
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong." };
  }
}