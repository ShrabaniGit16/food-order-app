import { useContext, useState, useEffect } from 'react';
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/cart-contex';



const HeaderCartButton = props => {
    const [buttonHighlight, setButtonHighlight] = useState(false)

    const cartCtx = useContext(CartContext)
    const { items } = cartCtx

    const numberOfCartItems = items.reduce((currentNumber, item) => {

        return (currentNumber + item.amount)
    }, 0);

    const btnClass = `${classes.button} ${buttonHighlight ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setButtonHighlight(true)

        const timer = setTimeout(() => {
            setButtonHighlight(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }

    }, [items])

    return (
        <button className={btnClass} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>
        </button>
    )
}

export default HeaderCartButton;