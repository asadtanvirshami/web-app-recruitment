import React from 'react'
import axios from 'axios';
import Cookies from "cookies";
import Notification from '../components/layout/History'

const notifications = ({sessionData}) => {
  return (
    <div><Notification sessionData={sessionData}/></div>
  )
}

export default notifications

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