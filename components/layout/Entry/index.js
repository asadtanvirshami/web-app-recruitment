import React,{useState,useEffect} from 'react'
import Router from 'next/router';
import axios from 'axios';

import{Row,Col,Form,Button,Spinner} from 'react-bootstrap'

const EntryCom = ({sessionData}) => {

  useEffect(() => {
    if(sessionData.auth != true){
    Router.push('/signin')
    }
}, [])

  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [field, setField] = useState('')
  const [sources, setSources] = useState('')
  const [resources, setResources] = useState('')
  const [sourceLink, setSourceLink] = useState('')
  const [comments, setComment] = useState('')
  const [experience, setExperience] = useState('')
  const [securityClearence, setSecurityClearence] = useState('')
  const [city, setCity] = useState('')
  const [region, setRegion] = useState('')
  const [phone, setPhone] = useState('')

  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  
  const postEntry=(e)=>{
    e.preventDefault();
    setLoading(true);
    let res = axios.post(process.env.NEXT_PUBLIC_FP_POST_ENTRIES,{
     email:email,
     firstname:firstname, 
     lastname:lastname, 
     field:field, 
     phone:phone, 
     source:sources, 
     source_link:sourceLink, 
     resources:resources, 
     comments:comments, 
     sc:securityClearence, 
     city:city,
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
        setShow(false)
        e.target.reset()
      }
    })
  }
  
  let Provinces = [
    {plain:"Alberta"},
    {plain:"Ontario"},
    {plain:"Quebec"},
    // {plain:"British Columbia"},
    // {plain:"Manitoba"},
    // {plain:"New Brunswick"},
    // {plain:"Newfoundland"},
    // {plain:"Northwest Territories"},
    // {plain:"Nova Scotia"},
    // {plain:"Nunavut"},
    // {plain:"Prince Edward Island"},
    // {plain:"Saskatchewan"},
    // {plain:"Yukon"}
  ]

  let Experience =[
    {year:"5"},
    {year:"6"},
    {year:"7"},
    {year:"10"},
    {year:"...15"},
  ]

  let City =[
    {city:"Montreal"},
    {city:"Ottawa"},
    {city:"Gatineu"},
  ]

  let Categories = [
    {category:"Web Developer"},
    {category:"Scrum Master"},
    {category:"App Developer"},
    {category:".Net Developer"},
    {category:"AI Engineer"},
    {category:"Business Analyst"},
    {category:"Power App Developer"},
  ]

  let Sources = [
    {source:"LinkedIn"},
    {source:"Indeed"},
    {source:"Reference"},
  ]

  let Resource = [
    {resource:"Good"},
    {resource:"Excellent"},
    {resource:"Super"},
  ]


  return (
    <div className='entry-form-container'>
      <div className='entry-form-div mt-4'>
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
        <Form.Label>Sources</Form.Label>
        <Form.Select required onChange={(e) =>{setSources(e.target.value),setShow(true)}} >
            <option style={{display:'none'}}>---Select Sources---</option>
            {Sources.map((source, index)=>{return(<option key={index}>{source.source}</option>)})}
        </Form.Select>
        {show && <Form.Group className='mt-3'>
        <Form.Label>Source Link</Form.Label>
        <Form.Control placeholder="Enter source link" required onChange={(e) =>{setSourceLink(e.target.value)}}/>
        </Form.Group>}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Field</Form.Label>
        <Form.Select required onChange={(e) =>{setField(e.target.value)}} defaultValue="Choose...">
        <option style={{display:'none'}}>---Select Field---</option>
          {Categories.map((category, index)=>{return(<option key={index}>{category.category}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control placeholder="Enter phone number" required onChange={(e) =>{setPhone(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Tell us about Resourse:</Form.Label>
        <Form.Select required onChange={(e) =>{setResources(e.target.value)}} defaultValue="Choose...">
        <option style={{display:'none'}}>---Select Resource---</option>
          {Resource.map((resource, index)=>{return(<option key={index}>{resource.resource}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Email" type='email' required onChange={(e) =>{setEmail(e.target.value)}}/>
        </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="formGridCity">
        <Form.Label>Region</Form.Label>
        <Form.Select required onChange={(e) =>{setRegion(e.target.value)}} >
        <option style={{display:'none'}}>---Select Region---</option>
         {Provinces.map((province, index)=>{return(<option key={index}>{province.plain}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>City</Form.Label>
        <Form.Select required onChange={(e) =>{setCity(e.target.value)}}>
        <option style={{display:'none'}}>--Select City--</option>
          {City.map((city, index)=>{return(<option key={index}>{city.city}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Experience</Form.Label>
        <Form.Select required onChange={(e) =>{setExperience(e.target.value)}}>
        <option style={{display:'none'}}>---Select Year---</option>
          {Experience.map((experience, index)=>{return(<option key={index}>{experience.year}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Security Clearence</Form.Label>
        <Form.Select required onChange={(e) =>{setSecurityClearence(e.target.value)}}>
        <option style={{display:'none'}}>---Select S.C---</option>
          {Experience.map((experience, index)=>{return(<option key={index}>{experience.year}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comments</Form.Label>
        <Form.Control onChange={(e)=>{setComment(e.target.value)}} as="textarea" rows={3} />
      </Form.Group>
      </Row>
      {error&&<span style={{fontSize:14, color:'red'}}>{message}</span>}
      {!error&&<span style={{fontSize:14, color:'lightgreen'}}>{message}</span>}
      <div className='mt-4'>
      {!loading && <Button className='btn' type="submit">Submit</Button>}
      {loading && <Button className='btn' disabled type="submit"> 
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