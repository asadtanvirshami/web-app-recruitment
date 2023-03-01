import React from 'react'
import Cookies from "cookies";
import axios from 'axios';

import Dashboard from '../components/layout/Dashboard';

 const dashboard = ({sessionData,data,optsets}) => {
 return (<><Dashboard sessionData={sessionData} data={data} optsets={optsets}/></>)
}

export default dashboard

export const getServerSideProps = async ({req,res}) => {
  // Fetch data from external API
  const cookies = new Cookies(req, res);
  const value = await axios
  .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
    headers: {
    "x-access-token": `${cookies.get("token")}`,
    email: `${cookies.get("email")}`,
    id: `${cookies.get("id")}`,
  },
})
.then((x) => x.data);

const sessionData = await value;

const request = await axios.get(process.env.NEXT_PUBLIC_FP_GET_CONSULTANTS)
.then((r) => r.data);

const data = await request;

const optionsets = await fetch(process.env.NEXT_PUBLIC_FP_GET_OPTIONSET)
.then((r) => r.json());

const optsets = await optionsets;

return {
  props: {data:data, sessionData: sessionData, optsets:optsets },
};
}