import React,{useEffect} from 'react'
import Router from 'next/router';

import SendMail from './Sendmail/index';

 export const ConsultantInfo = ({sessionData,data, optsets} ) => {
    useEffect(() => {
        if(sessionData.auth != true){
            Router.push("/signin");
        } 
    }, [])

return (<><SendMail data={data} optsets={optsets}/></>)

}
export default ConsultantInfo

