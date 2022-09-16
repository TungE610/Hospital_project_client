import {React, Fragment, useState, useContext, useEffect} from "react";
import styles from './navbar.module.css';
import Logo from "./logo/Logo";
import NavbarItem from "./navbarItem/NavbarItem";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogginContext from '../accountBox/LogginContext'

const MyButton = styled(Button)`
  &&& {
    background: red;
		margin-bottom : 2px;
		background-color: #B56161;
		color :#fff;
		outline: none;
		padding : 0 20px;
		border: none;
		border-radius: 10px;
  }
`;
const Navbar = (props) => {
  let navigate = useNavigate();
	const [loginData, setLoggedIn] = useContext(LogginContext);
	const openModalHandler = (state) =>  {
      props.openModal(state)
	}
const logoutHandler = () => {
	// 	window.localStorage.setItem('isLoggedIn', false)
	setLoggedIn({isLoggedIn : false, role:'', doctor_id : null, room_id : null})
	navigate('/Login')
	sessionStorage.clear();

}
// useEffect(()=> {
// 		setIsLoggedIn(props.isLoggedIn)
// }, [])
return (
		<div className = {styles.navbar}>
			<Logo />
			   <NavbarItem className="navbarItem" link="/TopPage" iconLink='home.png' itemContent='HOME'/>
				 <NavbarItem className="navbarItem" link="/AboutPage" iconLink='about.png' itemContent='ABOUT'/>
				 {loginData.role === 'super_admin' || loginData.role === 'doctor' || sessionStorage.getItem("email") ? <NavbarItem className="navbarItem" link="/Appointments" iconLink='appointment.png' itemContent='APPOINTMENT'/> : ''}
				 {/* <NavbarItem className="navbarItem" link="/Appointments" iconLink='dining-table.png' itemContent='Appointment'/> */}
				 <NavbarItem className="navbarItem" link="/Doctors" iconLink='doctor.png' itemContent='DOCTORS'/>
				 <NavbarItem className="navbarItem" link="/Rooms" iconLink='dining-table.png' itemContent='ROOMS'/>
				 <NavbarItem className="navbarItem" link="/Contact" iconLink='contacts.png' itemContent='CONTACTS'/>
		<div className={styles.navbarButtons}>
			{
				(loginData.isLoggedIn || sessionStorage.getItem("email")) ? 
			<MyButton  type="primary" size="large" onClick={logoutHandler}>
				<p className={styles.loginText} style={{marginBottom : 0, fontWeight : "bold"}}>Logout</p>
			</MyButton> : 
			<MyButton  type="primary" size="large" onClick={() => {navigate('/Login')}}>
				<p className={styles.loginText} style={{marginBottom : 0, fontWeight : "bold"}}>Doctor Login</p>
			</MyButton>
			}
			<MyButton  type="primary" size="large" onClick={() => {openModalHandler(true)}}>
				<p className={styles.appointmentText} style={{marginBottom : 0, fontWeight : "bold"}}>Appointment</p>
			</MyButton>
		</div>
		</div>
	)
}

export default Navbar;
