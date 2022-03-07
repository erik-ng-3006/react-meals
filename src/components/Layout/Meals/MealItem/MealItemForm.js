import React, { useRef, useState } from "react";
import Input from "../../../UI/Input.js";
import styles from "./MealItemForm.module.css";
const MealItemForm = (props) => {
	const amountInputRef = useRef("");
	const [isValid, setIsValid] = useState(true);
	const onSubmitHandler = (event) => {
		event.preventDefault();
		const enteredAmount = amountInputRef.current.value;
		const enteredAmountNumber = +enteredAmount;

		if (
			enteredAmount.trim() === 0 ||
			enteredAmountNumber < 1 ||
			enteredAmountNumber > 5
		) {
			setIsValid(false);
			return;
		}
		props.onAddToCart(enteredAmountNumber);
	};

	return (
		<form className={styles.form} onSubmit={onSubmitHandler}>
			<Input
				ref={amountInputRef}
				label="amount"
				input={{
					type: "number" + props.meal,
					min: "1",
					max: "5",
					defaultValue: "1",
					step: "1",
					id: "amount",
				}}
			/>
			<button type="submit">+Add</button>
			{!isValid && <p>Please enter a valid number</p>}
		</form>
	);
};

export default MealItemForm;
