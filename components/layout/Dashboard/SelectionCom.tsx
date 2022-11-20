import React from 'react';
import {GetServerSideProps} from 'next'

import {Col,Row} from 'react-bootstrap';

import SendMailCom from './Sendmail/SendMailCom';

export const SelectionCom = ({data}:any) => {
  
  return (
    <Col><SendMailCom data={data}/></Col>
  )
}
export default SelectionCom

export const getServerSideProps: GetServerSideProps = async ({req,res}) => {

  const Get_List: string = (process.env.NEXT_PUBLIC_FP_GET_LISTS as string);
  const request = await fetch(Get_List)
  .then((r) => r.json());

  console.log(request);
  const data = await request;


  return {
    props: { data: data || null},
  };
}