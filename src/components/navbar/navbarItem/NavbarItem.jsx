import React from "react";
import styles from './NavbarItem.module.css'
import { Link } from "react-router-dom";

const NavbarItem = (props) => {

	return (
		<Link to={props.link} className= {styles.navbarItem}>
			<img src={require(`../../../assets/${props.iconLink}`)} className={styles.navBarItemIcon}/>
				<div className={styles.itemContent}>
					<p>{props.itemContent}</p>
				</div>
		</Link>
	)
}

export default NavbarItem;
