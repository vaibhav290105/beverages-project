import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CocktailList() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCocktails = (query) => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.drinks) {
          setCocktails(data.drinks);
        } else {
          setCocktails([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktails:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCocktails('');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCocktails(searchTerm);
  };

  return (
    <section className="cocktail-search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search for a cocktail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      {loading && <div>Loading...</div>}

      <section className="cocktails-center">
        {cocktails.length > 0 ? (
          cocktails.map((cocktail) => {
            const { idDrink, strDrink, strDrinkThumb } = cocktail;
            return (
              <div key={idDrink} className="cocktail">
                <img src={strDrinkThumb} alt={strDrink} />
                <h2>{strDrink}</h2>
                {/* Details Button linking to cocktail details page */}
                <Link to={`/cocktail/${idDrink}`} className="btn btn-primary btn-details">
                  Details
                </Link>
              </div>
            );
          })
        ) : (
          !loading && <div>No cocktails found for "{searchTerm}"</div>
        )}
      </section>
    </section>
  );
}

export default CocktailList;
