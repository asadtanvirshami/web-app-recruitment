import React from 'react'
import {GetServerSideProps} from 'next'
import axios from 'axios';
import Cookies from "cookies";

import SignIn from '../components/layout/SignIn';

type Props = {}

const signin = ({sessionData}:any) => {
  
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000)
  // }, [])

  return (
  <div className='signin-page-div'>
  <SignIn sessionData={sessionData}/>
  </div>
  )
  
}

export default signin

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
