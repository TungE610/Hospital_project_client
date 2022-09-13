import React, {useState, useForm, useCallback, useEffect} from "react";
import styles from './RegisterModal.module.css'
import { Modal, Form, Input, Select, Switch, notification} from "antd";
import 'antd/dist/antd.css';

const { Option } = Select;
const { TextArea } = Input;


const RegisterModal = (props) => {
	const [form] = Form.useForm();
	const getRegisterValueHandler = async (values) => {
		const patient_id =`${values.citizen_id.slice(-4)}${values.dob.slice(-5).replace('-','')}`
		console.log(values.examinate)
					try {
						let response = await fetch(`https://hospital-project-api.herokuapp.com/api/specialties/${values.examinate}`, {mode: 'cors'})
						let jsonData = await response.json()
						const room_id = jsonData.room_id
						const num_of_waiting = jsonData.num_of_waiting
						console.log("room_id", room_id)
						if(jsonData.room_id) {
							response = await fetch(`https://hospital-project-api.herokuapp.com/api/room/${jsonData.room_id}`, {mode: 'cors'})
							jsonData = await response.json()
							console.log("doctor: ", jsonData.doctor_id)
							const body = {
								specialty_id : values.examinate,
								patient_id : patient_id,
								registration_time : new Date().toLocaleString(),
								expected_time : new Date(new Date().getTime() + num_of_waiting*20*60000).toLocaleString(),
								room_id : room_id,
								status : true
							}

							response = await fetch(`https://hospital-project-api.herokuapp.com/api/registrations`, {
								method : "POST",
								headers : {"Content-Type" : "application/json"},
								body : JSON.stringify(body),
								mode : 'cors'
							})
								sessionStorage.clear();
								sessionStorage.setItem("patient_id", patient_id);
								sessionStorage.setItem("notifications", `Có ${num_of_waiting} người đang đợi trong phòng mà bạn đang kí. ${num_of_waiting > 0 ? `Vui lòng đợi đến ${body.expected_time.getHours()}:${body.expected_time.getMinutes()}` : "Hãy vào vòng nhé"} !!`);

							console.log(jsonData.doctor_id)
							if(jsonData.doctor_id){
								const body = {
									specialty_id : values.examinate,
									room_id : room_id,
									patient_id : patient_id,
									doctor_id : jsonData.doctor_id,
									start_time : new Date().toLocaleString() ,
									appointment_id : `${jsonData.doctor_id.slice(-2)}${patient_id.slice(-2)}${new Date().toISOString().split('T')[0].slice(-5).replace('-', '')}`
								}
								const 
								response = await fetch(`https://hospital-project-api.herokuapp.com/api/appointments`, {
									method : "POST",
									headers : {"Content-Type" : "application/json"},
									body : JSON.stringify(body),
									mode: 'cors'
								})
								successNotification()
							} else {
								failNotification()
							}
						} else {
							failNotification()
						}
					} catch(error){
						let response = await fetch(`https://hospital-project-api.herokuapp.com/api/room/min_wait/${values.examinate}`)
						let jsonData = await response.json()
						const body = {
							specialty_id : values.examinate,
							patient_id : patient_id,
							registration_time : new Date().toLocaleString(),
							expected_time : new Date(new Date().getTime() + 30*60000).toLocaleString(),
							room_id : jsonData.room_id
						}
						 response = await fetch(`https://hospital-project-api.herokuapp.com/api/registrations`, {
							method : "POST",
							headers : {"Content-Type" : "application/json"},
							body : JSON.stringify(body)
						})
						failNotification()
						console.log("error: ", error.message)
				}
	}
	const  onSubmit = useCallback( async (values) => {
		getRegisterValueHandler(values)
		 try {
			const body = values
			const response = await fetch("https://hospital-project-api.herokuapp.com/api/patients", {
				method : "POST",
				headers : {"Content-Type" : "application/json"},
				body : JSON.stringify(body)
			})
       
		 } catch(error) {
			 console.log(error.message)
		 }
		 form.resetFields();
		 props.toggleModal(false)
		}, []);
		
		const closePopup = useCallback(() => {
			form.resetFields();
			props.toggleModal(false)
		}, [form]);
		const successNotification = (roomId, doctorId) => {
			notification["success"]({
				message: 'SUCCESSFULL',
				description:
					`You have just successfully registered.Your  !!`,
			});
		};
	
		const failNotification = () => {
			notification["error"]({
				message: 'UNSUCCESSFUL',
				description:
					'All room being full. I\'m sorry but you be added to waiting!!',
			});
		};
	
	return (
		<Modal title={<div style={{"color" : "#fff", "letterSpacing": "2px", "fontWeight": "700", "fontSize" : "20px"}}>Make an appointment</div>} visible={props.isModalVisible} onOk={form.submit} onCancel={closePopup} okText="Submit" cancelText="Cancel" width={800} style={{"borderRadius": "10px"}}>
		<Form    
		    form={form}
				onFinish={onSubmit}   
				labelCol={{
					span: 6,
				}}
				wrapperCol={{
					offset: 1,
					span: 16,
				}}
		>

				<Form.Item
						label="Full Name "
						name="patient_name"
						rules={[
											{
												required: true,
												message: 'Please input your full name!',
											},
									 ]}
					>
							<Input />
				</Form.Item>

				<Form.Item
						label="Sex"
						name="sex"
						rules={[
											{
												required: true,
												message: 'Please input your sex!',
											},
									 ]}
					>
							 <Select style={{ width: 120}}>
								 <Option value="M">Male</Option>
								 <Option value="F">Female</Option>
							 </Select>
				</Form.Item>

				<Form.Item
						label="Citizen ID"
						name="citizen_id"
						rules={[
											{
												required: true,
												message: 'Please input your citizen ID!',
											},
									 ]}
					>
						<Input />
				</Form.Item>


				<Form.Item
						label="Age"
						name="age"
						rules={[
											{
												required: true,
												message: 'Please input your age!',
											},
									 ]}
					>
							<Input />
				</Form.Item>

				<Form.Item
						label="Address"
						name="address"
						rules={[
											{
												required: true,
												message: 'Please input your address!',
											},
									 ]}
					>
							<Input />
				</Form.Item>

				<Form.Item
						label="Phone Number"
						name="phone_number"
						rules={[
											{
												required: true,
												message: 'Please input your phone number!',
											},
									 ]}
					>
							<Input />
				</Form.Item>

				<Form.Item
						label="Date of Birth"
						name="dob"
						rules={[
											{
												required: true,
												message: 'Please input your date of birth!',
											},
									 ]}
					>
							<Input />
				</Form.Item>

				<Form.Item
						label="State of Insuarance"
						name="status_of_insurance"
						rules={[
											{
												required: true,
												message: 'Please input your state of insurance!',
											},
									 ]}
					>
							<Switch/>
				</Form.Item>

				<Form.Item
						label="What to examinate"
						name="examinate"
						rules={[
											{
												required: true,
												message: 'Please input your purpose!',
											},
									 ]}
					>
							<Select style={{ width: 120}}>
								 <Option key="1" value="2020">Ear,nose,throat</Option>
								 <Option key="2" value="2022">Eyes</Option>
								 <Option key="3" value="Stomach">Stomach</Option>
								 <Option key="4" value="2021">Heart</Option>
								 <Option key="5" value="Teeth">Teeth</Option>
							</Select>
				</Form.Item>

				<Form.Item
						label="Medical History"
						name="medical_history"
					>
							<TextArea/>
				</Form.Item>
			</Form>
		</Modal>
	)

}

export default RegisterModal




