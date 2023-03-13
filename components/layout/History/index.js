import React,{useEffect,useState} from 'react'
import Router from 'next/router';
import axios from 'axios'

import { Col, Row } from 'react-bootstrap'
import {
  BackwardOutlined,
  ForwardOutlined,
  DeleteOutlined,
  FilterOutlined,
  ReloadOutlined} 
  from '@ant-design/icons';

export const History = ({sessionData,data}) => {
  const [List, setList] = useState([])

  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1);
  const [Totalcount, setTotalCount] = useState(0)

  const [sentDay, setSentDay] = useState("")
  const [sentDate, setSentDate] = useState("")

  useEffect(() => {if(sessionData.auth != true){Router.push('/signin')}}, [])

  useEffect(() => {
    console.log(data)
    setList(data[0].mailHistory)

    const totalPages = Math.ceil(data[0].total / 10);
    setTotalCount(totalPages)
  }, [])

  async function fetchMailList (currentPage){
      const res = await axios.get(
        process.env.NEXT_PUBLIC_FP_GET_SENT_LIST,{headers:{offset:`${currentPage}`, limit:10, sent_date:sentDate, sent_day:sentDay}}
      ).then((r)=>{
        console.log(r)
        let tempState = []
        r.data[0].mailHistory.forEach((x,i)=>{
          tempState.push(x)
        })
        const totalPages = Math.ceil(r.data[0].total / 10);
        setTotalCount(totalPages)
        setList(tempState)
      });
  }

  const PaginationCall =async ({i}) =>{ 
    if(i=='next'){
      if(pageCount>=1){
        let func = 'pagination'
        let pageNum = pageCount+1
        let currentPage = page+9
        setPage(currentPage)
        setPageCount(pageNum)
        fetchMailList(currentPage)
        }
    }
    if(i=='previous'){
      if(pageCount>1){
      let func = 'pagination'
      let pageNum = pageCount-1
      let currentPage = page-9
      setPage(currentPage)
      setPageCount(pageNum)
      fetchMailList(currentPage)
      }
    }
    if(i=='get'){
      let func = 'pagination'
      let pageNum = 1
      let currentPage = 0
      setPage(currentPage)
      setPageCount(pageNum)
      fetchMailList(currentPage)
    }
  }

  const deleteMail= async(id) => {
  await axios
  .delete(process.env.NEXT_PUBLIC_FP_DELETE_HISTORY, { headers: {id: id,}})
  .then((response) => {
    if(response.status == 200){
      const newList = List.filter((x) => x.id !== id);
      const totalPages = Math.ceil(data[0].total / 10);   
      setList(newList); 
      setTotalCount(totalPages)
    }
 })
  }

  const handleReset = () => {
    setSentDate("");   
    setSentDay(""); 
    const totalPages = Math.ceil(data[0].total / 10);
    setTotalCount(totalPages)
}

  return (
    <div className='global-container'>
      <h3>Mail History</h3>
      <input onChange={(e) =>{setSentDate(e.target.value)}} placeholder="February 14th 2022" className='select-bar'/>
      <input onChange={(e) =>{setSentDay(e.target.value)}} placeholder="Tuesday" className='select-bar mx-3'/>
      <button type='submit' className='group-btn-1' onClick={({i='get'})=>{PaginationCall({i})}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 } style={{fontSize:17, color:'gray'}} ><FilterOutlined className='pb-1'/></button>
      <button type="reset" className='group-btn-2'  onClick={(e)=>{(setList(data[0].mailHistory),handleReset())}} style={{fontSize:17, color:'gray'}}><ReloadOutlined  className='pb-1'/></button>

    <div className='global-div'>
    <div className='notification-form'>
      <hr/>
      {List.lenght>0 ? <></>:
      <>
      {List.map((data, index) =>{
        return(
          <div key={index}>
          <Row>
            <Col md={11}>
             <li style={{listStyle:'none', fontSize:16}}>
              {index+1}. {data.User.firstname} {data.User.lastname} have sent a mail on <strong>{data.sent_day}</strong> for the recruitment in {data.Consultant.region}, Canada for {data.Consultant.category} to <strong>{data.Consultant.name}</strong></li>
            </Col>
            <Col >
            <li onClick={()=>{deleteMail(data.id,index)}} style={{listStyle:'none', fontSize:18}}><DeleteOutlined className='modify-edit'/></li>
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
    {
      pageCount==1 ?<span className='m-1'><BackwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
      <span className='m-1'><BackwardOutlined onClick={({i='previous'})=>{PaginationCall({i})}} style={{color:'#0696ac',cursor:'pointer',fontSize:30}}/></span> 
    }
      <strong style={{color:'black'}}>{pageCount} of {Totalcount}</strong>
    {
      pageCount==Totalcount?<span className='m-1'><ForwardOutlined style={{color:'silver',cursor:'pointer',fontSize:30}}/></span>:
      <span className='m-1'><ForwardOutlined onClick={({i='next'})=>{PaginationCall({i})}} style={{color:'#0696ac',cursor:'pointer',fontSize:30}}/></span> 
    }
    </div>
  )
}

export default History