import React from 'react'
import {GetServerSideProps} from 'next'
import Cookies from "cookies";
import axios from 'axios';

import Dashboard from '../components/layout/Dashboard';

 const dashboard = ({sessionData}:any) => {
 return (<><Dashboard sessionData={sessionData}/></>)
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

// Pass data to the page via props
return {
  props: { sessionData: sessionData },
};
}
{/* {!selection && <SelectionCom setSelection={setSelection}/>}
{selection && <SendMailCom/>} */}