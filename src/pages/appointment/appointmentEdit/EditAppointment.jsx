import {React, useState, useEffect, useContext}from "react";
import styles from "./EditAppointment.module.css"
import ContactRow from "../../../components/contactRow/ContactRow";
import Navbar from "../../../components/navbar/Navbar";
import { Input,Select,Button, Form,Modal,TimePicker } from 'antd'
import { useParams,useNavigate } from "react-router-dom";
import RegisterModal from "../../../components/registerModal/RegisterModal";
import moment from 'moment';

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
		offset: 1
  },
};

const EditAppointments = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [loading, setLoading] = useState(false);
	const [appointmentData, setAppointmentData] = useState({})
	let { appointment_id } = useParams();
	const [form] = Form.useForm();
  const navigate = useNavigate()
	const fetchAppointment = async () => {
		setLoading(true)
		try {
			console.log('runs')
			const response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments/${appointment_id}`,{mode : 'no-cors'})
			const jsonData = await response.json()
			setAppointmentData(jsonData)
			console.log("Appointment data: ", appointmentData)
			setLoading(false)
		}catch(error){
			console.log(error.message)
		}
	}
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
	const onFinish = async (values) => {
		setLoading(true)
		const body = {diagnosis : values.diagnosis}
		console.log("body:",body)
		const response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments/${appointment_id}`, {
			method : "POST",
			headers : {"Content-Type" : "application/json"},
			body : JSON.stringify(body),
			mode: 'no-cors'
		})
		setLoading(false)
		
		navigate('/Appointments',{state:{edited: true}} )
  };
  useEffect(() => {
    fetchAppointment()
	}, [])
	return (
		<div className ="edit-appointment">
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.pageTitle}>
				<p className={styles.titleText}>Edit Appointments</p>
				<img src={require(`../../../assets/edit.png`)} className={styles.titleLogo}/>
			</div>
			<Form {...layout}  name="nest-messages" onFinish={onFinish} form={form} defaultValue={{...appointmentData}}>
      <Form.Item
        name={"appointment_id"}
        label="Appointment Id"
      >
				<p className={styles.formInfo}>{appointmentData.appointment_id}</p>
      </Form.Item>
			<Form.Item
        name={"start_time"}
        label="Start Time"
      >
				<p className={styles.formInfo}>{appointmentData.start_time}</p>
      </Form.Item>
      <Form.Item
        name={"specialty"}
        label="Specialty"
      >
				<p className={styles.formInfo}>{appointmentData.specialty}</p>
      </Form.Item>
      <Form.Item
        name={"room_id"}
        label="Room"
      >
				<p className={styles.formInfo}>{appointmentData.room_id}</p>
      </Form.Item>
      <Form.Item
        name={"patient_id"}
        label="Patient"
      >
				<p className={styles.formInfo}>{appointmentData.patient_id}</p>
      </Form.Item>
      <Form.Item  name={"diagnosis"} label="Diagnosis">
        <Input.TextArea showCount maxLength={100} size={"large"}/>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
		</div>
	)

}

export default EditAppointments;