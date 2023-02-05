import React from 'react'
import Cookies from "cookies";
import axios from 'axios';

import AdminPanel from '../components/layout/Administration/AdminPanel';

 const admin = ({sessionData,optsets}) => {
return ( <AdminPanel sessionData={sessionData} optsets={optsets}/>)
 }

export default admin

export const getServerSideProps = async ({req,res}) => {

  const cookies = new Cookies(req, res);
  const value = await axios
  .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
    headers: {
    "x-access-token": `${cookies.get("token")}`,
  },
})
.then((x) => x.data);
console.log(value)
const sessionData = await value;

const optionsets = await fetch(process.env.NEXT_PUBLIC_FP_GET_OPTIONSET)
.then((r) => r.json());

const optsets = await optionsets;

return {
  props: { sessionData: sessionData ,optsets:optsets},
};
}