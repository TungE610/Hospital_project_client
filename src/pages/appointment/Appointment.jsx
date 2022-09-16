import {React, Fragment, useState, useEffect, useContext}from "react";
import axios from 'axios'
import styles from "./Appointment.module.css"
import ContactRow from "../../components/contactRow/ContactRow";
import Navbar from "../../components/navbar/Navbar";
import { Table, Tag, Input,Select,Button, Tooltip, Space,Modal,notification } from 'antd'
import { useNavigate, useLocation } from "react-router-dom";
import RegisterModal from "../../components/registerModal/RegisterModal";
import { SearchOutlined, EditTwoTone, DeleteTwoTone, SendOutlined } from '@ant-design/icons'
import LogginContext from '../../components/accountBox/LogginContext'
import BillModal from "../../components/bill/BillModal";

const Appointments = (props) => {
  const [appointmentData, setAppointmentData] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isBillModalVisible, setIsBillModalVisible] = useState(false)
	const [loading, setLoading] = useState(false);
	const [searchType, setSearchType] = useState('appointment_id')
	const [searchValue, setSearchValue] = useState('')
	const [loginData, setLoggedIn] = useContext(LogginContext)
	const [selectedAppointmentId, setSelectedAppointmentId] = useState('')
	const [selectedPatientId, setSelectedPatientId] = useState('')
	const [status_of_insurance, setStatus_of_insurance] = useState(false)
	const [doctorStatus, setDoctorStatus] = useState(false)
	const [typeSee, setTypeSee] = useState(true)
	const [sent, setSent] = useState(false)
	const [edited, setEdited] = useState(false)
	const baseUrl = 'https://hospital-project-api.herokuapp.com/api'

	const location = useLocation();
	const navigate = useNavigate();
	const { Option } = Select;
	let tempAppointmentData
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
  const getAppointments = async () => {
		setLoading(true)
			try {
				await axios(`${baseUrl}/appointments`).then(response => {
					const transformedData =  response.data.map(appointment => {
						return {...appointment, 
							diagnosis: (appointment.diagnosis !== null ? appointment.diagnosis : "in progess"),
						}
					})
					const index = transformedData.findIndex(element => element.doctor_id === sessionStorage.getItem('doctor_id'))
					if(index >= 0) {
						tempAppointmentData = transformedData.slice()
						let temp  = JSON.parse(JSON.stringify(tempAppointmentData[0]));
						tempAppointmentData[0] = JSON.parse(JSON.stringify(tempAppointmentData[index]));
						tempAppointmentData[index] = JSON.parse(JSON.stringify(temp));
						setAppointmentData(tempAppointmentData)
					} else {
						setAppointmentData(transformedData)
					}
					setLoading(false)
				})
			} catch(error){
				console.log(error)
			}
		}

		useEffect(() => {
			getAppointments()
			setDoctorStatus(!appointmentData.map(element => element.doctor_id).includes(loginData.doctor_id))
		}, [])

	useEffect(() => {
		searchHandler()
	}, [searchValue])

	const editAppointmentHandler = (id) => {
			navigate(`/Appointments/Edit/${id}`)
	}
console.log("edited: ", edited)
const successNotification = () => {
	notification["success"]({
		message: 'SUCCESSFULL',
		description:
			`You have just successfully make new appointment.!!`,
	});
};


const saveNotification = () => {
	notification["success"]({
		message: 'SUCCESSFULL',
		description:
			`Successfully change!!`,
	});
};
const yetEditedNotification = () => {
	notification["error"]({
		message: 'Not Successful',
		description:
			`You can not send bill until update appointment.!!`,
	});
};

	const columns = [
		{
			title : "Appointment ID",
			key : "appointment_id",
			dataIndex : "appointment_id",
			align : "center"
		},
		{
			title : "Start Time",
			key : "start_time",
			dataIndex : "start_time",
			align : "center"
		},
		{
			title : "End Time",
			key : "end_time",
			dataIndex : "end_time",
			align : "center"
		},
		{
			title : "Diagnosis",
			key : "diagnosis",
			dataIndex : "diagnosis",
			align : "center",			
		},
		{
			title : "Specialty",
			key : "specialty",
			dataIndex : "specialty",
			align : "center"
		},
		{
			title : "Room_id",
			key : "room_id",
			dataIndex : "room_id",
			align : "center"
		},
		{
			title : "Doctor Id",
			key : 'doctor_id',
			dataIndex : 'doctor_id',
			align : 'center'
		},
		{
			title : "Patient Id",
			key : 'patient_id',
			dataIndex : 'patient_id',
			align : 'center'
		},   {
      title: 'Action',
      key: 'action',
      width: '10%',
			align : "center",
      render: (_text, record) => (sessionStorage.getItem('role') === 'doctor' && sessionStorage.getItem('doctor_id') === record.doctor_id) ? 
         (record.end_time === null ? (<Space size="middle">
          <EditTwoTone
            id={record.appointment_id}
            onClick={(event) => {
							event.stopPropagation()
              editAppointmentHandler(record.appointment_id)
            }}
          />

					<SendOutlined
						style={{color: "#4E89FF"}}
						twoToneColor="#eb2f96"
						id={record.appointment_id}
						onClick={(event) => {
								event.stopPropagation()
								setSelectedAppointmentId(record.appointment_id)
								setSelectedPatientId(record.patient_id)
								const status_insurance = appointmentData.find(element => element.patient_id === record.patient_id).status_of_insurance
								setStatus_of_insurance(status_insurance)
								if (localStorage.getItem('edited') === 'true') {
									setIsBillModalVisible(true)
								} else {
									yetEditedNotification()
								}
						}}
									/>
        </Space> ) : 
				<Tag color="orange">
					Was sent
				</Tag>
      ) : 						
			<Tag color="red">
					Not allow
			</Tag>
    },
	]
	const searchTypeHandler = (value) => {
    setSearchType(value)
	}

  const getSearchData = (e) => {
		setSearchValue(e.target.value)
	}
  const toggleBillModalHandler = (state) => {
		setIsBillModalVisible(state)
	}
	console.log("loginData: ", loginData)
  const searchHandler = async () => {
		  
			if(searchType === 'appointment_id') {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments/appointment_id/${searchValue}`,{mode : 'cors'})
					} else {
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments`,{mode : 'cors'})
					}					
					const jsonData = await response.json()
					const transformedData =  await jsonData.map(appointment => {
						return {...appointment, 
							diagnosis: (appointment.diagnosis !== null ? appointment.diagnosis : "in progess"),
						}
					})
					const index = transformedData.findIndex(element => element.doctor_id === sessionStorage.getItem('doctor_id'))
					if(index >= 0) {
						tempAppointmentData = transformedData.slice()
						let temp  = JSON.parse(JSON.stringify(tempAppointmentData[0]));
						tempAppointmentData[0] = JSON.parse(JSON.stringify(tempAppointmentData[index]));
						tempAppointmentData[index] = JSON.parse(JSON.stringify(temp));
						setAppointmentData(tempAppointmentData)
					} else {
						setAppointmentData(transformedData)
					}
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			} else if(searchType === 'doctor_id') {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments/doctor_id/${searchValue}`,{mode : 'cors'})
				 } else {
						response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments`,{mode : 'cors'})
				 }	
					const jsonData = await response.json()
					const transformedData =  await jsonData.map(appointment => {
						return {...appointment, 
							diagnosis: (appointment.diagnosis !== null ? appointment.diagnosis : "in progess"),
						}
					})
					const index = transformedData.findIndex(element => element.doctor_id === sessionStorage.getItem('doctor_id'))
					if(index >= 0) {
						tempAppointmentData = transformedData.slice()
						let temp  = JSON.parse(JSON.stringify(tempAppointmentData[0]));
						tempAppointmentData[0] = JSON.parse(JSON.stringify(tempAppointmentData[index]));
						tempAppointmentData[index] = JSON.parse(JSON.stringify(temp));
						setAppointmentData(tempAppointmentData)
					} else {
						setAppointmentData(transformedData)
					}
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			} else {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments/specialty/${searchValue}`,{mode : 'cors'})
				 } else {
						response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments`,{mode : 'cors'})
				 }	
					const jsonData = await response.json()
					const transformedData =  await jsonData.map(appointment => {
						return {...appointment, 
							diagnosis: (appointment.diagnosis !== null ? appointment.diagnosis : "in progess"),
						}
					})
					const index = transformedData.findIndex(element => element.doctor_id === sessionStorage.getItem('doctor_id'))
					if(index >= 0) {
						tempAppointmentData = transformedData.slice()
						let temp  = JSON.parse(JSON.stringify(tempAppointmentData[0]));
						tempAppointmentData[0] = JSON.parse(JSON.stringify(tempAppointmentData[index]));
						tempAppointmentData[index] = JSON.parse(JSON.stringify(temp));
						setAppointmentData(tempAppointmentData)
					} else {
						setAppointmentData(transformedData)
					}
					setLoading(false)
				} catch(error){
					console.log(error)
				}
			}
	}
	// const  swapArrayElements = (arr, indexA, indexB) => {
	// 	let temp  = JSON.parse(JSON.stringify(arr[indexA]));
	// 	arr[indexA] = JSON.parse(JSON.stringify(arr[indexB]));
	// 	arr[indexB] = JSON.parse(JSON.stringify(temp));
	// };
const filterMyAppointment = async () => {
	setLoading(true)
		try {
			  axios(`${baseUrl}/appointments/doctor_id/${sessionStorage.getItem('doctor_id')}`).then(response => {
					const transformedData =   response.data.map(appointment => {
						return {...appointment, 
							diagnosis: (appointment.diagnosis !== null ? appointment.diagnosis : "in progess"),
						}
					})
					const index = transformedData.findIndex(element => element.end_time === null)
					if(index >= 0) {
						tempAppointmentData = transformedData.slice()
						let temp  = JSON.parse(JSON.stringify(tempAppointmentData[0]));
						tempAppointmentData[0] = JSON.parse(JSON.stringify(tempAppointmentData[index]));
						tempAppointmentData[index] = JSON.parse(JSON.stringify(temp));
						setAppointmentData(tempAppointmentData)
					} else {
						setAppointmentData(transformedData)
					}
					setLoading(false)
				})
		}catch(error){
				console.log(error)
		}
}
const addAppointmentHandler = async () => {
	try {
			axios(`${baseUrl}/registrations/${sessionStorage.getItem('room_id')}`).then(response => {
				const body = {
						appointment_id : `${loginData.doctor_id.slice(-2)}${response.data.patient_id.slice(-2)}${new Date().toISOString().split('T')[0].slice(-5).replace('-', '')}`,
						doctor_id : loginData.doctor_id,
						patient_id : response.data.patient_id,
						specialty_id : response.data.specialty_id,
						room_id : loginData.room_id,
						start_time : new Date().toLocaleString()
				}
				axios.post(`${baseUrl}/appointments`, body)
				.then(response => {
					console.log(response)
				}).catch(error => {
					console.log(error)

				})
				localStorage.removeItem('edited')
				successNotification()
			})
	}catch(error) {
		console.log(error)
	}
}
	return (
		<div className={styles.doctorsPage}>
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<BillModal isBillModalVisible={isBillModalVisible} toggleBillModal={toggleBillModalHandler} appointment_id={selectedAppointmentId} patient_id={selectedPatientId} status_insurance={status_of_insurance}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.pageTitle}>
				<p className={styles.titleText}>APPOINTMENTS</p>
				<img src={require(`../../assets/appointment.png`)} className={styles.titleLogo}/>
			</div>
				<Button onClick={addAppointmentHandler} size="large" style={{backgroundColor : "#B53E5A", color : "#fff", position:"relative", float : 'right', top : '-40px'}}>Next Patient</Button>
			<Input.Group  compact style={{
				width: '40%',
				position: 'relative',
				float : 'right',
				display :'flex',
				right : "-120px",
				marginBottom :'30px',
				marginRight : '0'
			}}>
			<Tooltip title="my-appointment">
				<Button onClick={() => 
					{setTypeSee(prev => !prev) 
					if(typeSee){
						filterMyAppointment()
					} else {
						getAppointments()
					}
				}} style={{backgroundColor : "#B53E5A", color : "#fff"}}>{typeSee === true ? "My Appointment" : "Current Appointment"}</Button>
			</Tooltip>    
      <Select defaultValue="appoitnment_id" onChange={searchTypeHandler}>
        <Option value="appoitnment_id">Appointment_id</Option>
        <Option value="doctor_id">Doctor Id</Option>
        <Option value="spacialty">Specialty</Option>
      </Select>
      <Input
				placeholder={searchType === 'appoitnment_id' ? "Please type Appointment Id" : searchType === "doctor_id" ? "Please type Doctor ID" : "Please type specialty"} onChange={getSearchData}
      />
			<Tooltip title="search">
				<Button shape="circle" icon={<SearchOutlined />} onClick={searchHandler}/>
			</Tooltip>    
	  </Input.Group>  
				<Table 
						bordered 
				  	size="middle" 
						columns={columns} 
						dataSource={appointmentData}
						loading={loading}
				/>
		</div>

	)
}

export default Appointments;