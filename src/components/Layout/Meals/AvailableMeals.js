import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [httpError, setHttpError] = useState(null);

	useEffect(() => {
		const getMealsData = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					'https://react-meals-1761f-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
				);
				if (!res.ok) {
					throw new Error('Something went wrong!!!');
				}

				const data = await res.json();
				const transformedData = [];

				for (let key in data) {
					transformedData.push({ ...data[key], id: key });
				}

				setMeals(transformedData);
			} catch (e) {
				console.log(e);
				setHttpError(e.message);
			}
			setIsLoading(false);
		};
		getMealsData();
	}, []);

	if (isLoading) {
		return (
			<section className={styles.loading}>
				<p>Loading...</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => {
		return <MealItem meal={meal} key={meal.id} />;
	});

	return (
		<section className={styles.meals}>
			<Card>
				<ul>{mealsList}</ul>
				{httpError && !isLoading && <p>{httpError}</p>}
			</Card>
		</section>
	);
};

export default AvailableMeals;
