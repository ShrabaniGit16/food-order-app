import { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../../Store/cart-contex'
import CartItem from './CartItems';
import Checkout from './Checkout';


const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const[didSubmit,setDidSubmit]=useState(false)
  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  const checkoutHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler =  (userData) => {
    setIsSubmitting(true)
    // await fetch('https://food-order-app-903d0-default-rtdb.firebaseio.com/orders.json', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     user: userData,
    //     orderedItems: cartCtx.items
    //   })
    // });
    console.log("1", userData, cartCtx.items)
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
  };

  const CartItems = <ul className={classes['cart-items']}>
    {cartCtx.items.map((item) => (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)} />
    ))}
  </ul>

  const ModalAction = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>close</button>
    {hasItems && <button className={classes.button} onClick={checkoutHandler}>Order</button>}
  </div>
  // this variable actuall holds the logic of rendering these two buttons which will help to render them conditionally below and keep the code lean
  const cartModalItems = <>
    {CartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
    {!isCheckout && ModalAction}
  </>

  const isSubmittingContent = <p>Sending order data...</p>
  const submitModalContent = <>
    <p>Successfully sent the order!</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>close</button>

    </div>
  </>


  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalItems}
      {isSubmitting && isSubmittingContent}
      {!isSubmitting && didSubmit && submitModalContent}

    </Modal>
  )
}

export default Cart;