import React, { useRef, useState } from 'react';
import styles from './Checkout.module.css';
const Checkout = (props) => {
	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const [formInputValidity, setFormInputValidity] = useState({
		name: true,
		street: true,
		postalCode: true,
		city: true,
	});

	const submitHandler = async (e) => {
		e.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredStreet = streetInputRef.current.value;
		const enteredPostalCode = postalCodeInputRef.current.value;
		const enteredCity = cityInputRef.current.value;

		const isEnteredNameValid = enteredName.trim() !== '';
		const isEnteredStreetValid = enteredStreet.trim() !== '';
		const isEnteredPostalCodeValid = enteredPostalCode.trim().length === 5;
		const isEnteredCityValid = enteredCity.trim() !== '';

		setFormInputValidity({
			name: isEnteredNameValid,
			street: isEnteredStreetValid,
			postalCode: isEnteredPostalCodeValid,
			city: isEnteredCityValid,
		});

		const formIsValid =
			isEnteredNameValid &&
			isEnteredStreetValid &&
			isEnteredPostalCodeValid &&
			isEnteredCityValid;

		if (!formIsValid) {
			console.log('pls enter valid input');
			return;
		}
		props.onConFirm({
			name: enteredName,
			street: enteredStreet,
			postalCode: enteredPostalCode,
			city: enteredCity,
		});

		nameInputRef.current.value = '';
		streetInputRef.current.value = '';
		postalCodeInputRef.current.value = '';
		cityInputRef.current.value = '';
		console.log('submitted');
	};

	const formControlClasses = (bool) => {
		return `${styles.control} ${bool ? '' : styles.invalid}`;
	};

	return (
		<form className={styles.form} onSubmit={submitHandler}>
			<div className={formControlClasses(formInputValidity.name)}>
				<label htmlFor='name'>Your name</label>
				<input type='text' id='name' ref={nameInputRef} />
				{!formInputValidity.name && <p>Please enter valid name</p>}
			</div>
			<div className={formControlClasses(formInputValidity.street)}>
				<label htmlFor='street'>Street</label>
				<input type='text' id='street' ref={streetInputRef} />
				{!formInputValidity.street && <p>Please enter valid street</p>}
			</div>
			<div className={formControlClasses(formInputValidity.postalCode)}>
				<label htmlFor='postal'>Postal Code</label>
				<input type='text' id='postal' ref={postalCodeInputRef} />
				{!formInputValidity.postalCode && (
					<p>Please enter valid postal code</p>
				)}
			</div>
			<div className={formControlClasses(formInputValidity.city)}>
				<label htmlFor='city'>City</label>
				<input type='text' id='city' ref={cityInputRef} />
				{!formInputValidity.city && <p>Please enter valid city</p>}
			</div>
			<div className={styles.actions}>
				<button type='button' onClick={props.onCancel}>
					Cancel
				</button>
				<button className={styles.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
