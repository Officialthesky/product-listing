import React from "react";
import Link from "next/link";
import { FiShoppingBag, FiHeart, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  const [cartCount, setCartCount] = React.useState(0);
  const [wishlistCount, setWishlistCount] = React.useState(0);

  React.useEffect(() => {
    // Update counts from localStorage
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    // Initial count
    updateCounts();

    // Listen for storage changes
    window.addEventListener('storage', updateCounts);
    
    // Custom event listener for cart/wishlist updates
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
    };
  }, []);

  return (
    <header className="bg-gray-900 text-white shadow-md py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2 hover:text-gray-400 transition-colors">
          <FiShoppingBag className="h-6 w-6" />
          <span>THE SKY STORE</span>
        </Link>

        {/* Cart and Wishlist */}
        <div className="flex items-center space-x-6">
          <Link href="/wishlist" className="relative hover:text-gray-400 transition-colors">
            <FiHeart className="h-6 w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative hover:text-gray-400 transition-colors">
            <FiShoppingCart className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;