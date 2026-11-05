import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from indoor air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg",
          description: "Removes mold spores and purifies surrounding air.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=1000",
          description: "Calming scent that promotes relaxation and stress relief.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://images.unsplash.com/photo-1592729808998-267593922d57?q=80&w=1000",
          description: "Sweet fragrance that creates a pleasant atmosphere.",
          cost: "$22"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
    setShowAboutUs(false);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
    setShowAboutUs(false);
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    setShowAboutUs(true);
    setShowCart(false);
  };

  return (
    <div>
      <nav className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={handlePlantsClick}>Paradise Nursery</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" onClick={handlePlantsClick} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>Plants</a>
          <a href="#" onClick={handleAboutUsClick} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>About Us</a>
          <a href="#" onClick={handleCartClick} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem' }}>
            🛒 Cart ({calculateTotalQuantity()})
          </a>
        </div>
      </nav>

      {showAboutUs ? (
        <AboutUs />
      ) : showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-grid" style={{ padding: '20px' }}>
          {plantsArray.map((categoryObj, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#2e7d32' }}>{categoryObj.category}</h1>
              <div className="plant-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                {categoryObj.plants.map((plant, pIndex) => (
                  <div className="product-card" key={pIndex} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', width: '250px', textAlign: 'center' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
                    <h3 style={{ margin: '10px 0' }}>{plant.name}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', margin: '10px 0' }}>{plant.cost}</p>
                    <button
                      style={{
                        padding: '10px 15px',
                        backgroundColor: cartItems.some(item => item.name === plant.name) ? '#cccccc' : '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: cartItems.some(item => item.name === plant.name) ? 'not-allowed' : 'pointer'
                      }}
                      disabled={cartItems.some(item => item.name === plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
