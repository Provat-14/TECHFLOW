// components/shared/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-darkBg text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent  from-white to-gray-500 mb-6">
          Next-Gen Tech Solutions <br /> & Insightful Blogs
        </h1>
        
        <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10">
          প্রিমিয়াম ওয়েব ডেভেলপমেন্ট সার্ভিস এবং লেটেস্ট টেক ট্রেন্ড নিয়ে আমাদের ব্লগ। 
          আপনার ডিজিটাল আইডিয়িাকে বাস্তবে রূপ দিন।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all font-medium">
            Explore Services
          </button>
          
          <button className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 font-medium">
            Read Our Blog
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;