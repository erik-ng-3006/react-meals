import React from "react";
import styles from "./Header.module.css";
import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";

const Header = (props) => {
	return (
		<>
			<header className={styles.header}>
				<h1>ReactMeals</h1>
				<HeaderCartButton onClick={props.onShowCart} />
			</header>
			<div className={styles["main-image"]}>
				<img
					src="https://foodapp-react.netlify.app/static/media/header-img.2971f633.jpg"
					alt="a table full of delicious food!!"
				></img>
			</div>
		</>
	);
};

export default Header;
