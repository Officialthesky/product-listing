import { useEffect, useRef } from "react";
import { FaFilter } from "react-icons/fa"; // Import icons
import { capitalizeWords } from "../../utils";
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function ProductFilter({ categories, selectedCategory, onCategoryChange, isOpen, setIsOpen }) {
  const filterRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={filterRef}>
      <button
        className="relative text-gray-600 flex items-center space-x-1 rounded border border-gray-300 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Dynamic Filter Icon Based on Selection */}
        {selectedCategory !== "all" ? (
          <FaFilterCircleXmark /> // Blue dot version
        ) : (
          <FaFilter />
        )}
        <span>Filter by</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 bg-white shadow rounded mt-2 w-48 z-50">
          <ul className="text-sm text-gray-600">
            <li
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedCategory === "all" ? "bg-gray-300 text-gray-600" : ""
              }`}
              onClick={() => {
                onCategoryChange("all");
                setIsOpen(false);
              }}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selectedCategory === category ? "bg-gray-300 text-gray-600" : ""
                }`}
                onClick={() => {
                  onCategoryChange(category);
                  setIsOpen(false);
                }}
              >
                {capitalizeWords(category)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
