import React, { useContext, useState, useEffect } from "react";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
	const cartCtx = useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);
	const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);

	const stylesButton = `${styles.button} ${
		isBtnHighlighted ? styles.bump : ""
	}`;
	useEffect(() => {
		if (cartCtx.items.length === 0) {
			return;
		}
		setIsBtnHighlighted(true);
		const timer = setTimeout(() => {
			setIsBtnHighlighted(false);
		}, 300);
		return () => {
			clearTimeout(timer);
		};
	}, [cartCtx.items]);

	return (
		<button className={stylesButton} onClick={props.onClick}>
			<span className={styles.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={styles.badge}>{numberOfCartItems}</span>
		</button>
	);
};

export default HeaderCartButton;
