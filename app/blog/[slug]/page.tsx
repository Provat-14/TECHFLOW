// app/blog/[slug]/page.tsx
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

export default async function SingleBlogPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug }, 
    include: { author: true }
  });

  if (!post) notFound();

  return (
    <article className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
        <div className="prose prose-invert">
          {post.content}
        </div>
      </div>
    </article>
  );
}