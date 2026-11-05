import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity. Discover plants that light up your home.</p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;
