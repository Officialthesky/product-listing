import Image from "next/image";
import Link from "next/link";
import { capitalizeWords } from "../../utils";
import { FaBoxOpen, FaEye } from "react-icons/fa";
import "../../styles/globals.css";

const ProductTable = ({ products, pageType, handleRemove }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-100 rounded-lg">
        <FaBoxOpen className="text-gray-600 text-8xl mb-4" />
        <h2 className="text-gray-700 text-lg font-semibold">
          No Products Available
        </h2>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md border border-gray-200 bg-white">
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
                  {pageType ? (
                    <button 
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove from {pageType === 'cart' ? 'Cart' : 'Wishlist'}
                    </button>
                  ) : (
                    <Link href={`/product/${product.id}`} className="text-sm text-gray-500 hover:text-gray-900 flex items-center">
                      <FaEye className="mr-2" /> View Details
                    </Link>
                  )}
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
                    {pageType && (
                      <button
                        onClick={() => handleRemove(product.id)}
                        className="mt-3 w-full text-sm text-red-500 hover:text-red-700 font-medium text-left"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
