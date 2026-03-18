import Hero from '@/component/shared/Hero';
import { ServiceCard } from '@/component/cards/ServiceCard';
import { BlogCard } from '@/component/cards/BlogCard';
import prisma from '@/lib/db';
import Link from 'next/link';
import { TestimonialCard } from "@/component/cards/TestimonialCard";

export default async function HomePage() {
  // Fetch services from Database
  const services = await prisma.service.findMany();

  // Fetch latest blog posts
  const posts = await prisma.post.findMany({
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { author: true }
  });

  // Fetch Testimonials
  const reviews = await prisma.review.findMany({
    take: 6,
    orderBy: {
      id: 'desc' 
    }
  });
  

  return (
    <main>
      <Hero />
      
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h2>
              <p className="text-gray-400">Tailored solutions for your digital growth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard 
                  key={service.id}
                  id={service.id.toString()} // Convert to string
                  title={service.title} 
                  price={parseFloat(service.price || '0')} // Convert to number
                  description={service.description}
                />
              ))
            ) : (
              <p className="text-gray-400">No services found. Please seed your database.</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#111111]">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Latest Blog Posts</h2>
              <p className="text-gray-400">Stay updated with our latest insights and tutorials.</p>
            </div>
            <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-gray-400">No blog posts found. Check back later!</p>
            )}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our <span className="text-blue-500">Clients</span> Say
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Trusted by developers and businesses worldwide for high-quality technical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
            {reviews.map((r) => (
              <TestimonialCard 
                key={r.id}
                name={r.user}    
                review={r.comment} 
                rating={r.rating}  
                serviceId={r.product}
              />
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}