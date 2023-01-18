import React from "react";
import styles from './style.module.css';

const ContactItem = (props) => {

	return (
		<div className= {styles.contactItem}>
				<img src={require(`../../../assets/${props.iconLink}`)} className={styles.contactItemLogo}/>
				<div className={styles.itemInfo}>
						{props.itemInfo}
				</div>
		</div>
	)
}

export default ContactItem;
