'use client';

import Link from "next/link";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <html lang="en" className="scroll-smooth h-full">
      <body className="bg-[#121212] text-gray-200 flex min-h-screen">
        {/* Sidebar */}
      <aside
            className={`fixed top-0 left-0 z-50 w-60 h-screen bg-[#1e1e1e] flex flex-col p-4
              transform transition-transform duration-300
              ${menuOpen ? "translate-x-0" : "-translate-x-full"}
              md:translate-x-0 md:static md:translate-x-0`}
          >
          <nav className="flex flex-col space-y-4 text-gray-300">
            <Link href="/" className="hover:text-white" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/discover" className="hover:text-white" onClick={() => setMenuOpen(false)}>Discover</Link>
            <div className="mt-4 text-xs text-gray-400 uppercase">Your Stuff</div>
            <Link href="/queue" className="hover:text-white" onClick={() => setMenuOpen(false)}>My Queue</Link>
            <Link href="/podcasts" className="hover:text-white" onClick={() => setMenuOpen(false)}>My Podcasts</Link>
            <Link href="/recents" className="hover:text-white" onClick={() => setMenuOpen(false)}>Recents</Link>
          </nav>
        </aside>
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            ></div>
          )}
        {/* Main content */}
     <main id="scrollableMain"
          className="flex-1 bg-[#121212] overflow-y-auto w-full h-screen "
        >
          {/* Mobile Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] p-4 flex items-center justify-between h-14 md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <FiMenu size={24} className="text-white" />
            </button>
            <h1 className="text-lg font-bold text-white">Logo</h1>
          </header>

          {children}
        </main>
      </body>
    </html>
  );
}
