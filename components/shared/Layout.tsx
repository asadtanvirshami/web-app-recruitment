import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import { useRouter } from 'next/router'
  
function Layout ({children}:{children:React.ReactNode}) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, [])

  const login = "/"
  
  return(
    
  <>
   {router.route===login&&(
    <>
    {children}
    </>
    )}
   {router.route!=login&&(
    <>
    <MainLayout children={children}/>
    </>
    )}
  </>
  )

  };

export default Layout;
