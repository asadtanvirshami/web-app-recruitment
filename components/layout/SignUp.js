import React,{useState} from 'react'
import axios from 'axios';
import Router from "next/router";

import {EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import {Button,Col,Row,Spinner} from 'react-bootstrap'
import Link from 'next/link';

const SignUp = () => {
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)

const [passwordVisible, setPasswordVisible] = React.useState(false);

const Signup =(e)=>{
    e.preventDefault();
    setLoading(true);
    axios.post(process.env.NEXT_PUBLIC_FP_POST_USER,{
     firstname:firstname,
     lastname:lastname,
     email:email,
     password:password, 
    }).then((res)=>{
        if(res.data.message === "Success"){
          Router.push("/signin");
        }else if(res.data.message === "Failed"){
            setLoading(false);
            setMessage("This email is already in use.");
        }
    })
}

  return (
    <div className='signup-form-container'>
    <div className='signup-form-div' >
    <form className="signup-form" onSubmit={Signup}>
    <div className='m-auto text-center'><img src={"logo_xl.png"} className="img-fluid m-3" width={400}/></div>
     <Row className='mt-5'>
     <Col md={6} className="signup-field">
        <label>First Name</label>
       <Input size="large" placeholder="First Name" onChange={(e) =>{setFirstname(e.target.value)}} />
     </Col>
     <Col md={6} className="signup-field">
       <label>Last Name</label>
      <Input size="large" placeholder="Last Name" onChange={(e) =>{setLastname(e.target.value)}} />
     </Col>
     </Row>
     <div>
     <div className="signup-field">
     <span style={{color:"red", fontSize:13}}>{message}</span>
       <label>Email</label>
      <Input size="large" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}} />
     </div>
     <div className="signup-field">
       <label>Password</label>
       <Input.Password
       onChange={(e) =>{setPassword(e.target.value)}}
      size="large" 
      placeholder="Password"
      visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
    /> 
     </div>
     </div>
        <div>
          <Link href='/signin'>
            <p style={{fontSize:14,color:'#4fafe7', cursor:'pointer'}}>Already have an account?</p>
          </Link>  
        </div>
     <div className='col-md-12 text-center mt-5'>
     {!loading && <Button className='special-btn-xl' type="submit"> Submit </Button>}
      {loading && <Button className='special-btn-xl' disabled type="submit"> 
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
      </Button>
      }
     </div>  
   </form>
   </div>
   </div>
  )
}

export default SignUp