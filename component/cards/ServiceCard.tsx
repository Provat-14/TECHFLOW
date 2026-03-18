// component/cards/ServiceCard.tsx
"use client" 

import { createOrder } from "@/actions/order-actions";
import { useState } from "react";

interface ServiceProps {
  id: string; 
  title: string;   
  price: number;  
  description: string;
}

export const ServiceCard = ({ id, title, price, description }: ServiceProps) => {
  const [loading, setLoading] = useState(false);

  const handleOrder = async (formData: FormData) => {
    setLoading(true);
    const result = await createOrder(formData);
    setLoading(false);

    if (result.success) {
      alert("Order placed successfully! Check your dashboard.");
    } else {
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm group hover:border-blue-500/50 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-white">${price}</span>
        
        <form action={handleOrder}>
          <input type="hidden" name="serviceId" value={id} />
          <input type="hidden" name="price" value={price} />
          
          <button 
            type="submit"
            disabled={loading}
            className={`px-5 py-2 rounded-lg text-white font-semibold transition-all active:scale-95 ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
            }`}
          >
            {loading ? "Ordering..." : "Order Now"}
          </button>
        </form>
      </div>
    </div>
  );
};