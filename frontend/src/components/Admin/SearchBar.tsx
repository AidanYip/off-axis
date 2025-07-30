import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './SearchBar.css';

interface SearchBarProps {
  onSearchSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Trigger search when icon is clicked
  const handleSearchClick = () => {
    onSearchSubmit(searchQuery);
  };

  // Trigger search when Enter key is pressed
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <div className="search-box">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress} // Listen for Enter key
      />
      <FontAwesomeIcon
        className="search-icon"
        icon={faMagnifyingGlass}
        onClick={handleSearchClick} // Listen for click
        style={{ cursor: "pointer" }} // Make it clickable
      />
    </div>
  );
};

export default SearchBar;
