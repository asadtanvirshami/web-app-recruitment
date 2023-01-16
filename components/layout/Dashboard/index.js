import React,{useEffect} from 'react'
import Router from 'next/router';

import SelectionCom from './SelectionCom';

 export const Dashboard = ({sessionData,data} ) => {
    useEffect(() => {
        if(sessionData.auth != true){
            Router.push("/signin");
        } 
    }, [])

return (<><SelectionCom data={data}/></>)

}
export default Dashboard

