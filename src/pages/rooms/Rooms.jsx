import React , { useState, useEffect } from "react";
import styles from './Rooms.module.css'
import ContactRow from "../../components/contactRow/ContactRow";
import Navbar from "../../components/navbar/Navbar";
import { Table, Tag, Input, Select,Button, Tooltip } from 'antd'
import RegisterModal from "../../components/registerModal/RegisterModal";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';

const Rooms = () => {
  const [roomData, setRoomData] = useState([])
	const [loading, setLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [searchType, setSearchType] = useState('doctor_id')
	const [searchValue, setSearchValue] = useState('')
	const navigate = useNavigate();
	const { Option } = Select;

  const getRooms = async () => {
		  setLoading(true)
			try {
				const response = await fetch("http://localhost:5000/rooms")
				const jsonData = await response.json()
				setRoomData(jsonData)
				setLoading(false);
			} catch(error){
				console.log(error.message)
			}
	}
    useEffect(() => {
    getRooms()
	}, [])
	useEffect(() => {
		searchHandler()
	}, [searchValue])
	const toggleModalHandler = (state) => {
		setIsModalVisible(state)
  }
  const handleTableChange = (filters, sorter) => {
    getRooms({
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };
	const columns = [
		{
			title : "Room ID",
			key : "room_id",
			dataIndex : "room_id",
			align : "center",
			sorter: true,
		},
		{
			title : "Status",
			key : "status",
			dataIndex : "status",
			align : "center",
			filters: [
				{ text: 'True', value: 't' },
				{ text: 'False', value: 'f' },
			],
			render : (status) => {
				if (status === 'f') {
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
			title : "Number of Waiting",
			key : "num_of_waiting",
			dataIndex : "num_of_waiting",
			align : "center",
			width : 200,
			sorter: true,
		},
		{
			title : "Manager",
			key : "manager",
			dataIndex : "manager",
			align : "center",
			sorter: true,
		},
		{
			title : "Specialty",
			key : "specialty",
			dataIndex : "specialty",
			align : "center",
			sorter: true,
		},
	]
	const searchTypeHandler = (value) => {
    setSearchType(value)
	}

  const getSearchData = (e) => {
		setSearchValue(e.target.value)
	}
	
  const searchHandler = async () => {
		  
			if(searchType === 'room_id') {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						 response = await fetch(`http://localhost:5000/rooms/room_id/${searchValue}`)
					} else {
						 response = await fetch(`http://localhost:5000/rooms`)
					}			
					const jsonData = await response.json()
					setRoomData(jsonData)
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			} else {
				setLoading(true)
				try {
					let response 
					if(searchValue.trim().length > 0){
						 response = await fetch(`http://localhost:5000/rooms/specialty/${searchValue}`)
					} else {
						 response = await fetch(`http://localhost:5000/rooms`)
					}							
					const jsonData = await response.json()
					setRoomData(jsonData)
					setLoading(false)
				} catch(error){
					console.log(error.message)
				}
			}
	}
	console.log(searchValue)
	return (
		<div className={styles.roomsPage}>
		<RegisterModal isModalVisible={isModalVisible} toggleModal={toggleModalHandler}/>
		<ContactRow />
		<Navbar openModal={toggleModalHandler}/>
		<div className={styles.pageTitle}>
			<p className={styles.titleText}>ROOMS</p>
			<img src={require(`../../assets/dining-table.png`)} className={styles.titleLogo}/>
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
      <Select defaultValue="room_id" onChange={searchTypeHandler}>
        <Option value="specialty">Specialty</Option>
        <Option value="room_id">Room Id</Option>
      </Select>
      <Input
				placeholder={searchType === 'room_id' ? "Please type Room Id" : "Please type Name"} onChange={getSearchData}
      />
			<Tooltip title="search">
				<Button shape="circle" icon={<SearchOutlined />} onClick={searchHandler}/>
			</Tooltip>    
	  </Input.Group>
			<Table 
				bordered 
				size="middle" 
				columns={columns} 
				dataSource={roomData} 
				onChange={handleTableChange}  
				loading={loading}
			  onRow={(record) => ({
          onClick: () => {
							navigate(`/Rooms/${record.room_id}`);
            },
          })}/>
	</div>
	)
}

export default Rooms
