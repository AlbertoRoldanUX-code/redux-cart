import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { uiSliceActions } from './store/ui-slice';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';

function App() {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  const updateCart = useCallback(
    async function () {
      try {
        dispatch(
          uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data',
          })
        );
        const res = await fetch(
          'https://react-http-484b3-default-rtdb.europe-west1.firebasedatabase.app/products.json',
          {
            method: 'PUT',
            body: JSON.stringify(cart),
          }
        );
        if (!res.ok) throw new Error('Something went wrong');

        dispatch(
          uiSliceActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Data sent successfully!',
          })
        );
      } catch (error) {
        console.error(error);
        dispatch(
          uiSliceActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed.',
          })
        );
      }
    },
    [cart, dispatch]
  );

  useEffect(() => {
    if (cart.items.length > 0) {
      updateCart();
    }
  }, [updateCart, cart.items]);

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
// 8º Display notifications when adding products to the cart.
// 9º When realoading, fetch that data from the server, load it and display it.
