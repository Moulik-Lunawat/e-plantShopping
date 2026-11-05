import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', ''));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name} style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #ddd', padding: '15px 0', alignItems: 'center' }}>
              <img className="cart-item-image" src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '6px' }} />
              <div className="cart-item-details" style={{ flexGrow: 1 }}>
                <div className="cart-item-name" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.name}</div>
                <div className="cart-item-cost" style={{ color: '#555' }}>Unit Price: {item.cost}</div>
                <div className="cart-item-quantity" style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '4px 10px' }}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '4px 10px' }}>+</button>
                </div>
                <div className="cart-item-total" style={{ fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)} style={{ marginTop: '8px', backgroundColor: '#e53935', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button className="get-started-btn" onClick={handleContinueShopping} style={{ backgroundColor: '#2196F3', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Continue Shopping
        </button>
        <button className="get-started-btn" onClick={handleCheckoutShopping} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
