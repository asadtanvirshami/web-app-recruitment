import React,{useEffect,useState} from 'react'

import { Col, Row } from 'react-bootstrap'
import {DeleteOutlined,} from '@ant-design/icons';
import axios from 'axios'

import List from '../Dashboard/Interface/ListInterface'

export const Notification = ({data}:any) => {
  const [List, setList] = useState([])

  
  const Get_List: string = (process.env.NEXT_PUBLIC_FP_GET_SENT_LIST as string);
  const Update_Notification: string = (process.env.NEXT_PUBLIC_FP_UPDATE_NOTIFICATION as string);

  useEffect(() => {
    axios
   .get(Get_List)
   .then((response)=>{
    setList(response.data[0])
    console.log(response.data)
   })
  }, [])

  const updateNotification= async(id:any, i:any):Promise<any> => {
     await axios.post(Update_Notification, {id:id})
     .then((response:any) => {
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
      {List.map((data:List, index:number) =>{
        return(
          <div>
          <Row key={index}>
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