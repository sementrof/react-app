import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Введите текст для поиска..."
        className={`search-input ${isFocused ? "focused" : ""}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default SearchBar;
