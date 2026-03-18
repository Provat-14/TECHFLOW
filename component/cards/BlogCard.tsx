import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
  post: {
    id: string | number;
    title: string;
    slug: string;
    content: string;
    image?: string | null;
    author: {
      name?: string | null;
    };
    createdAt: Date;
  };
}

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-blue-500/50 transition-all">
        {post.image ? (
          <div className="aspect-video relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-800" />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
            {post.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {post.content}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white">
              {post.author.name?.charAt(0) || 'A'}
            </div>
            <span className="text-xs text-gray-500">
              {post.author.name || 'Anonymous'} • {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};