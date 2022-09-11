import React, {useState, useEffect} from "react";
import styles from './RoomDetail.module.css'
import ContactRow from "../../../components/contactRow/ContactRow";
import Navbar from "../../../components/navbar/Navbar";
import RegisterModal from "../../../components/registerModal/RegisterModal";
import { Table, Tag } from 'antd'
import { useParams } from "react-router-dom";


const RoomDetail = () => {
	const [doctorData, setDoctorData] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
  const { roomId } = useParams();
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
	const getDoctors = async () => {
		try {
			const response = await fetch(`https://hospital-project-api.herokuapp.com/api/rooms/${roomId}`, {mode : 'cors'})
			const jsonData = await response.json()
			setDoctorData(jsonData)
		} catch(error){
			console.log(error.message)
		}
}
useEffect(() => {
	getDoctors()
}, [])
	const columns = [
		{
			title : "Doctor Id",
			key : "doctor_id",
			dataIndex : "doctor_id",
			align : "center",
			width : 200,
		},
		{
			title : "Status",
			key : "status",
			dataIndex : "status",
			align : "center",
			width : 200,
			render : (status) => {
				if (status === false) {
					return (
						<Tag key={status} color="red">
							False
						</Tag>
					) 
				} else {
					return (
						<Tag key={status} color="green">
							True
						</Tag>
					) 
				}
			}
		},
		{
			title : "Doctor Name",
			key : "doctor_name",
			dataIndex : "doctor_name",
			align : "center",
		},
		{
			title : "Age",
			key : "age",
			dataIndex : "age",
			align : "center"
		},
	]


	return (
		<div className={styles.RoomDetail}>
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.pageTitle}>
			<p className={styles.titleText}>ROOM DETAIL</p>
			   <img src={require(`../../../assets/dining-table.png`)} className={styles.titleLogo}/>
		</div>
		<Table 
				bordered 
				size="middle" 
				columns={columns} 
				dataSource={doctorData}         
		/>
		</div>
		)

}

export default RoomDetail