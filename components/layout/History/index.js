import React,{useEffect,useState} from 'react'

import { Col, Row } from 'react-bootstrap'
import {DeleteOutlined,} from '@ant-design/icons';
import axios from 'axios'

export const Notification = ({data}) => {
  const [List, setList] = useState([])

  useEffect(() => {
    axios
   .get(process.env.NEXT_PUBLIC_FP_GET_SENT_LIST)
   .then((response)=>{
    setList(response.data[0])
    console.log(response.data)
   })
  }, [])

  const updateNotification= async(id, i) => {
     await axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_NOTIFICATION, {id:id})
     .then((response) => {
        console.log(response);
        const newPeople = List.filter((x) => x.id !== id);
        setList(newPeople);
    })}

  return (
    <div className='notification-container'>
    <div className='notification-div'>
    <div className='notification-form'>
      <h3>Mail History</h3>
      <hr/>
      {List.map((data, index) =>{
        return(
          <div key={index}>
          <Row>
            <Col md={11}>
             <li style={{listStyle:'none', fontSize:16}}>- You have sent <strong>{data.firstname} {data.lastname}</strong> a mail on <strong>{data.sent_day}</strong> for the recruitment in {data.region}, Canada for {data.field}.</li>
            </Col>
            <Col >
            <li onClick={()=>{updateNotification(data.id,index)}} style={{listStyle:'none', fontSize:18}}><DeleteOutlined style={{cursor:'pointer', position:'relative'}}/></li>
            </Col>
            <Col >
            <li style={{listStyle:'none', fontSize:13, position:'relative',left:12}}>{data.sent_day} | {data.sent_date}</li>
            </Col>
          </Row>
          <hr/>
          </div>
        )
      })}
    </div>
    </div>
    </div>
  )
}

export default Notification