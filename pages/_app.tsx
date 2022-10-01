
import type { AppProps } from 'next/app'
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss'
import Layout from '../components/shared/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}

export default MyApp
