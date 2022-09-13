import {React, Fragment, useState, useEffect, useContext}from "react";
import styles from './Notification.module.css';

const NotificationBox = () => {
	const [chatopen, setChatopen] = useState(false)
	const notification = (sessionStorage.getItem("patient_id") && sessionStorage.getItem("notifications")) ? sessionStorage.getItem("notifications") : ""
	// const [notifications, setNotifications ] = useState(initMessages)
  let hide = {
    display: 'none',
  }
  let show = {
    display: 'block'
  }
	useEffect(() => {

	}, )
  const toggle = e => {
    setChatopen(!chatopen)
  }
	// const clearCountdown = () => {
	// 	console.log("clear runs")
	// 	sessionStorage.clear();
	// };

	// window.onunload = clearCountdown();
		return (
		<div className={styles.chatCon}>
      <div className={styles.chatBox} style={chatopen ? show : hide}>
    		<div className={styles.header}>Notification</div>
    			<div className={styles.msgArea}>
      {
        // notifications.map((msg, i) => (
        //   i%2 ? (
        //   <p className={styles.right}><span>{ msg }</span></p>
        //   ) : (
        //     <p className={styles.left}><span>{ msg }</span></p>
        //   )
        // ))
				<p className={styles.left}><span>{ notification }</span></p>
      }

    </div>
  	</div>
    <div className={styles.pop}>
			<p><img onClick={toggle} src={require(`../../assets/messages.png`)}/></p>
    </div>
    </div>
		)
}

export default NotificationBox