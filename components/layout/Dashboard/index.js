import React,{useEffect} from 'react'
import Router from 'next/router';

import MailTableCom from './Table/index';

 export const Dashboard = ({sessionData,data,optsets} ) => {
    useEffect(() => {
        if(sessionData.auth != true){
            Router.push("/signin");
        } 
    }, [])

return (<><MailTableCom data={data} optsets={optsets} /></>)

}
export default Dashboard

