// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] pt-20">
      <aside className="w-64 border-r border-white/10 hidden md:block p-6">
        <nav className="space-y-4">
          <div className="text-blue-500 font-bold mb-10">User Panel</div>
          <div className="text-gray-300 hover:text-white cursor-pointer">My Orders</div>
          <div className="text-gray-300 hover:text-white cursor-pointer">Profile</div>
        </nav>
      </aside>
      
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}