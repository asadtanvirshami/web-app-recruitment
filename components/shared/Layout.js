import React, { useEffect } from 'react';
import MainLayout from './MainLayout';
import { useRouter } from 'next/router'
  
function Layout ({children}) {
  const router = useRouter();
  useEffect(() => {
    console.log(router.route);
  }, [])

  return(
    <>
    <MainLayout>
    {children}
    </MainLayout>
    </>
    )

};

export default Layout;
