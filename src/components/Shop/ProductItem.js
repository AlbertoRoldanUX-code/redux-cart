import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description } = props;
  const dispatch = useDispatch();

  function onAddHandler() {
    const product = {
      title: title,
      price: price,
      description: description,
    };
    console.log(product);

    dispatch(cartActions.add(product));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={onAddHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
