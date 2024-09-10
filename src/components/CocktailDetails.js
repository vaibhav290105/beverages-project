import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CocktailDetails() {
  const { id } = useParams(); // Get cocktail ID from URL
  const [cocktail, setCocktail] = useState(null); // Cocktail details state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          setCocktail(data.drinks[0]); // Set cocktail details
        } else {
          setCocktail(null); // Handle no data
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cocktail details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cocktail) {
    return <div>No cocktail found</div>;
  }

  const {
    strDrink,
    strDrinkThumb,
    strCategory,
    strAlcoholic,
    strGlass,
    strInstructions,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
  } = cocktail;

  return (
    <section className="cocktail-details">
      <div className="drink">
        <img src={strDrinkThumb} alt={strDrink} className="drink-img" />
        <div className="drink-info">
          <h2>{strDrink}</h2>
          <p><strong>Category:</strong> {strCategory}</p>
          <p><strong>Type:</strong> {strAlcoholic}</p>
          <p><strong>Glass:</strong> {strGlass}</p>
          <p><strong>Instructions:</strong> {strInstructions}</p>
          <h4>Ingredients:</h4>
          <ul>
            {strIngredient1 && <li>{strIngredient1}</li>}
            {strIngredient2 && <li>{strIngredient2}</li>}
            {strIngredient3 && <li>{strIngredient3}</li>}
            {strIngredient4 && <li>{strIngredient4}</li>}
          </ul>
        </div>
      </div>
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </section>
  );
}

export default CocktailDetails;
