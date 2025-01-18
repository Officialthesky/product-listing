import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductTable from '@/components/ProductTable';
import toast, { Toaster } from 'react-hot-toast';

const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key) || '[]');

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getLocalStorageData('cart'));
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    toast.error(`Removed from Cart`);
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <Layout title="My Cart" description="Manage your Cart">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>
        <ProductTable products={cartItems} pageType="cart" handleRemove={handleRemove} />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </Layout>
  );
}
