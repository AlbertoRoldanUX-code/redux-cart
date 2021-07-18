import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const ui = useSelector((state) => state.ui);

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
