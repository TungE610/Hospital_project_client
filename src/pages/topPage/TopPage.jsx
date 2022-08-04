/* eslint-disable no-unused-vars */
import { React, useEffect, useState,useContext } from 'react';
import { Button } from 'antd';
import ContactRow from '../../components/contactRow/ContactRow'
import Navbar from '../../components/navbar/Navbar';
import styles from './TopPage.module.css'
import RegisterModal from "../../components/registerModal/RegisterModal";
import styled from "styled-components";
import LogginContext from '../../components/accountBox/LogginContext'


const TopPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isLoggedIn, setIsLoggedIn]= useState(false)
	const [loginData, setLoggedIn] = useContext(LogginContext)

	const MyButton = styled(Button)`
  &&& {
    background: red;
		margin-left:20px;
		margin-top : 20px;
		background-color: #B56161;
		color :#fff;
		outline: none;
		padding : 0 50px;
		height : 50px;
		border: none;
		border-radius: 10px;
		font-weight : 700;
		font-size : 20px;
  }
`;
console.log(loginData)
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
	useEffect(()=> {
		setIsLoggedIn(window.localStorage.getItem('isLoggedIn'))
	}, [])
  return (
		<div className={styles.topPage}>
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.topPageContent}>
					<div className={styles.box1}></div>
					<div className={styles.box2}>
						<p className={styles.text1}>We Take Care Of Your</p>
						<p className={styles.text2}>Healthy Health</p>
						<p className={styles.text3}>From preventive care and checkups, to immunizations and exams, we work to keep you and your whole family healthy and strong each and every day</p>
						<MyButton className={styles.serviceBtn}>
										<p style={{marginBottom : 0, fontWeight : "bold", lineHeight : '50px'}}>See All Services</p>
						</MyButton>
					</div>
			</div>
		</div>
  );
}

export default TopPage;