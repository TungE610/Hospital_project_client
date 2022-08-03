import React from "react";
const LogginContext = React.createContext({
	loginData : {
		isLoggedIn : false,
		role : '',
		doctor_id : null,
		room_id : null
	},
	setLoggedIn : () => {},
})

export default LogginContext