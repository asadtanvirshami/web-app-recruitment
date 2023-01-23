import React,{useEffect,useState} from 'react'
import axios from 'axios';

import{Row,Col,Form,Button,Spinner} from 'react-bootstrap'

const Edit = ({updateListData, data, setVisible}) => {
  const [id, setId] = useState('')
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
  
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('edithere',data)
    setId(data.id)
    setEmail(data.email)
    setFirstname(data.firstname)
    setLastname(data.lastname)
    setField(data.field)
    setSources(data.source)
    setSourceLink(data.source_link)
    setResources(data.resources)
    setExperience(data.experience)
    setComment(data.comments)
    setRegion(data.region)
    setPhone(data.phone)
    setStatus(data.status)
    setSecurityClearence(data.security_clearence)
    setCity(data.city)
}, [data])
  
const updateEntry=(e)=>{
  e.preventDefault();
  setLoading(true);
  let res = axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_ENTRIES,{
   id:id,
   email:email,
   firstname:firstname, 
   lastname:lastname, 
   field:field, 
   phone:phone, 
   source:sources, 
   source_link:sourceLink, 
   resources:resources, 
   comments:comments,  
   experience:experience, 
   region:region, 
   status:status, 
   sc:securityClearence,
   city:city, 
  }).then((x)=>{
    console.log(x)
    setLoading(false);
    setVisible(false);
  if(x.data[0]==1 && x.data[0]==1){
      //removeValues();
      updateListData({
        id:id,
        email:email,
        firstname:firstname, 
        lastname:lastname, 
        field:field, 
        phone:phone, 
        source:sources, 
        source_link:sourceLink, 
        resources:resources, 
        comments:comments,  
        experience:experience, 
        region:region, 
        status:status, 
        security_clearence:securityClearence,
        city:city, 
      })
      setLoading(false);
      setVisible(false);
    }})}
        
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
  
    let Clearence =[
      {clearence:"Enhance"},
      {clearence:"Secret"},
    ]
  
    let Experience =[
      {year:"5"},
      {year:"6"},
      {year:"7"},
      {year:"10"},
      {year:"15"},
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
    <div>  
    <Form className='' onSubmit={updateEntry} >
    <div className='login-heading-div'><h4 className='mb-4'>Update Detail</h4></div>
    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>First name</Form.Label>
        <Form.Control value={firstname} type="text" required placeholder="First name" onChange={(e) =>{setFirstname(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Last name</Form.Label>
        <Form.Control value={lastname} type="text" required placeholder="Last name" onChange={(e) =>{setLastname(e.target.value)}}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}  className="" controlId="formGridAddress2">
        <Form.Label>Sources</Form.Label>
        <Form.Select value={sources} required onChange={(e) =>{setSources(e.target.value)}} >
            <option style={{display:'none'}}>---Select Sources---</option>
            {Sources.map((source, index)=>{return(<option key={index}>{source.source}</option>)})}
        </Form.Select>
        <Form.Group className='mt-3'>
        <Form.Label>Source Link</Form.Label>
        <Form.Control value={sourceLink} placeholder="Enter source link" required onChange={(e) =>{setSourceLink(e.target.value)}}/>
        </Form.Group>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Field</Form.Label>
        <Form.Select value={field} required onChange={(e) =>{setField(e.target.value)}} defaultValue="Choose...">
        <option style={{display:'none'}}>---Select Field---</option>
          {Categories.map((category, index)=>{return(<option key={index}>{category.category}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control value={phone} placeholder="Enter phone number" required onChange={(e) =>{setPhone(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col}  className="mb-3" controlId="formGridAddress1">
        <Form.Label>Tell us about Resourse:</Form.Label>
        <Form.Select value={resources} required onChange={(e) =>{setResources(e.target.value)}} defaultValue="Choose...">
        <option style={{display:'none'}}>---Select Resource---</option>
          {Resource.map((resource, index)=>{return(<option key={index}>{resource.resource}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} placeholder="Enter Email" type='email' required onChange={(e) =>{setEmail(e.target.value)}}/>
        </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="formGridCity">
        <Form.Label>Region</Form.Label>
        <Form.Select value={region} required onChange={(e) =>{setRegion(e.target.value)}} >
            <option style={{display:'none'}}>---Select Region---</option>
            {Provinces.map((province, index)=>{return(<option key={index}>{province.plain}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>City</Form.Label>
        <Form.Select value={city} required onChange={(e) =>{setCity(e.target.value)}}>
        <option style={{display:'none'}}>--Select City--</option>
          {City.map((city, index)=>{return(<option key={index}>{city.city}</option>)})}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Experience</Form.Label>
        <Form.Select value={experience} required onChange={(e) =>{setExperience(e.target.value)}}>
        <option style={{display:'none'}}>---Select Year---</option>
          {Experience.map((experience, index)=>{return(<option key={index}>{experience.year}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Security Clearence</Form.Label>
        <Form.Select value={securityClearence} required onChange={(e) =>{setSecurityClearence(e.target.value)}}>
        <option style={{display:'none'}}>---Select S.C---</option>
          {Clearence.map((clearence, index)=>{return(<option key={index}>{clearence.clearence}</option>)})}
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comments</Form.Label>
        <Form.Control value={comments} onChange={(e)=>{setComment(e.target.value)}} as="textarea" rows={3} />
        </Form.Group>
      </Row>
    <div className='mt-4'>
    {!loading && <Button className='form-signin-btn' type="submit">Update</Button> }
    {loading && <Button className='form-signin-btn' disabled type="submit"> 
    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    </Button>
    }
    </div>
  </Form>
  </div>
  )
}

export default Edit