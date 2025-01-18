import { useEffect, useRef } from "react";
import {
  FaSort,
  FaSortAmountDownAlt,
  FaSortAmountUpAlt,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from "react-icons/fa";

export default function ProductSort({ sortCriteria, onSort, isOpen, setIsOpen }) {
  const sortRef = useRef(null);
  const sortOptions = [
    ["price_desc", "Price (High to Low)", <FaSortAmountDownAlt className="inline ml-2" />],
    ["price_asc", "Price (Low to High)", <FaSortAmountUpAlt className="inline ml-2" />],
    ["name_asc", "Product Name (A-Z)", <FaSortAlphaDown className="inline ml-2" />],
    ["name_desc", "Product Name (Z-A)", <FaSortAlphaUp className="inline ml-2" />],
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determine which sorting icon to show based on selected criteria
  const selectedSortIcon = sortOptions.find(([value]) => value === sortCriteria)?.[2] || <FaSort />;

  return (
    <div className="relative" ref={sortRef}>
      <button
        className="text-gray-600 flex items-center space-x-1 rounded border border-gray-300 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedSortIcon}
        <span>Sort by</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 bg-white shadow rounded mt-2 w-60 z-50">
          <ul className="text-sm text-gray-600">
            {sortOptions.map(([value, label, icon]) => (
              <li
                key={value}
                className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  sortCriteria === value ? "bg-gray-300 text-gray-600" : ""
                }`}
                onClick={() => {
                  onSort(value);
                  setIsOpen(false);
                }}
              >
                {label} {icon}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
