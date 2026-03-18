// components/shared/Navbar.tsx
import Link from 'next/link';
import { cookies } from 'next/headers';
import { logoutUser } from '@/actions/auth-actions'; 

const Navbar = async () => {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('session');

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0a0a]/60 backdrop-blur-lg">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white uppercase">
          TECH<span className="text-blue-500">FLOW</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          {isLoggedIn && (
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <form action={logoutUser}>
              <button 
                type="submit"
                className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium"
              >
                Logout
              </button>
            </form>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                Login
              </Link>
              <Link 
                href="/register" 
                className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;