import React, { useContext } from "react";
import styles from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
const MealItem = (props) => {
	const { name, price, id, description } = props.meal;

	const cartCtx = useContext(CartContext);

	const onAddToCartHandler = (amount) => {
		cartCtx.addItem({
			id,
			name,
			amount,
			price,
		});
	};

	return (
		<li className={styles.meal}>
			<div>
				<h3>{name}</h3>
				<p className={styles.description}>{description}</p>
				<div className={styles.price}>{`$${price.toFixed(2)}`}</div>
			</div>
			<MealItemForm id={id} onAddToCart={onAddToCartHandler} />
		</li>
	);
};

export default MealItem;
