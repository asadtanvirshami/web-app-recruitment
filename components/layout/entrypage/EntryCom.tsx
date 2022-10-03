import React,{useState} from 'react'
import{Row,Col,InputGroup,Form,Button} from 'react-bootstrap'
type Props = {}

const EntryCom = () => {

  let Provinces = [
    {plain:"Alberta",name:"Alberta",abbr:"AB"},
    {plain:"British Columbia",name:"British Columbia",abbr:"BC"},
    {plain:"Manitoba",name:"Manitoba",abbr:"MB"},
    {plain:"New Brunswick",name:"New Brunswick",abbr:"NB"},
    {plain:"Newfoundland &amp; Labrador",name:"Newfoundland &amp; Labrador",abbr:"NL"},
    {plain:"Northwest Territories",name:"Northwest Territories",abbr:"NT"},
    {plain:"Nova Scotia",name:"Nova Scotia",abbr:"NS"},
    {plain:"Nunavut",name:"Nunavut",abbr:"NU"},
    {plain:"Ontario",name:"Ontario",abbr:"ON"},
    {plain:"Prince Edward Island",name:"Prince Edward Island",abbr:"PE"},
    {plain:"Quebec",name:"Qu&eacute;bec",abbr:"QC"},
    {plain:"Saskatchewan",name:"Saskatchewan",abbr:"SK"},
    {plain:"Yukon",name:"Yukon",abbr:"YK"}
  ]

  let Experience =[
    {year:"1"},
    {year:"2"},
    {year:"3"},
    {year:"4"},
    {year:"5"},
    {year:"6"},
    {year:"7"},
    {year:"8"},
    {year:"9"},
    {year:"10"},
    {year:"11"},
    {year:"12"},
    {year:"13"},
    {year:"14"},
    {year:"15"},
  ]

  return (
    <div className='entry-form-container'>
      <div className='entry-form-div'>
      <Form className='entry-form'>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="email" placeholder="Enter full name" />
        </Form.Group>
      </Row>
        <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>LinkedIn</Form.Label>
        <Form.Control placeholder="Enter LinkedIn" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control placeholder="Enter phone number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Email" />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} md={8} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Select defaultValue="Choose...">
            {Provinces.map((province:{plain:string})=>{
              return(<option>{province.plain}</option>)
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Experience</Form.Label>
        <Form.Select defaultValue="Choose...">
            {Experience.map((experience:{year:string})=>{
              return(<option>{experience.year}</option>)
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <div className='mt-4'>
      <Button className='entry-btn' type="submit">Submit</Button>
      </div>
    </Form>
      </div>
      
    </div>
  )
}

export default EntryCom