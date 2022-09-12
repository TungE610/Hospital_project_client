import {React, Fragment, useState, useEffect, useContext}from "react";
import styles from './Notification.module.css';

const NotificationBox = (props) => {
	const [chatopen, setChatopen] = useState(false)
  let hide = {
    display: 'none',
  }
  let show = {
    display: 'block'
  }
  const {messages} = props

  const toggle = e => {
    setChatopen(!chatopen)
  }

const handleSend = e => {
  const get = props.getMessage
}
		return (
		<div className={styles.chatCon}>
      <div className={styles.chatBox} style={chatopen ? show : hide}>
    		<div className={styles.header}>Notification</div>
    			<div className={styles.msgArea}>
      {
        messages.map((msg, i) => (
          i%2 ? (
          <p className={styles.right}><span>{ msg }</span></p>
          ) : (
            <p className={styles.left}><span>{ msg }</span></p>
          )
        ))
      }

    </div>
    	<div className={styles.footer}>
      	<input type="text" />
      	<button onClick={handleSend}><i></i></button>
    	</div>
  	</div>
    <div className={styles.pop}>
			<p><img onClick={toggle} src={require(`../../assets/messages.png`)}/></p>
    </div>
    </div>
		)
}

export default NotificationBox