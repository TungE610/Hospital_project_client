/* eslint-disable react-hooks/rules-of-hooks */
import {React, useState} from "react";
import styles from './notificationBox.module.css';

const notificationBox = (props) => {
	const [chatopen, setChatopen] = useState(false)
  let hide = {
    display: 'none',
  }
  let show = {
    display: 'block'
  }
  let textRef = React.createRef()
  const {messages} = props

  const toggle = e => {
    setChatopen(!chatopen)
  }

const handleSend = e => {
  const get = props.getMessage
  get(textRef.current.value)
}
		return (
		<div className={styles.chatCon}>
      <div className={styles.chatBox} style={chatopen ? show : hide}>
    		<div className={styles.header}>Chat with me</div>
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
      	<input type="text"  ref={textRef} />
      	<button onClick={handleSend}><i></i></button>
    	</div>
  	</div>
    <div className={styles.pop}>
      <p><img onClick={toggle} src="https://p7.hiclipart.com/preview/151/758/442/iphone-imessage-messages-logo-computer-icons-message.jpg" alt="" /></p>
    </div>
    </div>
		)
}

export default notificationBox