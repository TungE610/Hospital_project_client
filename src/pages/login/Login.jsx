import React from "react";
import styles from './Login.module.css'
import { AccountBox } from "../../components/accountBox";

const Login = () => {

	return (
		<div className={styles.loginPage}>
				<AccountBox/>
		</div>
	)

}

export default Login;
