import Layout from '@/components/Layout';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaShareAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import "../../styles/globals.css";
import { fetchProductById } from '../../services/api';
import { capitalizeWords, useDebounce } from '../../utils';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetail({ product }) {

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    // Check if product is in cart/wishlist on mount
    checkProductStatus();
  }, [product.id]);

  const checkProductStatus = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    setIsInCart(cart.some(item => item.id === product.id));
    setIsInWishlist(wishlist.some(item => item.id === product.id));
  };

  const updateLocalStorage = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
    // Dispatch custom event to update header counts
    window.dispatchEvent(new Event(`${key}Updated`));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (isInCart) {
      const updatedCart = cart.filter(item => item.id !== product.id);
      updateLocalStorage('cart', updatedCart);
      setIsInCart(false);
      toast.error(`Removed from Cart`);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      updateLocalStorage('cart', updatedCart);
      setIsInCart(true);
      toast.success(`Added to Cart`);
    }
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      updateLocalStorage('wishlist', updatedWishlist);
      setIsInWishlist(false);
      toast.error(`Removed from Wishlist`);
    } else {
      const updatedWishlist = [...wishlist, product];
      updateLocalStorage('wishlist', updatedWishlist);
      setIsInWishlist(true);
      toast.success(`Added to Wishlist`);
    }
  };

  const handleCart = useDebounce(addToCart, 1000);
  const handleWishlist = useDebounce(addToWishlist, 1000);

  return (
    <Layout title={product.title} description={product.description}>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to Products
          </Link>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                    {capitalizeWords(product.category)}
                  </span>
                </div>
                <div className="h-[500px] bg-gray-50 p-8 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain transform transition-transform hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-8">
                <div className="flex flex-col h-full">
                  <h1 className="text-xl font-bold text-gray-900 mb-4">
                    {product.title}
                  </h1>

                  {/* Rating Section */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="flex mr-2">
                        {renderStars(product.rating.rate)}
                      </div>
                      <span className="text-gray-600">
                        {product.rating.rate} ({product.rating.count} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm text-gray-500 mb-8">
                    {product.description}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <button
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${isInCart
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                          }`}
                        onClick={handleCart}
                      >
                        <FaShoppingCart className="mr-2" />
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                      <button
                        className={`w-full px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${isInWishlist
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                          }`}
                        onClick={handleWishlist}
                      >
                        <FaHeart className="mr-2" />
                        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>

                    {/* Additional Info */}
                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaShareAlt className="mr-2" />
                          Share Product
                        </div>
                        <span>SKU: {product.id}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div className="border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Free Delivery</h3>
                  <p className="text-sm text-gray-500">
                    Enter your postal code for delivery availability
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Return Delivery</h3>
                  <p className="text-sm text-gray-500">
                    Free 30 Days Delivery Returns
                  </p>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-500">
                    Secure payment methods available
                  </p>
                </div>
              </div>
            </div>
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const product = await fetchProductById(params.id);
    if (!product) {
      return { notFound: true };
    }

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
}