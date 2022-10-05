import React,{useState} from 'react'
import{Row,Col,Form,Button,Spinner} from 'react-bootstrap'
import axios from 'axios';

const EntryCom = () => {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [field, setField] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [experience, setExperience] = useState('')
  const [region, setRegion] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const Post_Entry: string = (process.env.NEXT_PUBLIC_FP_POST_ENTRIES  as string);
  
  const postEntry=(e:React.FormEvent)=>{

    e.preventDefault();
    setLoading(true);
    let res = axios.post(Post_Entry,{
     email:email,
     firstname:firstname, 
     lastname:lastname, 
     field:field, 
     phone:phone, 
     linkedIn:linkedIn, 
     experience:experience, 
     region:region, 
    }).then((res) => {
      if (res.data.message !== "Success") {
        setError(true);
        setLoading(false);
        setMessage("Not uploaded. Try again!");
      }else if(res.data.message === "Success") {
        setMessage("Uploaded successfully!");
        setLoading(false);
      }
    })
  }
  
  let Provinces = [
    {plain:"Alberta"},
    {plain:"British Columbia"},
    {plain:"Manitoba"},
    {plain:"New Brunswick"},
    {plain:"Newfoundland"},
    {plain:"Northwest Territories"},
    {plain:"Nova Scotia"},
    {plain:"Nunavut"},
    {plain:"Ontario"},
    {plain:"Prince Edward Island"},
    {plain:"Quebec"},
    {plain:"Saskatchewan"},
    {plain:"Yukon"}
  ]

  let Experience =[
    {year:"6"},
    {year:"7"},
    {year:"8"},
    {year:"9"},
    {year:"10"},
    {year:"above 10 years"},
  ]

  let Categories = [
    {category:"Web Developer"},
    {category:"Scrum Master"},
    {category:"App Developer"},
    {category:"Data Scientist"},
    {category:"AI Engineer"},
    {category:"Data Analyst"},
    {category:"Data Engineer"},
  ]


  return (
    <div className='entry-form-container'>
      <div className='entry-form-div'>
      <Form className='entry-form' onSubmit={postEntry}>
      <div className='login-heading-div'><h4 className='mb-4'>Enter Detail.</h4></div>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" required placeholder="First name" onChange={(e) =>{setFirstname(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" required placeholder="Last name" onChange={(e) =>{setLastname(e.target.value)}}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col}  className="" controlId="formGridAddress2">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control placeholder="Enter LinkedIn" required onChange={(e) =>{setLinkedIn(e.target.value)}}/>
      </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Field</Form.Label>
        <Form.Select required onChange={(e) =>{setField(e.target.value)}} defaultValue="Choose...">
        <option style={{display:'none'}}>Select Field</option>
          {Categories.map((category:{category:string}, index)=>{return(<option key={index}>{category.category}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control placeholder="Enter phone number" required onChange={(e) =>{setPhone(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Email" type='email' required onChange={(e) =>{setEmail(e.target.value)}}/>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} md={8} controlId="formGridCity">
          <Form.Label>Region</Form.Label>
          <Form.Select required onChange={(e) =>{setRegion(e.target.value)}} >
            <option style={{display:'none'}}>Select Region</option>
            {Provinces.map((province:{plain:string}, index)=>{return(<option key={index}>{province.plain}</option>)})}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Experience</Form.Label>
        <Form.Select required onChange={(e) =>{setExperience(e.target.value)}} defaultValue="Choose...">
          <option style={{display:'none'}}>Select Year</option>
          {Experience.map((experience:{year:string}, index)=>{return(<option key={index}>{experience.year}</option>)})}
          </Form.Select>
        </Form.Group>
      </Row>
      {error&&<span style={{fontSize:14, color:'red'}}>{message}</span>}
      {!error&&<span style={{fontSize:14, color:'lightgreen'}}>{message}</span>}
      <div className='mt-4'>
      {!loading && <Button className='form-signin-btn' type="submit">Submit</Button>}
      {loading && <Button className='form-signin-btn' disabled type="submit"> 
      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
      </Button>
      }
      </div>
    </Form>
      </div>
      
    </div>
  )
}

export default EntryCom