import React, {useState, useEffect, useRef} from "react";
import styles from './DoctorDetail.module.css'
import ContactRow from "../../../components/contactRow/ContactRow";
import Navbar from "../../../components/navbar/Navbar";
import RegisterModal from "../../../components/registerModal/RegisterModal";
import { Card } from 'antd'
import { useParams } from "react-router-dom";
import { scroller } from "react-scroll";
const { Meta } = Card;

const DoctorDetail = () => {
	const [doctorData, setDoctorData] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const { doctorId } = useParams();
	const myRef = useRef(null)

	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
	const getDoctor = async () => {
		try {
			const response = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors/${doctorId}`,{mode : 'cors'})
			const jsonData = await response.json()
			setDoctorData(jsonData)
		} catch(error){
			console.log(error.message)
		}
}
const scrollToSection = () => {
	scroller.scrollTo(".doctorCard", {
		duration: 800,
		delay: 0,
		smooth: "easeInOutQuart",
	});
};

useEffect(() => {
	getDoctor()
	scrollToSection()
}, [])
	return (
		<div className={styles.DoctorDetail}>
				<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
				<ContactRow />
				<Navbar openModal={toggleModalHandler}/>
				<div className={styles.pageTitle}>
				<p className={styles.titleText}>DOCTORS DETAIL</p>
				<img src={require(`../../../assets/doctor.png`)} className={styles.titleLogo}/>
			 </div>
				<Card
				   className={styles.doctorCard}
           hoverable
    			 style={{
            width: 900,
            }}
           cover={<img alt="example" src={require("../../../assets/doctor.jpg")} />}
  			>
    <Meta title={doctorData.doctor_name} description="www.instagram.com" id="19"/>
  </Card>

		</div>
	)
}

export default DoctorDetail