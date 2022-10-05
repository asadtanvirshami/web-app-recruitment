import React, { ReactElement } from 'react'
import{List} from './Interface/ListInterface'


const SendMailCom = ({data}:any) => {
  return (
    <div>{data.map((data:List, index:any)=>{
      return(
    <>
    <div key={index}>
    <h2>{data.id}</h2>
    <h2>{data.field}</h2>
    <h2>{data.firstname}</h2>
    </div>
    </>
    )})}</div>
  )
}

export default SendMailCom