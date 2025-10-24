import React from "react";
import AuthButton from "./AuthButton";
/* Landing Page Header Component*/

const Header = () => {
  // Give a gradient effect to text
  const GRADIENT_CLASS =
    "text-2xl font-bold bg-gradient-to-r from-[#FFD200] via-[#E60000] via-[#D90166] via-[#A100FF] to-[#0072FF] inline-block text-transparent bg-clip-text";
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md h-20 border-b border-gray-300">
      <div className="flex items-center h-full">
        {/* Sky */}
        <div className="px-4 flex items-center h-full">
          <a href="https://www.sky.com">
            <img
              src="src/assets/logo.webp"
              alt="Sky Logo"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 h-full" />

        {/* Sky Immersion */}
        <div className="px-4 flex items-center h-full">
          <p className={GRADIENT_CLASS}>
            <a href="/">Immersion</a>
          </p>
        </div>
      </div>

      <AuthButton />
    </header>
  );
};

export default Header;
