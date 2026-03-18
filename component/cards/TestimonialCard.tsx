// component/cards/TestimonialCard.tsx
import prisma from "@/lib/db";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  review: string;
  rating: number;
  serviceId: string; 
}

export const TestimonialCard = async ({ name, review, rating, serviceId }: TestimonialProps) => {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { name: true,description: true }
  });

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-white font-bold text-lg">{name}</h4>
          <span className="text-xs text-blue-500 uppercase tracking-wider font-medium">
            {service?.name || "General Service"}
          </span>
          <p className="text-l text-blue-500 uppercase tracking-wider font-medium">
            {service?.description || "General Service"}
          </p>
        </div>
        
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
            />
          ))}
        </div>
      </div>

      <p className="text-gray-400 text-sm italic">"{review}"</p>
      <div className="mt-6 w-10 h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
    </div>
  );
};