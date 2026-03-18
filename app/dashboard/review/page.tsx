// app/dashboard/post/page.tsx
import prisma from "@/lib/db";
import {createReview} from "@/actions/testimonial-actions"


export default async function ReviewPage() {
  const services = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return (
    <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
      <h1 className="text-2xl font-bold text-white mb-6">Create Review</h1>
      
      <form action={createReview} className="space-y-4">
        <input 
          name="name"
          type="text" 
          placeholder="type your Display name" 
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white"
        />
        <textarea
          name="review"
          placeholder="Write your reveiw here..." 
          className="w-full p-3 h-40 rounded-xl bg-white/5 border border-white/10 text-white"
        ></textarea>
        <div className="flex flex-row-reverse justify-end gap-1 group">
          {/* Star 5 */}
          <input type="radio" id="star5" name="rating" value="5" className="hidden peer" />
          <label htmlFor="star5" className="text-3xl text-gray-400 cursor-pointer hover:text-yellow-400 peer-checked:text-yellow-400 peer-hover:text-yellow-400">★</label>

          {/* Star 4 */}
          <input type="radio" id="star4" name="rating" value="4" className="hidden peer" />
          <label htmlFor="star4" className="text-3xl text-gray-400 cursor-pointer hover:text-yellow-400 peer-checked:text-yellow-400 peer-hover:text-yellow-400">★</label>

          {/* Star 3 */}
          <input type="radio" id="star3" name="rating" value="3" className="hidden peer" />
          <label htmlFor="star3" className="text-3xl text-gray-400 cursor-pointer hover:text-yellow-400 peer-checked:text-yellow-400 peer-hover:text-yellow-400">★</label>

          {/* Star 2 */}
          <input type="radio" id="star2" name="rating" value="2" className="hidden peer" />
          <label htmlFor="star2" className="text-3xl text-gray-400 cursor-pointer hover:text-yellow-400 peer-checked:text-yellow-400 peer-hover:text-yellow-400">★</label>

          {/* Star 1 */}
          <input type="radio" id="star1" name="rating" value="1" className="hidden peer" />
          <label htmlFor="star1" className="text-3xl text-gray-400 cursor-pointer hover:text-yellow-400 peer-checked:text-yellow-400 peer-hover:text-yellow-400">★</label>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Select Service</label>
          <select 
            name="service_id" 
            className="w-full p-3 rounded-xl bg-[#0a0a0a] border border-white/10 text-white focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Choose a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
          Publish Review
        </button>
      </form>
    </div>
  );
}