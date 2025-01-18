import Layout from '@/components/Layout';
import Link from 'next/link';
import { FaArrowLeft, FaHeart, FaShareAlt, FaShoppingCart, FaStar } from 'react-icons/fa';
import "../../styles/globals.css";
// import { capitalizeWords } from '../../utils';
import { fetchProductById } from '../../services/api';
import { capitalizeWords } from '../../utils';
export default function ProductDetail({ product }) {

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? 'text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

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
                    <button className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center">
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button className="w-full bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <FaHeart className="mr-2" />
                      Add to Wishlist
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