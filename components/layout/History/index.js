import React,{useEffect,useState} from 'react'
import Router from 'next/router';
import axios from 'axios'

import { Col, Row } from 'react-bootstrap'
import {DeleteOutlined,} from '@ant-design/icons';

export const Notification = ({sessionData}) => {
  const [List, setList] = useState([])

  useEffect(() => {if(sessionData.auth != true){Router.push('/signin')}}, [])

  useEffect(() => {
    axios
   .get(process.env.NEXT_PUBLIC_FP_GET_SENT_LIST)
   .then((response)=>{
    setList(response.data)
   })
  }, [])

  const updateNotification= async(id, i) => {
     await axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_NOTIFICATION, {id:id})
     .then((response) => {
        const newPeople = List.filter((x) => x.id !== id);
        setList(newPeople);
    })}

  return (
    <div className='global-container'>
    <div className='global-div'>
    <div className='notification-form'>
      <h3>Mail History</h3>
      <hr/>
      {List.lenght>0 ? <></>:
      <>
      {List.map((data, index) =>{
        return(
          <div key={index}>
          <Row>
            <Col md={11}>
             <li style={{listStyle:'none', fontSize:16}}>- You have sent <strong>{data.name}</strong> a mail on <strong>{data.sent_day}</strong> for the recruitment in {data.region}, Canada for {data.field}.</li>
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
      })} </>}
    </div>
    </div>
    </div>
  )
}

export default Notification