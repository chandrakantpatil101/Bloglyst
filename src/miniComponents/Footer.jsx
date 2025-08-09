import React from 'react'
import Logo from './Logo';

function Footer() {
  return (
    
    <footer className="bg-white dark:bg-[#1E1E1E] text-[#1A1A1A] dark:text-[#E0E0E0] pt-10 pb-5 px-6 md:px-20 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Logo + Name */}
        <div className="flex items-center space-x-1">
          <Logo/>
          <span className="text-xl font-semibold">Bloglyst</span>
        </div>

        {/* Right: About */}
        <div>
          <p className="text-sm leading-relaxed">
            Bloglyst is your personal content space — whether you’re sharing thoughts, tutorials, or stories. We believe writing is powerful, and your ideas deserve a place to grow.
          </p>
        </div>
      </div>

      {/* Bottom credit */}
      <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400">
        Developed with 🦅 by Okatu!
        <br />
        {/* Made in INDIA */}
      </div>
    </footer>
  );
};

export default Footer
