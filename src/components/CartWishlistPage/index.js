import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import { capitalizeWords } from '../../utils';
import Image from 'next/image';
import Link from 'next/link';
import { FaBoxOpen } from "react-icons/fa";
import "../../styles/globals.css";

// Utility function to get data from localStorage
const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key) || '[]');

export default function CartWishlistPage({ pageType }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getLocalStorageData(pageType));
  }, [pageType]);

  const handleRemove = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem(pageType, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    toast.error(`Removed from ${pageType === 'cart' ? 'Cart' : 'Wishlist'}`);
    window.dispatchEvent(new Event(`${pageType}Updated`)); // Notify header
  };

  if (products.length === 0) {
    return (
      <Layout title={`My ${pageType === 'cart' ? 'Cart' : 'Wishlist'}`} description={`Manage your ${pageType}`}>
        <div className="flex flex-col items-center justify-center py-20 bg-gray-100 rounded-lg mt-4">
          <FaBoxOpen className="text-gray-600 text-8xl mb-4" />
          <h2 className="text-gray-700 text-lg font-semibold">
            Your {pageType === 'cart' ? 'Cart' : 'Wishlist'} is Empty
          </h2>
          <p className="text-gray-500 text-sm">
            Add some items to your {pageType === 'cart' ? 'cart' : 'wishlist'} to see them here.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`My ${pageType === 'cart' ? 'Cart' : 'Wishlist'}`} description={`Manage your ${pageType}`}>
      <div className="flex flex-col min-h-screen bg-gray-50 p-4">
        <div className="bg-white border-b px-4 py-4 rounded-t-lg border border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">
            {pageType === 'cart' ? 'Shopping Cart' : 'Wishlist'}
          </h1>
        </div>
        
        <div className="relative overflow-hidden rounded-b-lg shadow-md border-x border-b border-gray-200 bg-white">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full text-sm text-left text-gray-900 bg-white">
              <thead className="bg-gray-900 text-white sticky top-0 z-10">
                <tr className="border-b border-gray-300">
                  <th className="py-4 px-6 font-semibold">Product</th>
                  <th className="py-4 px-6 font-semibold">Price</th>
                  <th className="py-4 px-6 font-semibold">Category</th>
                  <th className="py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-all duration-150">
                    <td className="py-4 px-6">
                      <Link href={`/product/${product.id}`} className="flex items-center group">
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg border border-gray-300 overflow-hidden">
                          <Image 
                            src={product.image} 
                            alt={product.title} 
                            fill 
                            className="object-contain" 
                            sizes="(max-width: 48px) 100vw, 48px" 
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 line-clamp-2">
                            {product.title}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">₹{product.price.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
                        {capitalizeWords(product.category)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove from {pageType}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-4 p-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="block bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-150"
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <Link href={`/product/${product.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-md border border-gray-200 overflow-hidden">
                        <Image 
                          src={product.image} 
                          alt={product.title} 
                          fill 
                          className="object-contain" 
                          sizes="(max-width: 80px) 100vw, 80px" 
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`}>
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                            {product.title}
                          </p>
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            ₹{product.price.toFixed(2)}
                          </p>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
                            {capitalizeWords(product.category)}
                          </span>
                        </Link>
                        <button
                          onClick={() => handleRemove(product.id)}
                          className="mt-3 w-full text-sm text-red-500 hover:text-red-700 font-medium text-left"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}