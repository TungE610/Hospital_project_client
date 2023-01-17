import React, { Component } from 'react';
import styles from './logo.module.css'

const Logo = () => {
	
  return (	
	<div className={styles.logo}>
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
