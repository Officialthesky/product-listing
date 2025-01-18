import React from "react";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-400">
          <FiShoppingBag className="h-6 w-6" />
          <span>THE SKY STORE</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
