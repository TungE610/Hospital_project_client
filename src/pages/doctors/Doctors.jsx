import {React, useState, useEffect, useContext}from "react";
import axios from 'axios'
import styles from "./Doctors.module.css"
import ContactRow from "../../components/contactRow/ContactRow";
import Navbar from "../../components/navbar/Navbar";
import { Table, Tag, Input,Select,Button, Tooltip, Space,Popconfirm,Modal,notification } from 'antd'
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../components/registerModal/RegisterModal";
import { SearchOutlined, EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons'
import LogginContext from '../../components/accountBox/LogginContext'
import NotificationBox from "../../components/notificationBox/Notification";

const Doctors = () => {
  const [doctorData, setDoctorData] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const [searchType, setSearchType] = useState('doctor_id')
	const [searchValue, setSearchValue] = useState('')
	const [loginData, setLoggedIn] = useContext(LogginContext)
	const baseUrl = 'https://hospital-project-api.herokuapp.com/api'
	const navigate = useNavigate();
	const { Option } = Select;

	
  const getDoctors = async () => {
		setLoading(true)
			try {
				axios(`${baseUrl}/doctors`).then(response => {
					setDoctorData(response.data)
					setLoading(false)
				})
			} catch(error){
				console.log(error)
			}
	}
  useEffect(() => {
    getDoctors()
	}, [])
	useEffect(() => {
		searchHandler()
	}, [searchValue])
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
const modelDelete = (id) => {
	Modal.confirm({
		title: 'You sure to remove this doctor',
		icon: <ExclamationCircleOutlined />,
		content: '',
		onOk: () => {
			deletetpl(id)

			// remove deleted task from display data

		},
		onCancel: () => { 
			setIsDeleteModalVisible(false);
		},
		centered: true,
		okText: 'Yes',
		cancelText: 'No',
	})
}
const deletetpl =async  (id) => {
	try {
		const newDoctorData = doctorData.filter((x) => x.doctor_id !== id)
		setDoctorData(newDoctorData)
    await deleteTptt(id)
		saveNotification()
	} catch (error) {
		if (error.response.status === 404) {
			navigate('/404')
		}
	}
}
const deleteTptt = async (id) => {
	try {
		console.log(id)
		const res = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors/delete/${id}`,{
			method : "POST",
			headers : {"Content-Type" : "application/json"},
			mode: 'cors'
			// body : JSON.stringify(body)
		})
	}catch (error) {
		if (error.response.status === 404) {
			navigate('/404')
		}
	}
}
console.log(loginData)
const saveNotification = () => {
	notification["success"]({
		message: 'SUCCESSFULL',
		description:
			`Successfully change!!`,
	});
};
	const columns = [
		{
			title : "Doctor ID",
			key : "doctor_id",
			dataIndex : "doctor_id",
			align : "center"
		},
		{
			title : "Doctor Name",
			key : "doctor_name",
			dataIndex : "doctor_name",
			align : "center"
		},
		{
			title : "Age",
			key : "age",
			dataIndex : "age",
			align : "center"
		},
		// {
		// 	title : "Phone Number",
		// 	key : "phone_number",
		// 	render: (phone_number) => (
		// 		<Link>{phone_number}</Link>
		// 	)
		// },
		{
			title : "Status",
			key : "status",
			dataIndex : "status",
			filters : [
				{
					text: 'True',
					value: true,
				},
				{
					text: 'False',
					value: false,
				},
			],
			onFilter: (value, record) => record.status === value,
			align : "center",			
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
			title : "Specialty",
			key : "specialty",
			dataIndex : "specialty",
			align : "center",
			filters : [
				{
					text: 'Tim Mạch',
					value: 'Tim Mạch',
				},
				{
					text: 'Tai Mũi Họng',
					value: 'Tai Mũi Họng',
				},
				{
					text: 'Mắt',
					value: 'Mắt',
				},
			],
			onFilter: (value, record) => record.specialty === value,
		},
		{
			title : "Room_id",
			key : "room_id",
			dataIndex : "room_id",
			align : "center"
		},
    {
      title: 'Action',
      key: 'action',
      width: '10%',
			align : "center",
      render: (_text, record) => loginData.role === 'super_admin' && record.status === true ? (
        <Space size="middle">
          <EditTwoTone
            id={record.doctor_id}
            onClick={() => {
              modelDelete(record.doctor_id)
            }}
          />

          {/* <DeleteTwoTone
            id={record.doctor_id}
            onClick={() => {
              deleteHandle(record.doctor_id)
            }}
          /> */}

									<DeleteTwoTone
										id={record.doctor_id}
										onClick={(event) => {
											event.stopPropagation()
											modelDelete(record.doctor_id)
										}}
									/>
        </Space>
      ) : 						
			<Tag color="red">
					Not allow
			</Tag>,
    },
	]
	const searchTypeHandler = (value) => {
    setSearchType(value)
	}

  const getSearchData = (e) => {
		setSearchValue(e.target.value)
	}

  const searchHandler = async () => {
		  
			if(searchType === 'doctor_id') {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors/doctor_id/${searchValue}`,{mode: 'cors'})
					} else {
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors`,{mode: 'cors'})
					}					
					const jsonData = await response.json()
					setDoctorData(jsonData)
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			} else {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors/name/${searchValue}`,{mode: 'cors'})
					} else {
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/doctors`,{mode: 'cors'})
					}
					const jsonData = await response.json()
					setDoctorData(jsonData)
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			}
	}
	const onChange = (filters) => {
		console.log(filters);
	};
	return (
		<div className={styles.doctorsPage}>
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.pageTitle}>
				<p className={styles.titleText}>DOCTORS</p>
				<img src={require(`../../assets/doctor.png`)} className={styles.titleLogo}/>
			</div>
			<Input.Group  compact style={{
				          width: '30%',
									position: 'relative',
									float : 'right',
									display :'flex',
									right : '10px',
									marginBottom :'30px',
									marginRight : '0'
			}}>
      <Select defaultValue="doctor_id" onChange={searchTypeHandler}>
        <Option value="name">Name</Option>
        <Option value="doctor_id">Doctor Id</Option>
      </Select>
      <Input
				placeholder={searchType === 'doctor_id' ? "Please type Doctor Id" : "Please type Name"} onChange={getSearchData}
      />
			<Tooltip title="search">
				<Button shape="circle" icon={<SearchOutlined />} onClick={searchHandler}/>
			</Tooltip>    
	  </Input.Group>
				<Table 
						bordered 
				  	size="middle" 
						columns={columns} 
						dataSource={doctorData}
						loading={loading}
						onChange={onChange}
						onRow={(record) => ({
							onClick: () => {
									navigate(`/Doctors/${record.doctor_id}`);
								},
							})}
				/>
		<NotificationBox />
		</div>
	)
}

export default Doctors;