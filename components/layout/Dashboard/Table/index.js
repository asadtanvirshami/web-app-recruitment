import React, { useState,useEffect } from 'react'
import dynamic from "next/dynamic";
import Link from 'next/link';

import { CSVLink } from 'react-csv';
import axios from 'axios';
import {Table,Row,Col, Button, Spinner, Form,} from 'react-bootstrap';
import { Modal, Space,Checkbox } from 'antd';   

import 
{ StarOutlined,
  EditOutlined,
  BackwardOutlined,
  ForwardOutlined,
  DownloadOutlined,
  ReloadOutlined,
  FilterOutlined,
  DeleteOutlined,} 
  from '@ant-design/icons';
  
import Edit from './Edit';
import Comments from './Comments';
const Mail = dynamic(() => import("./Mail"),{ ssr: false });

const SendMailCom = ({data,optsets}) => {
  const [edit, setEdit] = useState(false)
  const [commentModal, setCommentModal] = useState(false)
  const [isCheckAll, setIsCheckAll] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterName, setfilterName] = useState("");
  const [filterSecurityClearence, setFilterSecurityClearence] = useState("");
  
  const [pageCount, setPageCount] = useState(1);
  const [Totalcount, setTotalCount] = useState(0)

  const [List, setList] = useState([]);
  const [listArr, setListArr] = useState([]);
  const [isCheck, setIsCheck] = useState([]);
  const [searchItems, setSearchItems] = useState([])
  const [optionSets, setOptionSets] = useState([])
  const [commentValue,setCommentValue]= useState({})
  const [editValues, setEditValues] = useState({});
  
  const [loading, setLoading ] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commentVisible, setCommentVisible] = useState(false);
  const [mailModal, setMailModal] = useState(false);
  const [mailVisible, setMailVisible] = useState(false);

//   useEffect(() => {
//     setLoading(true)
//     if(searchTerm.length>2){
//       axios.get(process.env.NEXT_PUBLIC_FP_SEARCH_ENTRIES,{
//         headers: {searchKeyword: `${searchTerm}`}
//       }).then((res)=>{
//         setLoading(false)
//         console.log(res.data[0])
//         setSearchItems(res.data[0]);
//       })
//     }else if(searchTerm.length<2){
//       setSearchItems([]);
//       setLoading(false)
//     }
// }, [searchTerm]);

  useEffect(() => {
    console.log(data)
   setList(data.rows)
   setListArr(data.rows)

    let tempState = [...optsets]
    let tempStateOpt = []
    
    tempState.forEach((item,index)=>{
      tempStateOpt.push(
        item.categories.split(","),
        item.security_clearences.split(","),
          )
        })
        const totalPages = Math.ceil(data.count / 10);
        setTotalCount(totalPages)
        setOptionSets(tempStateOpt)
  }, [data,optsets]);

  async function fetchConsultantList (currentPage){
    const res = await axios.get(
      process.env.NEXT_PUBLIC_FP_GET_LISTS_PAGINATE,{headers:{offset:`${currentPage}`,limit:10}}
    ).then((r)=>{
      let tempState = []
      r.data[0].List.forEach((x,i)=>{
        tempState.push(x)
      })
      const totalPages = Math.ceil(data.count / 10);
      setTotalCount(totalPages)
      setListArr(tempState)
    });
   }

   const PaginationCall =async ({i}) =>{ 
    if(i=='next'){
      if(pageCount>=1){
        let currentPage = pageCount+1
        setPageCount(currentPage)
        const ConsultantList = await fetchConsultantList(currentPage)
        }
    }
    if(i=='previous'){
      if(pageCount>1){
      let currentPage = pageCount-1
      setPageCount(currentPage)
      const ConsultantList = await fetchConsultantList(currentPage)
      }
    }
   }

  async function FilterList (){
    setLoading(true)
    await axios
    .post(process.env.NEXT_PUBLIC_FP_FILTER_LIST,{
      category:`${filterCategory}`,
      email:`${filterEmail}`,
      name:`${filterName}`,
      sc:`${filterSecurityClearence}`
    }).then((r)=>{console.log(r.data), setListArr(r.data),setLoading(false)})
  }
  
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
  
  const deleteEntry= async(id) => {
     await axios
     .delete(process.env.NEXT_PUBLIC_FP_DELETE_ENTRY, { headers: {id: id,},})
     .then((response) => {
        const newPeople = List.filter((x) => x.id !== id);
        setListArr(newPeople);
        setList(newPeople);    
  })}

  const updateListData = (x) => {
      console.log(x)
      let tempState = [...List];
      let i = tempState.findIndex((y=>x.id==y.id));
      tempState[i] = x;
      setListArr(tempState);
      setList(tempState);
  } 

  const handleReset = () => {
    setFilterCategory("");   
    setFilterSecurityClearence("");   
}


  return(
<>
  <Row>
    <Col md={12}>
      <div className='global-container'>
        <Row className=''>
          <span>
            <Col> 
              <h3 className='my-2'>Dashbaord</h3>
              <div style={{float:'right'}} className='text-center mt-2 mx-1'><Button className='send-btn' onClick={()=>{setMailModal(true);setMailVisible(true)}}>Send Mail</Button></div>
              <div style={{float:'right'}} className='text-center mt-2 mx-1'><Link href="/admin"><Button className='add-btn'>Administration</Button></Link></div>
              <CSVLink data={List} filename={"Recruitment-List.csv"} target="_blank"><span style={{float:'right'}} className='text-center mt-2 mx-1'> <Button className='btn-xl'>Download <DownloadOutlined style={{float:'right', fontSize:20, color:'white'}}  /></Button></span></CSVLink>
            </Col>
            </span>
            <Row className='mt-3 mx-1' style={{justifyContent:"left"}}>
        <Col md={2}>
          <Form.Select onChange={(e) =>{setFilterCategory(e.target.value)}} value={filterCategory} className='select-bar' aria-label="Default select example">
          <option style={{display:'none'}}>Select Category</option>
          {optionSets.length>0 ? optionSets[0].map((item,index)=>{return(<option key={index} style={{display:''}}>{item}</option>)}):[]}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select onChange={(e) =>{setFilterSecurityClearence(e.target.value)}} value={filterSecurityClearence} className='select-bar' aria-label="Default select example">
          <option style={{display:'none'}}>Select S.C</option>
          {optionSets.length>0 ? optionSets[1].map((item,index)=>{return(<option key={index} style={{display:''}}>{item}</option>)}):[]}
          </Form.Select>
        </Col>
        <Col md={2}>
          <input onChange={(e) =>{setFilterEmail(e.target.value)}} type="email" name='Email' placeholder="Email" className='select-bar' aria-label="Default select example"/>
        </Col>
        <Col md={2}>
          <input onChange={(e) =>{setfilterName(e.target.value)}} placeholder="Name" type="email"  className='select-bar' aria-label="Default select example"/>
        </Col> 
        <Col md={4}>
            <button type='submit' className='group-btn-1' onClick={(e)=>{FilterList()}} style={{fontSize:17, color:'gray'}} ><FilterOutlined className='pb-1'/></button>
            <button type="reset" className='group-btn-2' onClick={(e)=>{(setListArr(List),handleReset())}} style={{fontSize:17, color:'gray'}}><ReloadOutlined  className='pb-1'/></button>
        </Col> 
     </Row>
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
            {loading==false && searchTerm=='' && List.length > 0 ? <tbody style={{ height: 10,  overflow:'scroll'}}>
            {listArr.sort((a, b) => a.experience > b.experience ? 1 : -1).reverse().map((data,index)=>{
            return(
            <tr key={index} className='f text-center row-hover'>
              <td>
              <Space><Checkbox onChange={(e)=>handleClick(e,data)} type='checkbox' checked={isCheck.includes(data.id)}></Checkbox></Space>
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
              <td onClick={()=>{deleteEntry(data.id,index)}} key={index}><DeleteOutlined style={{cursor:'pointer'}}/></td>
              <td onClick={() =>{setEditValues(data);setEdit(true);setVisible(true)}}><EditOutlined style={{cursor:'pointer'}}/></td>
                <td onClick={() =>{setCommentModal(true); setCommentValue(data); setCommentVisible(true)}} style={{cursor:'pointer'}}><StarOutlined/></td>
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
      </div></>}
     </div>
      </Row>
      <div className='m-3' style={{textAlign:'right'}}>
        <span style={{position:'relative'}}>
          {
           pageCount==1 ?<span className='m-1'><BackwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
           <span className='m-1'><BackwardOutlined onClick={({i='previous'})=>{PaginationCall({i})}} style={{color:'#004D99',cursor:'pointer',fontSize:30}}/></span> 
           }
          <strong style={{color:'black'}}>{pageCount} of {Totalcount}</strong>
           {
           pageCount==Totalcount?<span className='m-1'><ForwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
           <span className='m-1'><ForwardOutlined onClick={({i='next'})=>{PaginationCall({i})}} style={{color:'#004D99',cursor:'pointer',fontSize:30}}/></span> 
           }
          </span>
        </div>
      </div>
        <Modal centered open={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} footer={false}>
          {edit&&<Edit consultantInfo={editValues} optsets={optsets} setVisible={setVisible} updateListData={updateListData} />}
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
    )}

export default SendMailCom
