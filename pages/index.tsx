import React,{useState,useEffect} from 'react'
import Loader from '../components/shared/Loader';
import LoginPage from '../components/layout/loginpage/LoginPage';

type Props = {}

const login = (props: Props) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])


  const renderData = () => {
    if (loading != false) {
      return (
        <div className="ld text-center mt-5">
          <Loader/>
        </div>
      );
    }
  return (
  
        <div className='login-page-div'>
        <LoginPage/>
        </div>

  )
  }
  return renderData();
}

export default login