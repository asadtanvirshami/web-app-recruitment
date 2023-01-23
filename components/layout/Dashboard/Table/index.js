import React, { useState,useEffect } from 'react'

import { CSVLink } from 'react-csv';
import axios from 'axios';
import {Table,Row,Col, Button, Spinner, Form} from 'react-bootstrap';
import { Modal, Space,Checkbox } from 'antd';   

import 
{ StarOutlined,
  EditOutlined,
  MailOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FilterOutlined,
  DeleteOutlined,} 
  from '@ant-design/icons';
  
import Edit from './Edit';
import Comments from './Comments';
import Mail from '../../ConsultantInfo/Sendmail/Mail';
import Link from 'next/link';

const SendMailCom = ({data}) => {
  const [edit, setEdit] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [isCheckAll, setIsCheckAll] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const [List, setList] = useState([]);
  const [listArr, setListArr] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [commentValue,setCommentValue]= useState({})
  const [editValues, setEditValues] = useState({});
  
  const [loading, setLoading ] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [mailModal, setMailModal] = useState(false);
  const [mailVisible, setMailVisible] = useState(false);

  const handleSelectAll = e => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(List.map((li)=>(li.id)));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e, data) => {
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
      axios.get(process.env.NEXT_PUBLIC_FP_SEARCH_ENTRIES,{
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
  setListArr(data[0])
  }, []);
  
  const deleteEntry= async(id) => {
     await axios
     .delete(process.env.NEXT_PUBLIC_FP_DELETE_ENTRY, { headers: {id: id,},})
     .then((response) => {
        console.log(response);
        const newPeople = List.filter((x) => x.id !== id);
        setList(newPeople);
  })}

  const updateListData = (x) => {
      console.log(x)
      let tempState = [...List];
      let i = tempState.findIndex((y=>x.id==y.id));
      tempState[i] = x;
      setList(tempState);
  }

  const FilterList=(e)=>{
    e.preventDefault();
    const FilteredList = []
    const tempData = List.filter((x)=>  x.field == filterField)
  
    //Code for more filters
    // x.field == filterField && x.resources == filterResourcelvl && x.region == filterRegion && x.city == filterCity|| 
    // x.field == filterField || x.resources == filterResourcelvl || x.region == filterRegion || x.city == filterCity|| 
    // x.field == filterField && x.city == filterCity || 
    // x.field == filterField &&  x.region == filterRegion || 
    // x.field == filterField &&  x.resources == filterResourcelvl||
    // x.city == filterCity && x.region == filterRegion ||
    // x.city == filterCity && x.resources == filterResourcelvl ||
    // x.region == filterRegion && x.resources == filterResourcelvl 
    
      tempData.forEach((x,index)=>{
        FilteredList.push(x)
        setListArr(FilteredList)
    })
  }     

  let Categories = [
    {category:"Web Developer"},
    {category:"Scrum Master"},
    {category:"App Developer"},
    {category:".Net Developer"},
    {category:"AI Engineer"},
    {category:"Business Analyst"},
    {category:"Power App Developer"},
  ]

  return List[0] ? (
    <>
      <Row>
      <Col md={12}>
      <div className=''>
      <Row className='box table-div container'>
      <span>
      <Col> 
      <h3 className='my-2'>Dashbaord</h3>
        <Row className='mt-3 mx-1' style={{justifyContent:"center"}}>
          <Col md={2}>
          <Form.Select onChange={(e) =>{setFilterField(e.target.value)}}  className='select-bar' aria-label="Default select example">
          <option style={{display:'none'}}>Select Field</option>
          {Categories.map((r, index)=>{return(<option key={index}>{r.category}</option>)})}
          </Form.Select>
          </Col>
          <Col md={1}>
            <button type='submit' className='group-btn-1' onClick={(e)=>{FilterList(e)}} style={{fontSize:17, color:'gray'}} ><FilterOutlined className='pb-1'/></button>
            <button type="reset" className='group-btn-2' onClick={(e)=>{(setListArr(List),setFilterField("name"))}} style={{fontSize:17, color:'gray'}}><ReloadOutlined  className='pb-1'/></button>
          </Col> 
        </Row>
        <div style={{float:'right'}} className='text-center mt-2 mx-1'><Button className='send-btn' onClick={()=>{setMailModal(true);setMailVisible(true)}}>Send Mail</Button></div>
      <CSVLink data={List} filename={"Recruitment-List.csv"} target="_blank"><span style={{float:'right'}} className='text-center mt-2 mx-1'> <Button className='btn-xl'>Download <DownloadOutlined style={{float:'right', fontSize:20, color:'white'}}  /></Button></span></CSVLink>
      {/* <div style={{float:'right'}} className='text-center mt-2 mx-4'><Link href="/consultantInfo"><Button className='send-btn'>Consultant</Button></Link></div> */}
      <div>
      {/* <input className='search-bar mt-2' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/> */}
      {/* <SearchOutlined style={{position:'absolute', fontSize:25,left:320,marginTop:17}} /> */}
      </div>
      </Col>
      </span>
      <div className='px-2 mt-3'><hr className='my-2'/></div>
      <div className='table-sm-1 mt-3'>
     <Table className='tableFixHead'>
      <thead>
      <tr className='text-center'>
      <th>
      <Space>
      <Space><Checkbox style={{marginTop:5}} onChange={handleSelectAll} checked={isCheckAll}></Checkbox></Space>
      </Space>
      </th>
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
      </tr>
      </thead>
      {loading==false && searchTerm==''&& <tbody style={{ height: 10,  overflow:'scroll'}}>
      {listArr.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data,index)=>{
      return(
      <tr key={index} className='f text-center row-hover'>
        <td>
        <Space><Checkbox onChange={(e)=>handleClick(e,data)} type='checkbox' checked={isCheck.includes(data.id)}></Checkbox></Space>
        </td>
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
      </tr>)})}
      </tbody>}
      {loading==false && searchTerm!=''&&<tbody style={{ height: 10,  overflow:'scroll'}}>
      {searchItems.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data, index)=>{
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
        <Modal centered open={mailModal} onOk={() => setMailModal(false)} onCancel={() => setMailModal(false)} footer={false}>
        {mailVisible&&<Mail setMailModal={setMailModal} mailModal={mailModal} isCheck={isCheck} List={List}/>}
        </Modal>
        </Col>
        </Row>
        </>
          ):(
       <>
        <Col md={12}>
        <div className=''>
        <Row className='box table-div container'>
        <span>
        <Col> 
        <h3 className='my-2'>Dashbaord</h3>
        <div style={{float:'right'}} className='text-center mt-2 mx-4'><Link href="/consultantInfo"><Button className='send-btn'>Consultant</Button></Link></div>
        <span style={{float:'right'}} className='text-center mt-2 mx-1'> <Button className='btn-xl'>Download <CSVLink data={List} filename={"Recruitment-List.csv"} target="_blank"><DownloadOutlined style={{float:'right', fontSize:20, color:'gray'}}  /></CSVLink></Button></span>
        <div>
        <input className='search-bar mt-2' placeholder='Search' onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm}/>
        {/* <SearchOutlined style={{position:'absolute', fontSize:25,left:320,marginTop:17}} /> */}
        </div>
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
