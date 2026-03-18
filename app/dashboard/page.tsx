// app/dashboard/page.tsx
import prisma from "@/lib/db";

export default async function DashboardPage() {
  const orders = await prisma.order.findMany({
    include: {
      service: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">My Orders</h1>
      
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-gray-400 uppercase text-xs">
              <th className="px-6 py-4">Service Name</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{order.service.name}</td>
                <td className="px-6 py-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 font-semibold text-blue-400">${order.totalAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'PAID' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}