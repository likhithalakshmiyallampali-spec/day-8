import React, { useEffect, useRef } from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="search-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Filter by name or username..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;