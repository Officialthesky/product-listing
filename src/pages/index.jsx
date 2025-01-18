import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductSearch from '@/components/ProductSearch';
import ProductFilter from '@/components/ProductFilter';
import ProductSort from '@/components/ProductSort';
import ProductTable from '@/components/ProductTable';
import { fetchCategories, fetchProducts, fetchProductsByCategory, fetchAllProducts } from '@/services/api';
import "../styles/globals.css";
import Pagination from '@/components/Pagination';

export default function ProductListing({ initialProducts, initialCategories, initialTotalProducts }) {
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortCriteria, setSortCriteria] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);

  // Debounce search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch all products initially and on category change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = selectedCategory === "all"
          ? await fetchAllProducts()
          : await fetchProductsByCategory(selectedCategory);

        setAllProducts(products);
        setTotalProducts(products.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // Handle filtering, sorting, and pagination
  useEffect(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (debouncedSearchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortCriteria) {
        case "price_desc":
          return b.price - a.price;
        case "price_asc":
          return a.price - b.price;
        case "name_asc":
          return a.title.localeCompare(b.title);
        case "name_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setDisplayedProducts(filtered.slice(startIndex, endIndex));
    setTotalProducts(filtered.length);
  }, [allProducts, page, limit, debouncedSearchTerm, sortCriteria]);

  return (
    <Layout title="Product Listing" description="Browse and manage products">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-1 flex flex-col">
          {/* Filter and Search Bar */}
          <div className="bg-white border-b px-4 py-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <ProductFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={(category) => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                      setPage(1);
                    }}
                    isOpen={isFilterOpen}
                    setIsOpen={setIsFilterOpen}
                  />
                  <ProductSort
                    sortCriteria={sortCriteria}
                    onSort={(criteria) => {
                      setSortCriteria(criteria);
                      setPage(1);
                    }}
                    isOpen={isSortOpen}
                    setIsOpen={setIsSortOpen}
                  />
                </div>
                <ProductSearch
                  searchTerm={searchTerm}
                  onSearchChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto px-4 py-6 sm:px-6">
              <div className="bg-white rounded-lg shadow">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <ProductTable products={displayedProducts} />
                )}

                {/* Pagination Controls */}
                <Pagination
                  currentPage={page}
                  totalItems={totalProducts}
                  itemsPerPage={limit}
                  onPageChange={setPage}
                  onItemsPerPageChange={(newLimit) => {
                    setLimit(newLimit);
                    setPage(1);
                  }}
                  itemsPerPageOptions={[5, 10, 20]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const [initialProducts, initialCategories] = await Promise.all([
      fetchProducts(0, 10),
      fetchCategories()
    ]);

    return {
      props: {
        initialProducts,
        initialCategories,
        initialTotalProducts: initialProducts.length,
      },
    };
  } catch (error) {
    console.error("Error fetching initial data:", error);
    return {
      props: {
        initialProducts: [],
        initialCategories: [],
        initialTotalProducts: 0,
      },
    };
  }
}