import React, { useContext, useState } from "react";
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
  let navigate = useNavigate();
	const loginHandler = async () => {
		 try {


			await fetch("https://hospital-project-api.herokuapp.com/api/users/login",{mode: 'cors'})
			 const body = {
				email : loginData.email,
				password : loginData.password
			}
			 const response = await fetch("https://hospital-project-api.herokuapp.com/api/users/login", {
				method : "POST",
				headers : {"Content-Type" : "application/json"},
				body : JSON.stringify(body),
				mode: 'cors',
			})
			if(response.status === 200) {
				successNotification()
				navigate('/TopPage')
				const user = await response.json()
				setLoggedIn({isLoggedIn : true, role : user.role, doctor_id : user.doctor_id, room_id : user.room_id})
			} else {
				loginFailNotification()
				navigate('/Login')
			}
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