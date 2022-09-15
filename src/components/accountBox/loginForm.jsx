import React, { useContext, useState } from "react";
import axios from 'axios'
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./AccountContext";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LogginContext from "./LogginContext"; 

export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext);
  const [loginData, setLoginData] = useState({})
	const [,setLoggedIn] = useContext(LogginContext)
	const baseUrl = 'https://hospital-project-api.herokuapp.com/api'

  let navigate = useNavigate();
	const loginHandler = async () => {
		 try {
			axios(`${baseUrl}/users/login`).then(response => {
				console.log(response)
			})

			 const body = {
				email : loginData.email,
				password : loginData.password
			}
			axios.post(`${baseUrl}/users/login`, body)
			.then(response => {
				if(response.status === 200) {
					successNotification()
					navigate('/TopPage')
					const user =  response.data
					setLoggedIn({isLoggedIn : true, role : user.role, doctor_id : user.doctor_id, room_id : user.room_id})
					sessionStorage.clear();
					sessionStorage.setItem("email", user.email);
					sessionStorage.setItem("role", user.role);
					sessionStorage.setItem("doctor_id", user.doctor_id);
				} else {
					loginFailNotification()
					navigate('/Login')
				}
			})
			.catch(error => 
				console.log(error)
			);
		}catch(error) {
			alert("Please wait some second...")
		}
		
	}
	console.log(loginData)
	const successNotification = () => {
		notification["success"]({
			message: 'SUCCESSFULL',
			description:
				`You have just successfully login !!`,
		});
	};
  
	const loginFailNotification = () => {
		notification["error"]({
			message: 'UNSUCCESSFUL',
			description:
				'Your email or password is incorrect. Please try again !!',
		});
	};
	return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" onChange={(e) => {setLoginData(prev => {return {...prev, email: e.target.value}})}}/>
        <Input type="password" placeholder="Password" onChange={(e) => {setLoginData(prev => {return {...prev, password: e.target.value}})}}/>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={() => {loginHandler()}}>SIGN IN AS DOCTOR</SubmitButton>
			<SubmitButton>
					<Link to="/TopPage">
				USE AS GUEST
					</Link>
			</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}