import React from 'react';
import {GetServerSideProps} from 'next'

import {Col,Row} from 'react-bootstrap';

import SendMailCom from './Sendmail';

export const SelectionCom = ({data}) => {
  
  return (
    <Col><SendMailCom data={data}/></Col>
  )
}
export default SelectionCom

export const getServerSideProps = async ({req,res}) => {
  const request = await fetch(process.env.NEXT_PUBLIC_FP_GET_LISTS)
  .then((r) => r.json());

  console.log(request);
  const data = await request;


  return {
    props: { data: data || null},
  };
}