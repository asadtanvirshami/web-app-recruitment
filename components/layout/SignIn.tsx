import axios from 'axios';
import React,{useState} from 'react'
import {Button,Spinner} from 'react-bootstrap'
import CooKies from "js-cookie";
import Router from "next/router";

const SignIn = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)
const [reveal, setReveal] = useState(false);


const Signin =(e:React.FormEvent)=>{
  const Post_Auth: string = (process.env.NEXT_PUBLIC_FP_POST_AUTH  as string);
  e.preventDefault();
  setLoading(true);
  axios.post(Post_Auth,{
   email:email,
   password:password, 
  }).then((res) => {
    if (res.data.message === "Failed") {
      setMessage("Invalid email on password.");
      setLoading(false);
    }else {
      CooKies.set("token", res.data.accessToken);
      CooKies.set("email", res.data.email);
      CooKies.set("id", res.data.id);
      console.log(res.data);
      Router.push("/");
    }
  })
  }

  return (
    <div className='signin-form-container'>
    <div className='signin-form-div ' >
    <form onSubmit={Signin} className="signin-form">
      <div className='signin-heading-div'><h1 className='signin-form-heading'>Sign in</h1></div>
      <div className="signin-field">
      <input type="email" name="email" className='signin-input-email' required placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}}/>
      <label className='signin-label'><img src={"login-user.png"} className="signin-label-img"/></label>
      </div>
      <div className="signin-field">
      <span style={{color:"red",margin:0,padding:0,fontSize:13}}>{message}</span>
      <input type={reveal?'text':'password'} className='signin-input-password' placeholder="Password" required onChange={(e) =>{setPassword(e.target.value)}}/>
      <label className='signin-label'><img src={"login-lock.png"} className="signin-label-img"  onClick={()=>setReveal(!reveal)}/></label>
      </div>
      <div className='col-md-12 text-center mt-5'>
      {!loading && <Button className='form-signin-btn' type="submit"> Submit </Button>}
      {loading && <Button className='form-signin-btn' disabled type="submit"> 
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
      </Button>
      }
      </div>
      <div className='col-md-12 text-center mt-2 mb-2'>
      <small>or</small>
      </div>
      <div className='col-md-12 text-center'>
      <Button href="/signup" variant="primary" className='form-signup-btn'>Sign up</Button>
      </div>  
    </form>
    </div>
    </div>

  )
}

export default SignIn