import Link from "next/link";

export default function Navbar() {
  return (
    // Dark mode navbar background and text
    <nav className="bg-navy-900 text-slate-200 shadow-md w-full">
      {/* Container for content, centered with padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for alignment */}
        <div className="flex items-center justify-between h-16">
          {/* Left side: Title/Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              // Dark mode link hover
              className="font-bold text-xl hover:text-white transition-colors"
            >
              Call Dashboard
            </Link>
          </div>

          {/* Right side: Navigation Links (Optional) */}
          {/* <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
              <Link href="/settings" className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Settings</Link>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
