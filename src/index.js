import React, {useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopPage from "./pages/topPage/TopPage";
import AboutPage from "./pages/aboutPage/AboutPage";
import  Layout  from "./pages/Layout";
import Doctors from "./pages/doctors/Doctors";
import Rooms from "./pages/rooms/Rooms";
import RoomDetail from "./pages/rooms/[id]/RoomDetail";
import DoctorDetail from "./pages/doctors/[id]/DoctorDetail";
import Contact from "./pages/contact/Contact";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/error/ErrorPage";
import Appointment from "./pages/appointment/Appointment";
import LogginContext from './components/accountBox/LogginContext' 
import EditAppointments from "./pages/appointment/appointmentEdit/EditAppointment";

export default function App() {
	const [loginData, setLoggedIn] = useState({isLoggedIn : false , role : '', doctor_id : null, room_id : null});

	console.log("check: ", sessionStorage.getItem("role") === 'doctor')
  return (
		<LogginContext.Provider value={[loginData, setLoggedIn]}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
				  <Route path="" element={<TopPage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/TopPage" element={<TopPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/Rooms/:roomId" element={<RoomDetail />} />
          <Route path="/Doctors/:doctorId" element={<DoctorDetail />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Error" element={<ErrorPage />} />
          <Route path="/Appointments" element={sessionStorage.getItem('role') === 'super_admin' || sessionStorage.getItem("role")==='doctor' || loginData.isLoggedIn? <Appointment /> : < ErrorPage/>} />
					<Route path="/Appointments/Edit/:appointment_id" element={sessionStorage.getItem('role') === 'super_admin' || sessionStorage.getItem('role')==='doctor'? <EditAppointments /> : < ErrorPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
		</LogginContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));