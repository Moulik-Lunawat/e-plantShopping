import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

// Inside ProductList component:
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);

const handleAddToCart = (product) => {
  dispatch(addItem(product));
};

const isAddedToCart = (productName) => {
  return cartItems.some((item) => item.name === productName);
};

// In product rendering logic:
<button 
  className={`product-button ${isAddedToCart(plant.name) ? 'disabled' : ''}`}
  disabled={isAddedToCart(plant.name)}
  onClick={() => handleAddToCart(plant)}
>
  {isAddedToCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
</button>
