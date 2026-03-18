import prisma from "@/lib/db";
import { BlogCard } from "@/component/cards/BlogCard";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Latest <span className="text-blue-500">Insights</span></h1>
        <p className="text-gray-400">Explore our latest technology and service updates.</p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}