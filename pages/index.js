import {GetServerSideProps} from 'next'
import React from 'react'
import Cookies from "cookies";
import axios from 'axios';

import Main from '../components/layout/Main';

 const Home = ({sessionData}) => {
return ( <Main sessionData={sessionData}/>)
 }

export default Home

export const getServerSideProps = async ({req,res}) => {
  // Fetch data from external API
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

// Pass data to the page via props
return {
  props: { sessionData: sessionData },
};
}
{/* {!selection && <SelectionCom setSelection={setSelection}/>}
{selection && <SendMailCom/>} */}