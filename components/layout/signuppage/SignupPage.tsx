import React,{useState} from 'react'
import {Button,Col,Row,Spinner} from 'react-bootstrap'
import axios from 'axios';
import Router from "next/router";

type Props = {}

const SignupPage = (props: Props) => {
const [firstname, setFirstname] = useState('')
const [lastname, setLastname] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState('')
const [loading, setLoading] = useState(false)

const Post_Auth: string = (process.env.NEXT_PUBLIC_FP_POST_USER  as string);

const Signup =(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);
    axios.post(Post_Auth,{
     firstname:firstname,
     lastname:lastname,
     email:email,
     password:password, 
    }).then((res)=>{
        if(res.data.message === "Success"){
          Router.push("/");
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
     <div className='signup-heading-div'><h1 className='signup-form-heading'>Sign Up</h1></div>
     <Row>
     <Col md={6} className="signup-field">
     <input type="text" name="firstname" className='signup-input-email' required placeholder="John" onChange={(e) =>{setFirstname(e.target.value)}}/>
     <label className='signup-label'>First name</label>
     </Col>
     <Col md={6} className="signup-field">
     <input type="text" name="lastname" id="password" className='signup-input-password' placeholder="Doe" required onChange={(e) =>{setLastname(e.target.value)}}/>
     <label className='signup-label'>Last name</label>
     </Col>
     </Row>
     <div>
     <div className="signup-field">
     <span style={{color:"red", fontSize:13}}>{message}</span>
     <input type="email" name="email" className='signup-input-email' required placeholder="abc@gmail.com" onChange={(e) =>{setEmail(e.target.value)}}/>
     <label className='signup-label'>Email</label>
     </div>
     <div className="signup-field">
     <input type="password" name="password" id="password" className='signup-input-password' placeholder="Password" required onChange={(e) =>{setPassword(e.target.value)}}/>
     <label className='signup-label'>Password</label>
     </div>
     </div>
     <div className='col-md-12 text-center'>
     {!loading && <Button className='form-signin-btn' type="submit"> Submit </Button>}
      {loading && <Button className='form-signin-btn' disabled type="submit"> 
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
      </Button>
      }
     </div>  
   </form>
   </div>
   </div>
  )
}

export default SignupPage