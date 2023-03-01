import React from 'react'
import axios from 'axios';
import Cookies from "cookies";
import History from '../components/layout/History'

const history = ({sessionData,data}) => {

  return (
    <div><History sessionData={sessionData} data={data}/></div>
  )
}

export default history

export const getServerSideProps = async ({req,res, }) => {

  const cookies = new Cookies(req, res);
  const value = await axios
  .get(process.env.NEXT_PUBLIC_FP_GET_JWT, {
    headers: {
    "x-access-token": `${cookies.get("token")}`,
  },
})
.then((x) => x.data);
const sessionData = await value;

const request = await axios.get(process.env.NEXT_PUBLIC_FP_GET_SENT_LIST)
.then((r) => r.data);

const data = await request;

return {
  props: { sessionData: sessionData,data },
};
}