import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import { capitalizeWords } from '../../utils';
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

  return (
    <Layout title={`My ${pageType === 'cart' ? 'Cart' : 'Wishlist'}`} description={`Manage your ${pageType}`}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b px-4 py-4 sm:px-6">
            <h1 className="text-xl font-bold">{pageType === 'cart' ? 'Shopping Cart' : 'Wishlist'}</h1>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto px-4 py-6 sm:px-6">
              <div className="bg-white rounded-lg shadow">
                {products.length > 0 ? (
                  <table className="w-full text-sm text-left text-gray-900">
                    <thead className="bg-gray-900 text-white sticky top-0 z-10">
                      <tr className="border-b">
                        <th className="py-4 px-6 font-semibold">Product</th>
                        <th className="py-4 px-6 font-semibold">Price</th>
                        <th className="py-4 px-6 font-semibold">Category</th>
                        <th className="py-4 px-6 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-100 transition-all duration-150">
                          <td className="py-4 px-6">{product.title}</td>
                          <td className="py-4 px-6 font-medium text-gray-900">₹{product.price.toFixed(2)}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-800 text-white">
                              {capitalizeWords(product.category)}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                              onClick={() => handleRemove(product.id)}
                            >
                              Remove from {pageType === 'cart' ? 'Cart' : 'Wishlist'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-10 text-gray-600">
                    <p>Your {pageType} is empty.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}
