import {GetServerSideProps} from 'next'
import React,{useEffect} from 'react'
import axios from 'axios';
import Cookies from "cookies";
import Router from 'next/router';

import EntryCom from '../components/layout/Entry';

const entry = (sessionData:any) => {
  useEffect(() => {
    if(sessionData.auth != true){
    Router.push('/signin')
    }
}, [])
return (<div className='signin-page-div'><EntryCom/></div>)
}

export default entry

export const getServerSideProps: GetServerSideProps = async ({req,res}) => {
    // Fetch data from external API
    const Get_Jwt: string = (process.env.NEXT_PUBLIC_FP_GET_JWT as string);
    const cookies = new Cookies(req, res);
    const value = await axios
    .get(Get_Jwt, {
      headers: {
      "x-access-token": `${cookies.get("token")}`,
    },
  })
  .then((x) => x.data);
  const sessionData = await value;
  
  // Pass data to the page via props
  return {
    props: { sessionData: sessionData },
  };
  }