// app/services/page.tsx
import prisma from "@/lib/db";
import { ServiceCard } from "@/component/cards/ServiceCard";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: {
      price: 'asc', 
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Explore Our <span className="text-blue-500">Premium</span> Services
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Choose from our specialized web development, design, and technical solutions 
            tailored to scale your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard 
                key={service.id}
                id={service.id}
                title={service.name} 
                price={Number(service.price)} 
                description={service.description}
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-white/10 rounded-3xl bg-white/5">
              <p className="text-gray-500 italic">No services available at the moment. Check back later!</p>
            </div>
          )}
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-20">
          <div>
            <h4 className="text-white font-bold mb-3 text-lg underline decoration-blue-500 underline-offset-8">Fast Delivery</h4>
            <p className="text-gray-500 text-sm">We prioritize deadlines without compromising quality.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-lg underline decoration-blue-500 underline-offset-8">Secure Payment</h4>
            <p className="text-gray-500 text-sm">Manual or automated, your transactions are always safe.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3 text-lg underline decoration-blue-500 underline-offset-8">24/7 Support</h4>
            <p className="text-gray-500 text-sm">Our technical team is always ready to assist you.</p>
          </div>
        </div>

      </div>
    </div>
  );
}