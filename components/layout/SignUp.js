import React,{useState} from 'react'
import axios from 'axios';
import Router from "next/router";


import {EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import {Button,Col,Row,Spinner} from 'react-bootstrap'

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
      {/* <div className='m-auto text-center'><img src={"group.png"} className="img-fluid m-3" width={70}/></div> */}
     {/* <div className='signup-heading-div'><h1 className='signup-form-heading'>Sign Up</h1></div> */}
     <Row className='mt-5'>
     <Col md={6} className="signup-field">
     {/* <input type="text" name="firstname" className='signup-input-email' required placeholder="John" onChange={(e) =>{setFirstname(e.target.value)}}/>
     <label className='signup-label'>First name</label> */}
        <label>First Name</label>
       <Input size="large" placeholder="First Name" onChange={(e) =>{setFirstname(e.target.value)}} />
     </Col>
     <Col md={6} className="signup-field">
     {/* <input type="text" name="lastname" id="password" className='signup-input-password' placeholder="Doe" required onChange={(e) =>{setLastname(e.target.value)}}/>
     <label className='signup-label'>Last name</label> */}
       <label>Last Name</label>
      <Input size="large" placeholder="Last Name" onChange={(e) =>{setLastname(e.target.value)}} />
     </Col>
     </Row>
     <div>
     <div className="signup-field">
     <span style={{color:"red", fontSize:13}}>{message}</span>
     {/* <input type="email" name="email" className='signup-input-email' required placeholder="abc@gmail.com" onChange={(e) =>{setEmail(e.target.value)}}/>
     <label className='signup-label'>Email</label> */}
       <label>Email</label>
      <Input size="large" placeholder="Email" onChange={(e) =>{setEmail(e.target.value)}} />
     </div>
     <div className="signup-field">
     {/* <input type="password" name="password" id="password" className='signup-input-password' placeholder="Password" required onChange={(e) =>{setPassword(e.target.value)}}/>
     <label className='signup-label'>Password</label> */}
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
     <div className='col-md-12 text-center mt-5'>
     {!loading && <Button className='btn' type="submit"> Submit </Button>}
      {loading && <Button className='btn' disabled type="submit"> 
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