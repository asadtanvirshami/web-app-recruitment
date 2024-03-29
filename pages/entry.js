import React from 'react'
import axios from 'axios';
import Cookies from "cookies";

import EntryCom from '../components/layout/Entry';

const entry = ({sessionData}) => {
return (<div className='entry-page-div'><EntryCom sessionData={sessionData}/></div>)
}

export default entry

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