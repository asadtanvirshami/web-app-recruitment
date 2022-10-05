import React from 'react'
import Router from 'next/router'

const Main = ({sessionData}:any) => {
    
    React.useEffect(() => {
        
    if(sessionData.auth == true){
        Router.push('/dashboard')
    }else if(sessionData.auth == false){
        Router.push('/signin')
    }

    return () => {

    }
}, [sessionData])

    return (
    <div>
            
    </div>
    )
}

export default Main