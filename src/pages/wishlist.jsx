import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductTable from '@/components/ProductTable';
import toast, { Toaster } from 'react-hot-toast';


const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key) || '[]');

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(getLocalStorageData('wishlist'));
  }, []);

  const handleRemove = (id) => {
    const updatedWishlist = wishlistItems.filter((product) => product.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    toast.error(`Removed from Wishlist`);
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <Layout title="My Wishlist" description="Manage your Wishlist">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Wishlist</h1>
        <ProductTable products={wishlistItems} pageType="wishlist" handleRemove={handleRemove} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}
