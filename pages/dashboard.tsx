import React from 'react'
import {GetServerSideProps} from 'next'
import Cookies from "cookies";
import axios from 'axios';

import Dashboard from '../components/layout/Dashboard';

 const dashboard = ({sessionData,data}:any) => {
 return (<><Dashboard sessionData={sessionData} data={data}/></>)
}

export default dashboard

export const getServerSideProps: GetServerSideProps = async ({req,res}) => {
  // Fetch data from external API
  const Get_Jwt: string = (process.env.NEXT_PUBLIC_FP_GET_JWT as string);
  const cookies = new Cookies(req, res);
  const value = await axios
  .get(Get_Jwt, {
    headers: {
    "x-access-token": `${cookies.get("token")}`,
    email: `${cookies.get("email")}`,
    id: `${cookies.get("id")}`,
  },
})
.then((x) => x.data);
console.table(value);
const sessionData = await value;


const Get_List: string = (process.env.NEXT_PUBLIC_FP_GET_LISTS as string);
const request = await fetch(Get_List)
.then((r) => r.json());

console.log(request);
const data = await request;

// Pass data to the page via props
return {
  props: {data:data, sessionData: sessionData },
};
}
{/* {!selection && <SelectionCom setSelection={setSelection}/>}
{selection && <SendMailCom/>} */}