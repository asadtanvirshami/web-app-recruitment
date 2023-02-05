import axios from 'axios';
import React,{useState} from 'react'
import {Button,Spinner} from 'react-bootstrap'
import CooKies from "js-cookie";
import Router from "next/router";

import { InfoCircleOutlined, UserOutlined,LockOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';

const SignIn = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)

const [passwordVisible, setPasswordVisible] = React.useState(false);

const Signin =(e)=>{
  e.preventDefault();
  setLoading(true);
  axios.post(process.env.NEXT_PUBLIC_FP_POST_AUTH,{
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
    <div className='signin-form-div' >
      <div className='m-auto text-center'><img src={"logo_xl.png"} className="img-fluid m-5" width={400}/></div>
      <div className='m-auto text-center'><img src={"group.png"} className="img-fluid m-3" width={70}/></div>
    <form onSubmit={Signin} className="signin-form">
      <div className="signin-field">
      <div className='mt-0 mb-2'>
      <Input
      onChange={(e) =>{setEmail(e.target.value)}}
      size="large" 
      placeholder="Email"
      className='input-placeholder'
      prefix={<UserOutlined className="site-form-item-icon" />}
      suffix={
        <Tooltip title="enter your email">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
      </div>
      </div>
      <div className="signin-field">
      <span style={{color:"red",margin:0,padding:0,fontSize:13}}>{message}</span>
      <div className=''>
      <Input.Password
      onChange={(e) =>{setPassword(e.target.value)}}
      size="large" 
      placeholder="Password"
      className='input-placeholder'
      prefix={<LockOutlined className="site-form-item-icon" />}
      visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    /> 
      </div>
      </div>
      <div className='col-md-12 text-center mt-5'>
      {!loading && <Button className='form-signin-btn' type="submit"> Sign in </Button>}
      {loading && <Button className='form-signin-btn' disabled type="submit"> 
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
      </Button>
      }
      </div>
      <div className='col-md-12 text-center mt-1 mb-1'>
      <small>or</small>
      </div>
      <div className='col-md-12 text-center'>
      <Button href="/signup" variant="primary" className='btn'>Sign up</Button>
      </div>  
    </form>
    </div>
    </div>

  )
}

export default SignIn