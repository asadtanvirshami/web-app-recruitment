import React,{useEffect} from 'react'
import Router from 'next/router';

import SelectionCom from './SelectionCom';

 const Dashboard = ({sessionData}:any) => {
    useEffect(() => {
        if(sessionData.auth==false){
                Router.push('/signin')
        }
        return () => {}
    }, [sessionData])

return (
 <>
 <SelectionCom/>
 </>
 )

}
export default Dashboard

