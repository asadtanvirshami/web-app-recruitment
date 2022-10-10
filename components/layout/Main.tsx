import React,{useEffect} from 'react'
import Router from 'next/router'

const Main = ({sessionData}:any) => {
    
    useEffect(() => {   
    if(sessionData.auth != true){
        Router.push("/signin");
    }else if(sessionData.auth == true){
        Router.push('/dashboard')
    }
    }, [])

    return (
    <>        
    </>
    )
}

export default Main