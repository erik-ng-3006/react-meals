import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [httpError, setHttpError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);

	const cartCtx = useContext(CartContext);
	const hasItem = cartCtx.items.length > 0;
	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const addToCartHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const removeCartHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const checkoutSubmitHandler = async (userData) => {
		setIsSubmitting(true);
		try {
			const res = await fetch(
				'https://react-meals-1761f-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						user: userData,
						meals: cartCtx.items,
					}),
				}
			);
			if (!res.ok) {
				throw new Error('Something went wrong!');
			}
		} catch (e) {
			console.log(e);
			setHttpError(e.message);
		}
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
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

	const modalMealsContent = (
		<div>
			<ul className={styles['cart-items']}>{cartItem}</ul>
			<div className={styles.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={styles.actions}>
				<button
					className={styles['button--alt']}
					onClick={props.onHideCart}
				>
					Close
				</button>
				{hasItem && (
					<button className={styles.button} onClick={orderHandler}>
						Order
					</button>
				)}
			</div>
		</div>
	);

	if (httpError) {
		return (
			<Modal onClick={props.onHideCart}>
				<p className={styles.errorText}>{httpError}</p>
			</Modal>
		);
	}
	const modalContent = (
		<>
			{!isCheckout && modalMealsContent}
			{isCheckout && (
				<Checkout
					onConFirm={checkoutSubmitHandler}
					onCancel={props.onHideCart}
				/>
			)}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data...</p>;
	const didSubmitModalContent = (
		<>
			<p>Successfully sent the order!</p>
			<div className={styles.actions}>
				<button className={styles.button} onClick={props.onHideCart}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClick={props.onHideCart}>
			{!didSubmit && !isSubmitting && modalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
