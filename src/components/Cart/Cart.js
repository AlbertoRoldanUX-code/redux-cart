import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetchProducts();
  // }, [cart]);

  // const fetchProducts = async function () {
  //   try {
  //     const response = await fetch(
  //       'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/products.json'
  //     );
  //     const data = await response.json();
  //     setProducts(data.items);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cart.items.map((item, index) => (
          <CartItem
            item={{
              title: item.name,
              quantity: item.quantity,
              total: item.totalPrice,
              price: item.price,
              id: item.id,
            }}
            key={index}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
