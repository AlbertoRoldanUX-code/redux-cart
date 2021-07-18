import classes from './CartButton.module.css';
import { uiSliceActions } from '../../store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const onToggleHandler = function () {
    dispatch(uiSliceActions.toggle());
  };

  console.log(cart.totalQuantity);

  return (
    <button className={classes.button} onClick={onToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cart.totalQuantity}</span>
    </button>
  );
};

export default CartButton;
