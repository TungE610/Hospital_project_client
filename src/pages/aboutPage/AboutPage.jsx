import { useState } from 'react';
import ContactRow from '../../components/contactRow/ContactRow'
import Navbar from '../../components/navbar/Navbar';
import styles from './AboutPage.module.css'
import AboutItem from '../../components/aboutItem/AboutItem';
import 'antd/dist/antd.css';
import RegisterModal from '../../components/registerModal/RegisterModal';

const AboutPage = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)

	const textContent1 = "We aim to provide the best medical service to all clients of all ages. At the same time, providing breakthrough solutions to solve patient problems"
	const textContent2 = "We are committed to listening to the patient's problem most sincerely and try our best to find the most appropriate treatment for the patient's condition."
  const textContent3 = "We have the best facilities and services in the world with the most modern equipment and a team of doctors with many years of experience and dedication to their work."
	
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }

	return (
	<div className={styles.aboutPage}>
		<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
		<ContactRow />
		<Navbar openModal={toggleModalHandler}/>
		<div className={styles.pageTitle}>
				<p className={styles.titleText}>ABOUT US</p>
				<img src={require(`../../assets/cardiogram.png`)} className={styles.titleLogo}/>
		</div>	
		<AboutItem  type={1}  textTitle="OUR VISION" textContent={textContent1} imageLink="about1.jpg"/>
		<AboutItem  type={0}  textTitle="OUR COMMIT" textContent={textContent2} imageLink="about2.jpg"/>
		<AboutItem  type={1}  textTitle="OUR SERVICE" textContent={textContent3} imageLink="about3.jpg"/>
   </div>
 )
}

export default AboutPage;