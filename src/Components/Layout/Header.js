import { Fragment } from "react";
import classes from './Header.module.css';
import MealsImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";


const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Fresh Grub</h1>
               <HeaderCartButton onClick={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImage} alt="A Table Full Of Delicious Food" />
            </div>
        </Fragment>
    )
}

export default Header;