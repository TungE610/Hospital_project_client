import React,{useState, useRef, useCallback, useEffect} from "react";
import styles from './BillModal.module.css'
import axios from 'axios'
import { Modal, Form, Input, Select, notification,Space} from "antd";
import 'antd/dist/antd.css';



const BillModal = (props) => {
	const [form] = Form.useForm();
	const [examinationFee, setExaminationFee] = useState(0)
	const [medicineFee, setMedicineFee] = useState(0)
	const [medical, setMedical] = useState([])
	const [totalFee, setTotalFee] = useState(0)
	const baseUrl = 'https://hospital-project-api.herokuapp.com/api'
	const { Option } = Select;
	const [medical1,setMedical1] = useState('heroin')
	const [medical2,setMedical2] = useState('heroin')
	const [medical3,setMedical3] = useState('heroin')
  
	const selectMedical1Handler = (value) => {
			setMedical1(value)
	}
	  console.log("medical: ", medical)
	const selectMedical2Handler = (value) => {
			setMedical2(value)
	}
	  
	const selectMedical3Handler = (value) => {
		setMedical3(value)
	}
	const closePopup = useCallback(() => {
		form.resetFields();
		props.toggleBillModal(false)
	}, [form]);

	const getMedical = async () => {
		   try {
				axios(`${baseUrl}/medicals`).then(response => {
					const medicalData = response.data.map(element => {
						return {...element,selectedQuantity : 0}
					})
					setMedical(medicalData)			 
				})
			 }catch(error) {
					console.log(error.message)
			 }
	}
	useEffect(() => {
		getMedical()
	}, [])

	const  onSubmit = async () => {
				try {
					let body = {
						bill_id : props.appointment_id,
						appointment_id : props.appointment_id,
						patient_id : props.patient_id,
						examination_fee : examinationFee,
						medicine_fee : medicineFee,
						discounted_charges : props.status_insurance === true ? totalFee  : 0,
						total_charges : totalFee,
						date_time :     new Date().toLocaleString(),
					}
					axios.post(`${baseUrl}/bills`, body)
					.then(response => {
						console.log(response)
					})
					.catch(error => 
						console.log(error)
					);

					const medicalbody = medical.map(element => {
						if(element.selectedQuantity > 0) {
							return {
								medical_id : element.medical_id,
								bill_id : props.appointment_id,
								quantity : element.selectedQuantity
							}
						} else {
							return null
						}
					})
					console.log("medicalbody: ", medicalbody)
					medicalbody.forEach(async (element) => {
						if (element) 
						{
							axios.post(`${baseUrl}/medicines`, element)
							.then(response => {
								console.log(response)
							})
							.catch(error => 
								console.log(error)
							);
						}
					})
					body = {
						end_time : new Date().toLocaleTimeString('it-IT')
					}
					axios.post(`${baseUrl}/appointments/end_up/${props.appointment_id}`, body)
					.then(response => {
						console.log(response)
					})
					.catch(error => 
						console.log(error)
					);
					closePopup()
					successNotification()
				}catch (error) {
					console.log(error)
				}
		};


		const successNotification = (roomId, doctorId) => {
			notification["success"]({
				message: 'SUCCESSFULL',
				description:
					`You have just successfully make a bill and end up appointment!!`,
			});
		};
	
		const failNotification = () => {
			notification["error"]({
				message: 'UNSUCCESSFUL',
				description:
					'All room being full. I\'m sorry!!',
			});
		};
	 const getExaminationFeeHandler = (e) => {
			setExaminationFee(parseInt(e.target.value))
		}	 
	 useEffect(() => {
		setTotalFee(parseInt(examinationFee) + parseInt(medicineFee))
	 }, [examinationFee, medicineFee])

	 const selectedQuantityHandler = (count, medical_name) => {
				setMedical(prevState => {
					return prevState.map(element => {
						if(element.medical_name === medical_name) {
								return {...element, selectedQuantity :element.selectedQuantity > 0 ? element.quantity + parseInt(count) : parseInt(count)}
						}
						return element
					})
				})
	 }
	const calMedicineFee = () => {
		console.log(medical)
		let medicine_fee = 0
		medical.forEach(element => {
			medicine_fee = medicine_fee + Number(element.cost.replace(/[^0-9.-]+/g,"")) * element.selectedQuantity
		})
		console.log("medicine_fee: ", medicine_fee)
		setMedicineFee(medicine_fee)
	}
	 useEffect(() => {
		calMedicineFee()
	 },[JSON.stringify(medical)])
	return (
		<Modal title="Make Bill" visible={props.isBillModalVisible} onOk={form.submit} onCancel={closePopup} okText="Submit" cancelText="Cancel" width={800}>
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
						label="Bill ID"
						name="bill_id"
					>
					<p className={styles.formInfo}>{props.appointment_id}</p>
				</Form.Item>
				<Form.Item
						label="Appointment ID"
						name="appointment_id"
					>
					<p className={styles.formInfo}>{props.appointment_id}</p>
				</Form.Item>
				<Form.Item
						label="Patient ID"
						name="patient_id"
					>
					<p className={styles.formInfo}>{props.patient_id}</p>
				</Form.Item>
				<Form.Item
						label="Examination fee"
						name="examination_fee"
					>
						<Input defaultValue={0} onChange={getExaminationFeeHandler}/>
				</Form.Item>

				<Form.Item
						label="Medicine"
						name="medicine"
					> <Space direction={"vertical"}>
						<Space>
						<div className={styles.medicalCard}>
						<Select
							style={{
								width: 400,
							}}
							onChange={selectMedical1Handler}
						>
							{medical.map(element => {
								return (
										<Option value={element.medical_name}>{element.medical_name}</Option>
								)
							})}
						</Select>
						  <div style={{lineHeight:"31px"}}>{` x `}</div>
							<Input size="small" min={1} max={100} defaultValue={0} onChange={(e) => {
								if(e.target.value) {
									selectedQuantityHandler(e.target.value,medical1)
								} else {
									selectedQuantityHandler(0,medical1)
								}
								}}/>
						</div>
						</Space>

						<Space>
						<div className={styles.medicalCard}>
						<Select
							style={{
								width: 400,
							}}
							onChange={selectMedical2Handler}
						>
							{medical.map(element => {
								return (
										<Option value={element.medical_name}>{element.medical_name}</Option>
								)
							})}
						</Select>
						  <div style={{lineHeight:"31px"}}>{` x `}</div>
							<Input size="small" min={1} max={100} defaultValue={0} onChange={(e) => {
								if(e.target.value) {
									selectedQuantityHandler(e.target.value,medical2)
								} else {
									selectedQuantityHandler(0,medical2)
								}
							}}/>
						</div>
						</Space>
						
						<Space>
						<div className={styles.medicalCard}>
						<Select
							style={{
								width: 400,
							}}
							onChange={selectMedical3Handler}
						>
							{medical.map(element => {
								return (
										<Option value={element.medical_name}>{element.medical_name}</Option>
								)
							})}
						</Select>
						  <div style={{lineHeight:"31px"}}>{` x `}</div>
							<Input size="small" min={1} max={100} defaultValue={0} onChange={(e) => {
									if(e.target.value) {
											selectedQuantityHandler(e.target.value,medical3)
									} else {
											selectedQuantityHandler(0,medical3)
									}
							}}/>
						</div>
						</Space>
						</Space>
				</Form.Item>

				<Form.Item
						label="Medicine fee"
						name="medicine_fee"
					>
					<p className={styles.formInfo}>{medicineFee}</p>
				</Form.Item>
				<Form.Item
						label="discount"
						name="discount"
					>
					<p className={styles.formInfo} style={{color:"red"}}>{props.status_insurance === true ? '50%' : '0%'}</p>
				</Form.Item>
				<Form.Item
						label="Total fee"
						name="total_fee"
					>
					<p className={styles.formInfo}>{props.status_insurance === true ? 0.5 * totalFee : totalFee}</p>
				</Form.Item>
			</Form>
		</Modal>
	)

}

export default BillModal




