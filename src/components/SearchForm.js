import React, { useState } from 'react';
function SearchForm({ handleSearch }) {
    const [query, setQuery] = useState('');
  
    const onSearch = (e) => {
      e.preventDefault();
      handleSearch(query);
    };
  
    return (
      <form className="search-form" onSubmit={onSearch}>
        <div className="form-control">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for a cocktail..."
          />
        </div>
      </form>
    );
  }
  export default SearchForm;
  