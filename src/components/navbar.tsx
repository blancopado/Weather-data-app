import { Heading, Image } from "@adobe/react-spectrum";
import styles from "./navbar.module.css";

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Image src="/vite.svg" alt="App Logo" />
			<Heading level={2}>Environmental data app</Heading>
		</div>
	);
};

export default Navbar;
