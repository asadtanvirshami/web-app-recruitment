import React from 'react'
import Cookies from "cookies";
import axios from 'axios';

import ConsultantInfo from '../components/layout/ConsultantInfo/index';

 const consultantinfo = ({sessionData,data,optsets}) => {
 return (<><ConsultantInfo sessionData={sessionData} data={data} optsets={optsets}/></>)
}

export default consultantinfo

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

const request = await fetch(process.env.NEXT_PUBLIC_FP_GET_LISTS)
.then((r) => r.json());

const data = await request;

const optionsets = await fetch(process.env.NEXT_PUBLIC_FP_GET_OPTIONSET)
.then((r) => r.json());

const optsets = await optionsets;

return {
  props: {data:data, sessionData: sessionData, optsets:optsets },
};
}