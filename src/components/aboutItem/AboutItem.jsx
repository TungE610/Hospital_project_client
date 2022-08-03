import React from 'react'
import styles from './AboutItem.module.css'
import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const AboutItem = (props) => {
	// const [myElementIsVisible, updateMyElementIsVisible] = useState();
	const { ref :myRef, inView: myElementIsVisible } = useInView();

	return (
	props.type === 1 ?
		<div ref={myRef} className={styles.aboutItem}>
				<div className={styles.aboutItemText}>
					<p className={`${styles.textTitle} ${myElementIsVisible ? styles.scrolledTo : ''}`}>{props.textTitle}</p>
					<p className={styles.textContent}>{props.textContent}</p>
				</div>
				<div className={styles.aboutItemImage}>
					<img src={require(`../../assets/${props.imageLink}`)} className={styles.itemImage}/>
				</div>
		</div> : 
			<div ref={myRef} className={styles.aboutItem}>
				<div className={styles.aboutItemImage}>
					<img src={require(`../../assets/${props.imageLink}`)} className={styles.itemImage}/>
				</div>
				<div className={styles.aboutItemText}>
				  <p className={`${styles.textTitle} ${myElementIsVisible ? styles.scrolledTo : ''}`}>{props.textTitle}</p>
					<p className={styles.textContent}>{props.textContent}</p>
				</div>
    </div>
	)
}

export default AboutItem;