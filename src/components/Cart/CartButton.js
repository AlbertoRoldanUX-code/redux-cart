import classes from './CartButton.module.css';
import { uiSliceActions } from '../../store/ui-slice';
import { useDispatch } from 'react-redux';

const CartButton = (props) => {
  const dispatch = useDispatch();

  const onToggleHandler = function () {
    dispatch(uiSliceActions.toggle());
  };

  return (
    <button className={classes.button} onClick={onToggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
