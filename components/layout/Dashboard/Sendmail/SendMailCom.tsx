import React, { useState,useEffect } from 'react'
import { CSVLink } from 'react-csv';
import {Table,Row,Col} from 'react-bootstrap';
import { Modal, Space } from 'antd'; 
import axios from 'axios';

import 
{CloseCircleOutlined ,
  CheckCircleOutlined,
  EditOutlined,
  MailOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SendOutlined} 
  from '@ant-design/icons';
  
import{List} from '../Interface/ListInterface'
import Edit from './Edit';

const SendMailCom = ({data}:any) => {
  const [List, setList] = useState<List[]>([]);
  const [edit, setEdit] = useState(false)

  const [editValues, setEditValues] = useState({});
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setList(data)
  }, []);


  const deleteEntry= async(id:any, i:any):Promise<any> => {
    const Delete_Entry: string = (process.env.NEXT_PUBLIC_FP_DELETE_ENTRY as string);
     await axios.delete(Delete_Entry, {
      headers: {
        id: id,
      },
    }).then((response:any) => {
        console.log(response);
        const newPeople = List.filter((x) => x.id !== id);
        setList( newPeople);
    })}

    const updateListData = (x:any) => {
      console.log(x)
      let tempState = [...List];
      let i = tempState.findIndex((y=>x.id==y.id));
      tempState[i] = x;
      setList(tempState);
  }

  const SendEmail=(e:any, data:any)=>{
    e.preventDefault();
    const Send_Mail: string = (process.env.NEXT_PUBLIC_FP_SEND_MAIL as string);
    axios.post(Send_Mail,{
      id:data.id,
      email:data.email,
      field:data.field,
      firstname:data.firstname,
      lastname:data.lastname,
      region:data.region
    }).then((x:any) => { 
      console.log(data, x);
        let tempState = [...List];
        tempState.forEach((x:any) => {
          if (x.id==data.id) {  
            x.id = data.id;
            x.status='Sent'
            console.log(x.id, x.status);
          }
          });
          setList(tempState);
    })
  }

  return data[0] ? (
    <>
      <div className='box-container '>
        <Row className='box m-3 table-div container'>
          <span>
          <Col> 
          <CSVLink data={List} filename={"Recruitment-List.csv"} style={{float:'right', fontSize:25, color:'gray'}} target="_blank"><DownloadOutlined /></CSVLink>
          <h3 className='f my-2'>Send Email</h3>
          </Col>
          </span>
          <Col style={{textAlign:'right'}}>
          </Col>
           <div className='px-2 '>
           <hr className='my-2' />
           </div>
           <div className='table-sm-1 mt-3' >
              <Table className='tableFixHead' >
              <thead>
              <tr className='text-center'>
               <th>Sr.</th>
               <th>Name</th>
               <th>Email</th>
               <th>LinkedIn</th>
               <th>Phone no.</th>
               <th>Region</th>
               <th>Field</th>    
               <th>Experience</th>    
               <th>Delete</th>    
               <th>Edit</th>    
              <th style={{width:90}}>
              <span style={{position:'relative', marginRight:5, top:3}}>Mail</span>
              <Space>
              <MailOutlined style={{marginBottom:3, fontSize:18,}}/>
              </Space>
              </th>        
              </tr>
              </thead>
              <tbody style={{ height: 10,  overflow:'scroll'}}>
              {List.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data:List, index:any)=>{
              return(
              <tr key={index} className='f text-center row-hover'>
                <td>{index + 1}</td>
                <td>{data.firstname} {data.lastname}</td>
                <td>{data.email}</td>
                <td><a  target="_blank" rel="noopener noreferrer" href={data.linkedIn}>{data.linkedIn.slice(0,20)}</a></td>
                <td>{data.phone}</td>
                <td>{data.region},Canada</td>
                <td>{data.field}</td>
                <td style={{
                color:data.experience=="6"?'orange':data.experience=="7"?'orange':data.experience=="8"?'orange':
                data.experience=="9"?'green':data.experience=="10"?'green':data.experience=="above 10"?'green':''}}>
                {data.experience} years</td>
                <td onClick={()=>{deleteEntry(data.id,index)}} key={index}><DeleteOutlined style={{cursor:'pointer'}}/></td>
                <td onClick={() =>{setEditValues(data);setEdit(true);setVisible(true);}}><EditOutlined style={{cursor:'pointer'}}/></td>
                <td>
                {data.status===""&&<Space onClick={(e) =>{SendEmail(e,data)}}><MailOutlined style={{fontSize:18,cursor:'pointer'}}/></Space>}
                {data.status==="Sent"&&<Space><CheckCircleOutlined disabled={true} style={{fontSize:18, color:"green"}}/></Space>}
                </td>
              </tr>)})}
              </tbody>
               </Table>
             </div>
           </Row>
         </div>
         <Modal
         centered
         open={visible}
         onOk={() => setVisible(false)}
         onCancel={() => setVisible(false)}
         footer={false}
         >
        {edit&&<Edit data={editValues} setVisible={setVisible} updateListData={updateListData} />}
        </Modal></>
        ):(<>
         <>
        <div className='box-container '>
        <Row className='box m-3 table-div container'>
          <span>
          <Col> 
          <CSVLink data={List} filename={"Recruitment-List.csv"} style={{float:'right', fontSize:25, color:'gray'}} target="_blank"><DownloadOutlined /></CSVLink>
          <h3 className='f my-2'>Send Email</h3>
          </Col>
          </span>
          <Col style={{textAlign:'right'}}>
          </Col>
           <div className='px-2 '>
           <hr className='my-2' />
           </div>
           <div className='table-sm-1 mt-3' >
              <Table className='tableFixHead' >
              <thead>
              <tr className='text-center'>
               <th>Sr.</th>
               <th>Name</th>
               <th>Email</th>
               <th>LinkedIn</th>
               <th>Phone no.</th>
               <th>Region</th>
               <th>Field</th>    
               <th>Experience</th>    
               <th>Delete</th>    
               <th>Edit</th>    
              <th style={{width:90}}>
              <span style={{position:'relative', marginRight:5, top:3}}>Mail</span>
              <Space>
              <MailOutlined style={{marginBottom:3, fontSize:18,}}/>
              </Space>
              </th>        
              </tr>
              </thead>
               </Table>
               <span>
              <span style={{position:'relative',color:'gray',top:4,fontSize:23,marginRight:8,}}>Nothing found inside the directory.</span>
              <CloseCircleOutlined style={{marginBottom:3, fontSize:26, color:'red'}} />
              </span>
             </div>
           </Row>
           </div></>
         </>)
     }

export default SendMailCom
