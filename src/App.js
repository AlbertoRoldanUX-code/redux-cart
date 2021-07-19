import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';

function App() {
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  console.log(cart.items.length);

  useEffect(() => {
    if (cart.items.length > 0) {
      fetch(
        'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/products.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
    }
  }, [cart]);

  return (
    <Layout>
      {ui.cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

//////////// 1º If clicking My Cart button, we toggle the cart (show and hide).
//////////// 2º If clicking Add to Cart on a product, we add it to the cart.
//////////// 3º If the product is already part of the cart, increase the quantity of the existing item.
//////////// 4º If clicking the + and - buttons in the cart, increase or decrease the quantity.
//////////// 5º If the quantity is 1 and we click on -, we remove the item entirely from the cart.
//////////// 6º Display the cart dynamically.
// 7º Update cart on the backend whenever the cart changes (add or remove items).
// 8º When realoading, fetch that data from the server, load it and display it.
