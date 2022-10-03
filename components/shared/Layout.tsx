import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import { useRouter } from 'next/router'
  
function Layout ({children}:{children:React.ReactNode}) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, [])

  const login = "/"
  const signup = "/signup"
  

if (router.route===login || router.route===signup){
  return(  
    <>
    {children}
    </>
  ) 
} else{
  return(
    <>
    <MainLayout children={children}/>
    </>
    )
 }
};

export default Layout;
