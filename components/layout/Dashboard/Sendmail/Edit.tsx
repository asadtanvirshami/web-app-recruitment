import React,{useEffect,useState} from 'react'
import{Row,Col,Form,Button,Spinner} from 'react-bootstrap'
import axios from 'axios';

type Props = {}

const Edit = ({updateListData, data, setVisible}:any) => {
  const [id, setId] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [field, setField] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [experience, setExperience] = useState('')
  const [region, setRegion] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('edithere',data)
    setId(data.id)
    setEmail(data.email)
    setFirstname(data.firstname)
    setLastname(data.lastname)
    setField(data.field)
    setLinkedIn(data.linkedIn)
    setExperience(data.experience)
    setRegion(data.region)
    setPhone(data.phone)
}, [data])

const Update_Entry: string = (process.env.NEXT_PUBLIC_FP_UPDATE_ENTRIES as string);
  
const updateEntry=(e:any)=>{
  e.preventDefault();
  setLoading(true);
  let res = axios.post(Update_Entry,{
   id:id,
   email:email,
   firstname:firstname, 
   lastname:lastname, 
   field:field, 
   phone:phone, 
   linkedIn:linkedIn, 
   experience:experience, 
   region:region, 
  }).then((x:any)=>{
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
        linkedIn:linkedIn, 
        experience:experience, 
        region:region, 
      })
      setLoading(false);
      setVisible(false);
    }})}
        

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
    {year:"above 10"},
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
      <Form.Label>LinkedIn</Form.Label>
      <Form.Control value={linkedIn} placeholder="Enter LinkedIn" required onChange={(e) =>{setLinkedIn(e.target.value)}}/>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Field</Form.Label>
      <Form.Select value={field} required onChange={(e) =>{setField(e.target.value)}}>
      <option style={{display:'none'}}>Select Field</option>
        {Categories.map((category:{category:string}, index)=>{return(<option key={index}>{category.category}</option>)})}
      </Form.Select>
      </Form.Group>
    </Row>
      <Form.Group className="mb-3" controlId="formGridAddress1">
      <Form.Label>Phone</Form.Label>
      <Form.Control value={phone} placeholder="Enter phone number" required onChange={(e) =>{setPhone(e.target.value)}}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
      <Form.Label>Email</Form.Label>
      <Form.Control value={email} placeholder="Enter Email" type='email' required onChange={(e) =>{setEmail(e.target.value)}}/>
      </Form.Group>
    <Row className="mb-3">
      <Form.Group as={Col} md={8} controlId="formGridCity">
      <Form.Label>Region</Form.Label>
      <Form.Select value={region} required onChange={(e) =>{setRegion(e.target.value)}} >
          <option style={{display:'none'}}>Select Region</option>
          {Provinces.map((province:{plain:string}, index)=>{return(<option key={index}>{province.plain}</option>)})}
      </Form.Select>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridState">
      <Form.Label>Experience</Form.Label>
      <Form.Select value={experience} required onChange={(e) =>{setExperience(e.target.value)}} >
      <option style={{display:'none'}}>Select Year</option>
        {Experience.map((experience:{year:string}, index)=>{return(<option key={index}>{experience.year}</option>)})}
      </Form.Select>
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