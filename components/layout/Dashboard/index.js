import React, { useState,useEffect } from 'react'
import dynamic from "next/dynamic";
import Link from 'next/link';
import Router from 'next/router'

import { CSVLink } from 'react-csv';
import axios from 'axios';
import {Table,Row,Col, Spinner, Form,} from 'react-bootstrap';
import { Modal,Space,Checkbox } from 'antd';   

import 
{ StarOutlined,
  EditOutlined,
  BackwardOutlined,
  ForwardOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FilterOutlined,
  DeleteOutlined,
  MailOutlined,
  UserAddOutlined
} 
  from '@ant-design/icons';
  
//Importing external components 
import Edit from './Edit';
import Comments from '../../shared/Comments';
const Mail = dynamic(() => import("../../shared/Mail"),{ ssr: false });
//Importing external functions 
import PaginationCall from '../../functions/Pagination';
import { handleClick, handleSelectAll } from '../../functions/CheckFunc';

const SendMailCom = ({data,optsets,sessionData}) => {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterName, setfilterName] = useState("");
  const [filterSecurityClearence, setFilterSecurityClearence] = useState("");

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1);
  const [Totalcount, setTotalCount] = useState(0)

  const [List, setList] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const [optionSets, setOptionSets] = useState([])
  const [commentValue,setCommentValue]= useState({})
  const [editValues, setEditValues] = useState({});

  const [loading, setLoading ] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false); 
  //Comment modal & component visiblity condition
  const [commentModal, setCommentModal] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false);
  //Edit modal & component visiblity condition
  const [edit, setEdit] = useState(false)
  const [visible, setVisible] = useState(false);
  //Mail modal & component visiblity condition
  const [mailModal, setMailModal] = useState(false);
  const [mailVisible, setMailVisible] = useState(false);

  useEffect(() => {if(sessionData.auth != true){Router.push('/signin')}}, []) //condition to check if user is loggedIn

  useEffect(() => {//setting the consultants list in the List state and also spliting the options and setting them in the states
    setList(data[0].consultants);

    let tempState = [...optsets];
    let tempStateOpt = [];

    tempState.forEach((item, index) => { //spliting the optionsets
      tempStateOpt.push(
        item.categories.split(","),
        item.security_clearences.split(",")
      );
    });
    const totalPages = Math.ceil(data[0].total / 10);
    setTotalCount(totalPages); //total number of pages
    setOptionSets(tempStateOpt); //setting the optionsets from db
  }, [data, optsets]);

  async function fetchMailList(currentPage) {//fetching the consultant list on the button click (pagination)
      const res = await axios
        .get(process.env.NEXT_PUBLIC_FP_GET_CONSULTANTS, {
          headers: { offset: `${currentPage}`, limit: 10, sc:filterSecurityClearence, category:filterCategory, name:filterName, email:filterEmail },
        })
        .then((r) => {
          console.log(r);
          let tempState = [];
          r.data[0].consultants.forEach((x, i) => {
            tempState.push(x); //pushing the consultants data to an tempState array.
          });
          const totalPages = Math.ceil(r.data[0].total / 10);
          if(r.data[0].total===0){setTotalCount(1); setList(tempState);} //condition to check if total data if > or < 0
          else{setTotalCount(totalPages); setList(tempState);}
          
        });
  }
  
  const deleteConsultant= async(id) => { //deleting the consultant from the db and updating the array
     await axios
     .delete(process.env.NEXT_PUBLIC_FP_DELETE_CONSULTANT, { headers: {id: id,},})
     .then((response) => {
        const newPeople = List.filter((x) => x.id !== id); //filtering the deleted user from array
        setList(newPeople);    
  })}

  const updateConsultant = (x) => { //updating the consultant in the db and updating the array
      let tempState = [...List];
      let i = tempState.findIndex((y=>x.id==y.id)); //updating the user details where id is equal
      tempState[i] = x;
      setList(tempState);
  } 

  const handleReset = () => { //reseting the states of the panel
    setFilterCategory("");   
    setFilterSecurityClearence("");   
    const totalPages = Math.ceil(data[0].total / 10);
    setTotalCount(totalPages)
}

  return(
<>
  <Row>
    <Col md={12}>
      <div className='global-container'>
        {/* =============PANEL=============*/}
        <Row>
          <span>
            <Col> 
                <h3 className='my-2'>Dashboard</h3>
                <div style={{float:'right'}} className='text-center mt-2 mx-1'>
                    <button onClick={()=>{setMailModal(true);setMailVisible(true)}} className='custom-btn-sm'>
                      <MailOutlined style={{marginBottom:3, marginRight:5, fontSize:16}}/>
                      <span style={{position:'relative',top:1}}>Send Mail</span>
                    </button>
                </div>
                <div style={{float:'right'}} className='text-center mt-2 mx-1'>
                  <Link href="/entry">
                    <button className='custom-btn-sm'>
                      <UserAddOutlined style={{marginBottom:3, marginRight:5, fontSize:16}}/>
                      <span style={{position:'relative',top:1}}>Add Consultant</span>
                    </button>
                  </Link>
                </div>
                <CSVLink data={List} filename={"Recruitment-List.csv"} target="_blank">
                  <span style={{float:'right'}} className='text-center mt-2 mx-1'> 
                   <button className='custom-btn-sm'>
                      <DownloadOutlined style={{marginBottom:3, marginRight:5, fontSize:16}}/>
                      <span style={{position:'relative',top:1}}>Download</span>
                    </button>
                  </span>
                </CSVLink>
              </Col>
            </span>
       <Row className='mt-3 mx-1' style={{justifyContent:"left"}}>
          <Col md={2}>
            <Form.Select onChange={(e) =>{setFilterCategory(e.target.value)}} value={filterCategory} className='select-bar'>
            <option style={{display:'none'}}>Select Category</option>
            {optionSets.length>0 ? optionSets[0].map((item,index)=>{return(<option key={index} style={{display:''}}>{item}</option>)}):[]}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Select onChange={(e) =>{setFilterSecurityClearence(e.target.value)}} value={filterSecurityClearence} className='select-bar'>
            <option style={{display:'none'}}>Select S.C</option>
            {optionSets.length>0 ? optionSets[1].map((item,index)=>{return(<option key={index} style={{display:''}}>{item}</option>)}):[]}
            </Form.Select>
          </Col>
          <Col md={2}>
            <input onChange={(e) =>{setFilterEmail(e.target.value)}} placeholder="Email" className='select-bar'/>
          </Col>
          <Col md={2}>
            <input onChange={(e) =>{setfilterName(e.target.value)}} placeholder="Name"  className='select-bar'/>
          </Col> 
          <Col md={4}>
            <button type='submit' className='group-btn-1' onClick={({i='get'})=>{{PaginationCall(i,fetchMailList,setPage,setPageCount,page,pageCount)}}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 } style={{fontSize:17, color:'gray'}} ><FilterOutlined className='pb-1'/></button>
            <button type="reset" className='group-btn-2' onClick={(e)=>{(setList(data[0].consultants),handleReset())}} style={{fontSize:17, color:'gray'}}><ReloadOutlined  className='pb-1'/></button>
          </Col> 
      </Row>
      {/* =============TABLE=============*/}
    <div className='px-2 mt-3'><hr className='my-2'/></div> 
      <div className='table-sm-1 mt-3'>
      <Table className='tableFixHead'> 
          <thead>
            <tr className='text-center'>
              <th>
              <Space> 
              <Space><Checkbox style={{marginTop:5}} onChange={()=>{{handleSelectAll({List,setIsCheck,setIsCheckAll,isCheckAll})}}} checked={isCheckAll}></Checkbox></Space> 
              </Space>
              </th>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Source Link</th>
              <th>Phone no.</th>
              <th>Category</th>    
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
              {loading==false && List.length > 0 ? <tbody style={{ height: 10,  overflow:'scroll'}}>
              {List.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data,index)=>{
              return(
              <tr key={index} className='f text-center row-hover'>
                <td>
                <Space><Checkbox onChange={(e)=>{{handleClick({e,data,setIsCheck,isCheck})}}} type='checkbox' checked={isCheck.includes(data.id)}></Checkbox></Space>
                </td>
                <td>{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.source}</td>
                <td><a target="_blank" rel="noopener noreferrer" href={data.source_link}>{data.source_link.slice(0,20)}</a></td>
                <td>{data.phone}</td>
                <td>{data.category}</td>
                <td>{data.region},Canada</td>
                <td>{data.city}</td>
                <td style={{
                color:data.security_clearence=="Enhance"?'orange':data.security_clearence=="Secret"?'green':null}}>
                {data.security_clearence}</td>
                <td style={{
                color:
                data.experience=="5"?'orange':
                data.experience=="6"?'orange':
                data.experience=="7"?'green':
                data.experience=="8"?'green':
                data.experience=="9"?'green':
                data.experience=="10"?'green':
                data.experience=="15"?'green':null}}>
                {data.experience} years</td>
                <td>{data.resource}</td>
                <td onClick={()=>{deleteConsultant(data.id,index)}} key={index}><DeleteOutlined className='modify-edit'/></td>
                <td onClick={() =>{setEditValues(data);setEdit(true);setVisible(true)}}><EditOutlined className='modify-edit'/></td> 
                <td onClick={() =>{setCommentModal(true); setCommentValue(data); setCommentVisible(true)}} className='modify-edit'><StarOutlined/></td> 
            </tr>)})}
          </tbody>:<></>}
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
      </div>
      </>}
     </div>
      </Row>
       {/* =============TABLE-BOTTOM=============*/}
      <div className='m-3' style={{textAlign:'right'}}>
        <span style={{position:'relative'}}>
          {
           pageCount==1 ?<span className='m-1'><BackwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
           <span className='m-1'><BackwardOutlined onClick={({i='previous'})=>{PaginationCall(i,fetchMailList,setPage,setPageCount,page,pageCount)}} style={{color:'#0696ac',cursor:'pointer',fontSize:30}}/></span> 
          }
          <strong style={{color:'black'}}>{pageCount} of {Totalcount}</strong>
          {
           pageCount==Totalcount ?<span className='m-1'><ForwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
           <span className='m-1'><ForwardOutlined onClick={({i='next'})=>{PaginationCall(i,fetchMailList,setPage,setPageCount,page,pageCount)}} style={{color:'#0696ac',cursor:'pointer',fontSize:30}}/></span> 
          }
          </span>
        </div>
      </div>
      {/*=============EXTERNAL COMPONENTS & MODAL=============*/}
        <Modal centered open={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={false}>
          {edit&&<Edit consultantInfo={editValues} optsets={optsets} setVisible={setVisible} updateConsultant={updateConsultant} />} {/*passing the values and states in the edit component*/}
        </Modal>
        <Modal centered open={commentModal} onOk={() => setCommentModal(false)} onCancel={() => setCommentModal(false)} footer={false}>
          {commentVisible&&<Comments data={commentValue} setCommentModal={setCommentModal}/>}   {/*passing the values and states in the comment component*/}
        </Modal>
        <Modal centered open={mailModal} onOk={() => setMailModal(false)} onCancel={() => setMailModal(false)} footer={false}>
          {mailVisible&&<Mail setMailModal={setMailModal} mailModal={mailModal} isCheck={isCheck} listArr={List}/>} {/*passing the values and states in the mail component*/}
        </Modal>
      </Col>
    </Row>
  </>
    )}

export default SendMailCom
