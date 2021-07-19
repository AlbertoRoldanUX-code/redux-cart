import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-slice';

function App() {
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.items.length > 0) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {ui.cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

//////////// 1º If clicking My Cart button, we toggle the cart (show and hide).
//////////// 2º If clicking Add to Cart on a product, we add it to the cart.
//////////// 3º If the product is already part of the cart, increase the quantity of the existing item.
//////////// 4º If clicking the + and - buttons in the cart, increase or decrease the quantity.
//////////// 5º If the quantity is 1 and we click on -, we remove the item entirely from the cart.
//////////// 6º Display the cart dynamically.
//////////// 7º Update cart on the backend whenever the cart changes (add or remove items).
//////////// 8º Display notifications when adding products to the cart.
//////////// 9º Move sending cart data code into an action creator.
// 10º Fetch the cart data from the server.
