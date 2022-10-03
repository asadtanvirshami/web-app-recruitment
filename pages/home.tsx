import {GetServerSideProps} from 'next'
import Router from 'next/router';
import React,{useEffect,useState} from 'react'
import Loader from '../components/shared/Loader';
import Cookies from "cookies";
import axios from 'axios';
import HomePage from '../components/layout/homepage/HomePage';


const Home = ({sessionData}:any) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => {
    if (sessionData.auth != true) {
        Router.push('/')
    }
}, [])

  const renderData = () => {
    if (loading != false) {
      return (
        <div className="ld text-center mt-5">
          <Loader/>
        </div>
      );
    }
  return (
    <div>
      <HomePage/>
    </div>
   )
  }
  return renderData();
}
export default Home

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