import React, { useState,useEffect } from 'react'
import moment from 'moment';
import axios from 'axios';
import { CSVLink } from 'react-csv';

import {Table,Row,Col, Button, Spinner} from 'react-bootstrap';
import { Modal, Space,Checkbox } from 'antd';   

import 
{ StarOutlined,
  EditOutlined,
  MailOutlined,
  DownloadOutlined,
  DeleteOutlined,
  SearchOutlined} 
  from '@ant-design/icons';
  
import{List} from '../Interface/ListInterface'
import Edit from './Edit';
import Comments from './Comments';

const SendMailCom = ({data}:any) => {
  const [edit, setEdit] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [isCheckAll, setIsCheckAll] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");

  const [List, setList] = useState<List[]>([]);
  const [isCheck, setIsCheck] = useState([]);
  const [commentValue,setCommentValue]= useState({})
  const [searchItems, setSearchItems] = useState([]);
  
  const [loading, setLoading ] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);

  const Search_List: string = (process.env.NEXT_PUBLIC_FP_SEARCH_ENTRIES as string);
  const Send_Mail: string = (process.env.NEXT_PUBLIC_FP_SEND_MAIL as string);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(List.map((li)=>(li.id)));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e:any, data) => {
    const {checked} = e.target;
    setIsCheck([...isCheck,data.id]);
    if (!checked) {
      const unChecked =isCheck.filter((x) => x !== data.id)
      setIsCheck(unChecked);
    }
  };

  useEffect(() => {
    setLoading(true)
    if(searchTerm.length>2){
      axios.get(Search_List,{
        headers: {searchKeyword: `${searchTerm}`}
      }).then((res)=>{
        setLoading(false)
        console.log(res.data[0])
        setSearchItems(res.data[0]);
      })
    }else if(searchTerm.length<2){
      setSearchItems([]);
      setLoading(false)
    }
}, [searchTerm]);

  useEffect(() => {
  setList(data[0])
  }, []);
  
  const deleteEntry= async(id:any, i:any):Promise<any> => {
    const Delete_Entry: string = (process.env.NEXT_PUBLIC_FP_DELETE_ENTRY as string);
     await axios
     .delete(Delete_Entry, { headers: {id: id,},})
     .then((response:any) => {
        console.log(response);
        const newPeople = List.filter((x) => x.id !== id);
        setList(newPeople);
  })}

  const updateListData = (x:any) => {
      console.log(x)
      let tempState = [...List];
      let i = tempState.findIndex((y=>x.id==y.id));
      tempState[i] = x;
      setList(tempState);
  }

  const SendEmail=(e:any)=>{
    e.preventDefault();
    const tempStateIsCheck = [...isCheck]
    const tempStateList = [...List]
    tempStateIsCheck.forEach((x,indexone)=>{
      tempStateList.forEach((y,index)=>{
        if(x === y.id){
          axios.post(Send_Mail,{
            id:y.id,
            email:y.email,
            firstname:y.firstname,
            lastname:y.lastname,
            region:y.region,
            field:y.field,
            sent_date:moment().format('MMMM Do YYYY'),
            sent_day:moment().format('dddd')
          }).then((x:any) => { 
              let tempState = [...List];
              tempState.forEach((x:any) => {
                if (x.id==data.id) {  
                  x.id = data.id;
                  x.status='Sent'
                }
                });
                setList(tempState); })}
          })  
       })}
  
  return List[0] ? (
    <>
      <Row>
      <Col md={12}>
      <div className=''>
      <Row className='box table-div container'>
      <span>
      <Col> 
      <div style={{float:'right'}} className='text-center mt-2 mx-4'><Button className='send-btn'onClick={(e) =>{SendEmail(e)}}>Send Mail</Button></div>
      <CSVLink data={List} filename={"Recruitment-List.csv"} style={{float:'right', fontSize:25, color:'gray'}} target="_blank"><DownloadOutlined /></CSVLink>
      <h3 className='my-2'>Send Email</h3>
      <div>
      <input className='search-bar mt-2' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/>
      <SearchOutlined style={{position:'absolute', fontSize:25,left:320,marginTop:17}} /></div>
      </Col>
      </span>
      <Col style={{textAlign:'right'}}></Col>
      <div className='px-2 mt-3'><hr className='my-2'/></div>
      <div className='table-sm-1 mt-3'>
     <Table className='tableFixHead'>
      <thead>
      <tr className='text-center'>
      <th>Sr.</th>
      <th>Name</th>
      <th>Email</th>
      <th>Source</th>
      <th>Source Link</th>
      <th>Phone no.</th>
      <th>Field</th>    
      <th>Region</th>
      <th>City</th>
      <th>S.C</th>
      <th>Experience</th>    
      <th>Resource</th>    
      <th>Delete</th>    
      <th>Edit</th>    
      <th>Comments</th>    
      <th style={{width:100}}>
      <span style={{position:'relative', marginRight:5, top:3}}>Mail</span>
      <Space>
      <MailOutlined style={{marginBottom:3, fontSize:18,}}/>
      <Space><Checkbox style={{marginTop:5}} onChange={handleSelectAll} checked={isCheckAll}></Checkbox></Space>
      </Space>
      </th>        
      </tr>
      </thead>
      {loading==false && searchTerm==''&& <tbody style={{ height: 10,  overflow:'scroll'}}>
      {List.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data:List, index:any)=>{
      return(
      <tr key={index} className='f text-center row-hover'>
        <td>{index + 1}</td>
        <td>{data.firstname} {data.lastname}</td>
        <td>{data.email}</td>
        <td>{data.source}</td>
        <td><a target="_blank" rel="noopener noreferrer" href={data.source_link}>{data.source_link.slice(0,20)}</a></td>
        <td>{data.phone}</td>
        <td>{data.field}</td>
        <td>{data.region},Canada</td>
        <td>{data.city}</td>
        <td style={{
        color:data.security_clearence=="5"?'orange':data.security_clearence=="6"?'orange':data.security_clearence=="7"?'orange':
        data.security_clearence=="9"?'green':data.security_clearence=="10"?'green':data.security_clearence=="...15"?'green':null}}>
        {data.security_clearence} year clearence</td>
        <td style={{
        color:data.experience=="5"?'orange':data.experience=="6"?'orange':data.experience=="7"?'orange':
        data.experience=="9"?'green':data.experience=="10"?'green':data.experience=="...15"?'green':null}}>
        {data.experience} years</td>
        <td>{data.resources}</td>
        <td onClick={()=>{deleteEntry(data.id,index)}} key={index}><DeleteOutlined style={{cursor:'pointer'}}/></td>
        <td onClick={() =>{setEditValues(data);setEdit(true);setVisible(true);}}><EditOutlined style={{cursor:'pointer'}}/></td>
        <td onClick={() =>{setCommentModal(true); setCommentValue(data); setCommentVisible(true)}} style={{cursor:'pointer'}}><StarOutlined/></td>
        <td>
        <Space><Checkbox onChange={(e)=>handleClick(e,data)} type='checkbox' checked={isCheck.includes(data.id)}></Checkbox></Space>
        </td>
      </tr>)})}
      </tbody>}
      {loading==false && searchTerm!=''&&<tbody style={{ height: 10,  overflow:'scroll'}}>
      {searchItems.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data:List, index:any)=>{
      return(
      <tr key={index} className='f text-center row-hover'>
        <td>{index + 1}</td>
        <td>{data.firstname} {data.lastname}</td>
        <td>{data.email}</td>
        <td>{data.source}</td>
        <td><a target="_blank" rel="noopener noreferrer" href={data.source_link}>{data.source_link.slice(0,20)}</a></td>
        <td>{data.phone}</td>
        <td>{data.field}</td>
        <td>{data.region},Canada</td>
        <td>{data.city}</td>
        <td style={{
        color:data.security_clearence=="5"?'orange':data.security_clearence=="6"?'orange':data.security_clearence=="7"?'orange':
        data.security_clearence=="9"?'green':data.security_clearence=="10"?'green':data.security_clearence=="...15"?'green':null}}>
        {data.security_clearence} year clearence</td>
        <td style={{
        color:data.experience=="5"?'orange':data.experience=="6"?'orange':data.experience=="7"?'orange':
        data.experience=="9"?'green':data.experience=="10"?'green':data.experience=="...15"?'green':null}}>
        {data.experience} years</td>
        <td>{data.resources}</td>
        <td onClick={()=>{deleteEntry(data.id,index)}} key={index}><DeleteOutlined style={{cursor:'pointer'}}/></td>
        <td onClick={() =>{setEditValues(data);setEdit(true);setVisible(true);}}><EditOutlined style={{cursor:'pointer'}}/></td>
        <td onClick={() =>{setCommentModal(true); setCommentValue(data); setCommentVisible(true)}} style={{cursor:'pointer'}}><StarOutlined/></td>
        <td>
        <Space><Checkbox onChange={(e)=>handleClick(e,data)} type='checkbox' checked={isCheck.includes(data.id)}></Checkbox></Space>
        </td>
      </tr>)})}
      </tbody>}
      </Table>
      {loading&&<>
      <div>
        <Row>
          <div>
              <div className="loader mt-5 mb-3">
              <Spinner animation="border" style={{height:"40px", width:"40px",alignSelf:'center',marginTop:70}} />
              </div>
          </div>
      </Row>
      </div></>}
     </div>
      </Row>
      </div>
        <Modal centered open={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={false}>
        {edit&&<Edit data={editValues} setVisible={setVisible} updateListData={updateListData} />}
        </Modal>
        <Modal centered open={commentModal} onOk={() => setCommentModal(false)} onCancel={() => setCommentModal(false)} footer={false}>
        {commentVisible&&<Comments data={commentValue} setCommentModal={setCommentModal}/>}
        </Modal>
        </Col>
        </Row>
        </>
          ):(<>
            <Col md={12}>
            <div className=''>
            <Row className='box table-div container'>
            <span>
            <Col> 
            <div style={{float:'right'}} className='text-center mt-2 mx-4'><Button className='send-btn'onClick={(e) =>{SendEmail(e)}}>Send Mail</Button></div>
            <CSVLink data={List} filename={"Recruitment-List.csv"} style={{float:'right', fontSize:25, color:'gray'}} target="_blank"><DownloadOutlined /></CSVLink>
            <h3 className='my-2'>Send Email</h3>
            <div>
            <input className='search-bar mt-2' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/>
            <SearchOutlined style={{position:'absolute', fontSize:25,left:320,marginTop:17}} /></div>
            </Col>
            </span>
            <Col style={{textAlign:'right'}}></Col>
            <div className='px-2 mt-3'><hr className='my-2'/></div>
            <div className='table-sm-1 mt-3'>
            <Table className='tableFixHead'>
              <thead>
              <tr className='text-center'>
              <th>Sr.</th>
               <th>Name</th>
               <th>Email</th>
               <th>Source</th>
               <th>Source Link</th>
               <th>Phone no.</th>
               <th>Field</th>    
               <th>Region</th>
               <th>S.C</th>
               <th>City</th>
               <th>Experience</th>    
               <th>Resource</th>    
               <th>Delete</th>    
               <th>Edit</th>    
               <th>Comments</th>   
              <th style={{width:90}}>
              <span style={{position:'relative', marginRight:5, top:3}}>Mail</span>
              <Space>
              <MailOutlined style={{marginBottom:3, fontSize:18,}}/>
              </Space>
              </th>        
              </tr>
              </thead>
              <tbody style={{ height: 300,  overflow:'scroll'}}>
              <tr className='f text-center row-hover'>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              </tr>
              </tbody>
               </Table>
             </div>
           </Row>
           </div></Col>
         </>)
     }

export default SendMailCom
