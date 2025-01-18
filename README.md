# Product Listing Application

A modern, responsive React application for managing and displaying products with advanced filtering, sorting, and pagination capabilities.

## 🚀 Features

- **Product Management**
  - Display products in a responsive table layout
  - View detailed product information
  - Real-time product filtering and search
  - Dynamic category-based filtering
  - Advanced sorting options
  - Responsive pagination

- **Advanced Filtering**
  - Category-based filtering
  - Real-time search functionality
  - Debounced search for optimal performance

- **Sorting Capabilities**
  - Sort by price (ascending/descending)
  - Sort by name (ascending/descending)

- **Responsive Pagination**
  - Adjustable items per page
  - Page navigation controls
  - Total items counter
  - Mobile-responsive design

## 📁 Project Structure

```
GUMO-PRODUCT/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── Pagination/
│   │   ├── ProductFilter/
│   │   ├── ProductSearch/
│   │   ├── ProductSort/
│   │   └── ProductTable/
│   ├── pages/
│   │   ├── product/
│   │   └── index.jsx
│   ├── services/
│   │   └── api.js
│   └── styles/
│       └── globals.css
├── utils/
├── .gitignore
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 🛠️ Technologies Used

- **Frontend Framework**
  - Next.js
  - React

- **Styling**
  - Tailwind CSS
  - PostCSS

- **State Management**
  - React Hooks (useState, useEffect)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Officialthesky/product-listing.git
   cd gumo-product
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 💻 Usage

### Product Listing Page

The main product listing page (`pages/index.jsx`) provides the following functionality:

```jsx
// Example usage of the product listing page
<ProductListing
  initialProducts={products}
  initialCategories={categories}
  initialTotalProducts={totalProducts}
/>
```

### Pagination Component

```jsx
// Example usage of the pagination component
<Pagination
  currentPage={page}
  totalItems={totalProducts}
  itemsPerPage={limit}
  onPageChange={setPage}
  onItemsPerPageChange={setLimit}
  itemsPerPageOptions={[5, 10, 20]}
/>
```

## 🔍 API Integration

The application uses several API endpoints:

- `fetchCategories()`: Retrieves available product categories
- `fetchProducts(offset, limit)`: Fetches paginated products
- `fetchProductsByCategory(category)`: Retrieves products by category
- `fetchAllProducts()`: Gets all available products

## 🎨 Styling

The application uses Tailwind CSS for styling with custom configurations:

- Responsive design for all screen sizes
- Custom utility classes
- Component-specific styles
- Dark mode support

## 🔧 Configuration

### Tailwind Configuration

```js
// tailwind.config.ts
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom configurations
    },
  },
  plugins: [],
}
```
