import {React, Fragment, useState, useEffect, useContext}from "react";
import styles from './Notification.module.css';

const NotificationBox = () => {
	const [chatopen, setChatopen] = useState(false)
	const notification = (sessionStorage.getItem("patient_id") && sessionStorage.getItem("notifications")) ? sessionStorage.getItem("notifications") : ""
  let hide = {
    display: 'none',
  }
  let show = {
    display: 'block'
  }
  const toggle = e => {
    setChatopen(!chatopen)
		localStorage.removeItem('showNotiBox')
  }
	const clickNotiBoxhandler = () => {
		localStorage.setItem('clicked', 'true')
	}

		return (
		<div className={styles.chatCon}>
      <div className={styles.chatBox} style={chatopen || localStorage.getItem('showNotiBox') ? show : hide}>
    		<div className={styles.header} onClick={toggle}>Notification</div>
    			<div className={styles.msgArea}>
						<p className={styles.left}><span>Welcome to HUST CLINIC website</span></p>
      {
        // notifications.map((msg, i) => (
        //   i%2 ? (
        //   <p className={styles.right}><span>{ msg }</span></p>
        //   ) : (
        //     <p className={styles.left}><span>{ msg }</span></p>
        //   )
        // ))
				notification.length > 0 ?
				<p className={styles.left}><span>{ notification }</span></p>
				: 
				""
      }
    </div>
  	</div>
    <div className={styles.pop} onClick={clickNotiBoxhandler}>
			<p style={{"position" : "relative" }}><img onClick={toggle} src={require(`../../assets/messages.png`)}/></p>
			{notification && !localStorage.getItem('clicked')? <div className={styles.numbox}><p className={styles.numMess}>1</p></div> : ""}
    </div>
    </div>
		)
}

export default NotificationBox