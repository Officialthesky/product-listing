export default function ProductSearch({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={onSearchChange}
      className="w-full md:w-64 p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-gray-100"
    />
  );
}
