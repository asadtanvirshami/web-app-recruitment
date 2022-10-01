import axios from 'axios';
import React,{useState,useEffect} from 'react'
import {Button} from 'react-bootstrap'
import CooKies from "js-cookie";
import Router from "next/router";


const LoginPage = () => {
axios.defaults.withCredentials = true;
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')

const Post_Auth: string = (process.env.NEXT_PUBLIC_FP_POST_AUTH  as string);
const Auth_Detail: string = (process.env.NEXT_PUBLIC_FP_GET_AUTH_DETAIL  as string);

const Login =(e:React.FormEvent)=>{
  e.preventDefault();
  axios.post(Post_Auth,{
   email:email,
   password:password, 
  }).then((res) => {
    console.log(res);
    if (!res.data.auth ||res.data.message === "Failed") {
      setMessage("Invalid email on password.");
    }else {
      CooKies.set("token", res.data.accessToken);
      CooKies.set("email", res.data.email);
      CooKies.set("id", res.data.id);
      console.log(res.data);
      Router.push("/home");
    }
  })
  }
  useEffect(() => {
    const res = axios
      .get(Auth_Detail)
      .then((response) => {
        console.table(response.data);
      });
  }, []);

  return (
    <div className='login-form-container'>
     <div className='login-form-div' >
      <form onSubmit={Login} className="login-form">
      <div className='login-heading-div'><h1 className='login-form-heading'>Sign in</h1></div>
      <div className="login-field">
      <input type="email" name="email" className='login-input-email' required placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
      <label className='login-label'><img src={"login-user.png"} className="login-label-img"/></label>
    </div>
    <div className="login-field">
      <input type="password" name="password" id="password" className='login-input-password' placeholder="Password" required onChange={(e) =>{setPassword(e.target.value)}}/>
      <label className='login-label'><img src={"login-lock.png"} className="login-label-img"/></label>
    </div>
    <span style={{color:"red", textAlign:"center"}}>{message}</span>
    <div className='col-md-12 text-center mt-5'>
      <Button variant="primary" type="submit" className='form-signin-btn'>Sign in</Button>
      </div>
      <div className='col-md-12 text-center mt-2 mb-2'>
      <small>or</small>
    </div>
    <div className='col-md-12 text-center'>
      <Button variant="primary" type="submit" className='form-signup-btn'>Sign up</Button>
    </div>  
    </form>
    </div>
    </div>

  )
}

export default LoginPage