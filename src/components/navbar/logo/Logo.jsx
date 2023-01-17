import React, { Component } from 'react';
import styles from './logo.module.css'
import {useNavigate} from "react-router-dom";

const Logo = () => {
	
	let navigate = useNavigate();

    const returnHomePageHandler = () => {
		navigate('/TopPage')
	};

  return (	
	<div className={styles.logo} onClick={returnHomePageHandler}>
		<img src={require('../../../assets/first-aid-kit.png')} className={styles.logoImg}/>
			<div className={styles.logoName}>
				<div className={styles.logoName1}>
					<p className={styles.logo1Content}>Bách Khoa</p>
				</div>
			<div className={styles.logoName2}><p>Clinic</p></div>
		</div>
	</div>
  );
}

export default Logo;
