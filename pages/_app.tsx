import React,{ useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import Router, { useRouter  } from 'next/router';

import Layout from '../components/shared/Layout';
import Loader from '.././components/shared/Loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss'

function MyApp({ Component, pageProps }: AppProps) {
  
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Router.events.on("routeChangeStart", () => { setLoading(true) });
    Router.events.on("routeChangeComplete", () => { setLoading(false)});  
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return( 
    <>
      { (router.pathname !='/signin' && router.pathname != '/signup' && router.pathname != '/') &&
         <Layout>
              { loading && <Loader/> }
              { !loading &&  <Component {...pageProps} /> }
         </Layout> 
      }
      { (router.pathname =='/signin' || router.pathname == '/signup' || router.pathname == '/') &&
        <>
         { loading && <Loader/> }
         { !loading &&  <Component {...pageProps} /> }
        </>
      }
   </>
  )
}

export default MyApp
