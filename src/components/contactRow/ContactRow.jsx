import React from "react";
import styles from './style.module.css'
import ContactItem from "./contactItem/ContactItem";

const ContactRow = () => {
  
	return (
		<div className={styles.ContactRow}>
			<ContactItem iconLink="placeholder.png" itemInfo="Số 1, Đại Cồ Việt, HBT"/>
			<ContactItem iconLink="phone-call.png" itemInfo="099999999"/>
			<ContactItem iconLink="gmail.png" itemInfo="Tung2082002@gmail.com"/>
			<ContactItem iconLink="clock.png" itemInfo="Mon-Fri: 7am - 5pm"/>
		</div>
	)
}

export default ContactRow;
