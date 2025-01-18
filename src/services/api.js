const API_URL = process.env.API_URL;
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/products/categories`);
  return res.json();
}

export async function fetchProducts(start = 0, limit = 10) {
  try {
    // FakeStore API uses limit parameter but not start
    const res = await fetch(`${API_URL}/products?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductsByCategory(category) {
  const url =
    category === "all"
      ?`${API_URL}/products`
      : `${API_URL}/products/category/${category}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchProductById(productId) {
  try {
    const res = await fetch(`${API_URL}/products/${productId}`);
    if (!res.ok) throw new Error("Failed to fetchs");
    return res.json();
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    return null;
  }
}

export async function fetchAllProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch all products");
    return res.json();
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}