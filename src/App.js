
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import CocktailDetails from './components/CocktailDetails';
import ErrorPage from './components/ErrorPage';
import CocktailList from './components/CocktailList';
import react from 'react';
import {useRef} from 'react';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CocktailList />} /> {/* Home page */}
        <Route path="/cocktail/:id" element={<CocktailDetails />} /> {/* Cocktail details page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

