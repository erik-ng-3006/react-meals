import React, { useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
	const cartCtx = useContext(CartContext);
	const hasItem = cartCtx.items.length > 0;
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const addToCartHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const removeCartHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItem = cartCtx.items.map((item) => {
		return (
			<CartItem
				key={item.id}
				name={item.name}
				price={item.price}
				amount={item.amount}
				onAdd={addToCartHandler.bind(null, item)}
				onRemove={removeCartHandler.bind(null, item.id)}
			/>
		);
	});

	return (
		<Modal onClick={props.onHideCart}>
			<ul className={styles["cart-items"]}>{cartItem}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={styles["button--alt"]}
					onClick={props.onHideCart}
				>
					Close
				</button>
				{hasItem && <button className={styles.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
