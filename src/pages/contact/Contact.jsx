import React, {useState, useCallback} from "react";
import styles from './Contact.module.css'
import ContactRow from "../../components/contactRow/ContactRow";
import Navbar from "../../components/navbar/Navbar";
import RegisterModal from "../../components/registerModal/RegisterModal";
import { notification, Form, useForm, Input, Button } from 'antd'
import axios from 'axios'

const Contact = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
  const [formSentData, setFormSentData] = useState({})
	const [form] = Form.useForm();
	const { TextArea } = Input;

	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
	const  onSubmit = useCallback( async (values) => {
		setFormSentData(values)
			await axios.post("http://localhost:5000/contact", formSentData)
			.then(res => {
				console.log("res: ",res)
				successNotification()
			}
			).catch((error) => {
				console.log(error.message)
			})

}) 
console.log(formSentData)
const successNotification = () => {
	notification["success"]({
		message: 'SUCCESSFULL',
		description:
			'Message sent successfully',
	});
};

const failNotification = () => {
	notification["error"]({
		message: 'UNSUCCESSFUL',
		description:
			'Some things went wrong :((',
	});
};

	return (
		<div className= "ContactPage">
			<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
			<ContactRow />
			<Navbar openModal={toggleModalHandler}/>
			<div className={styles.contactHeader}>
          <h2 className={styles.sectionTitle}>Contact Us</h2>
          <p className={styles.sectionMessage}>Let us know what you think! In order to provide better service,
             please do not hesitate to give us your feedback. Thank you.
					</p><hr/>
			</div>
			<Form  
			  className={styles.contactForm}  
		    form={form}
				onFinish={onSubmit}   
				initialValues={{ remember: true }}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					offset: 1,
					span: 16,
				}}
				autoComplete="off"
		>

				<Form.Item
						label="Name "
						name="name"
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
						label="Email"
						name="email"
						rules={[
											{
												required: true,
												message: 'Please input your email for contact!',
											},
									 ]}
					>
						<Input />
				</Form.Item>


				<Form.Item
						label="Subject"
						name="subject"
						rules={[
											{
												required: true,
												message: 'Please input subject of message!',
											},
									 ]}
					>
							<Input />
				</Form.Item>


				<Form.Item
						label="Message"
						name="message"
						rules={[
											{
												required: true,
												message: 'Please input subject of message!',
											},
									 ]}
					>
							<TextArea />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
			</Form>
		</div>
	)
}

export default Contact;