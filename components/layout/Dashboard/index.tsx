import React,{useEffect} from 'react'
import Router from 'next/router';

import SelectionCom from './SelectionCom';

 const Dashboard = ({sessionData}:any) => {
    useEffect(() => {
        if(sessionData.auth != true){
        Router.push('/signin')
        }
    }, [])

return (
 <>
 <SelectionCom/>
 </>
 )

}
export default Dashboard

