import React from 'react'
import Cookies from "cookies";
import axios from 'axios';

import Main from '../components/layout/Main';

 const Home = ({sessionData}) => {
return ( <Main sessionData={sessionData}/>)
 }

export default Home

export const getServerSideProps = async ({req,res}) => {

  const cookies = new Cookies(req, res);
  const value = await axios
  .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
    headers: {
    "x-access-token": `${cookies.get("token")}`,
  },
})
.then((x) => x.data);
const sessionData = await value;


return {
  props: { sessionData: sessionData },
};
}