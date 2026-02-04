import { FiSearch } from "react-icons/fi";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search by name or email..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-sm"
            />
        </div>
    );
};

export default SearchBar;
