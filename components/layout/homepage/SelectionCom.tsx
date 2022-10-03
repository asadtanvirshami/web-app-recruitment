import React from 'react';
import {Col, Form, Button } from 'react-bootstrap';


export const SelectionCom = ({setSelection}: {setSelection: any}) => {
  return (
    <div className='selection-form-container'>
    <div className='selection-form-div'>
    <form className='selection-form'>
     <div className='selection-heading-div'>
     <h5 className='selection-form-heading'>Select category & region for recruitment</h5>
     </div> 
     <Col className='mb-5'>
     <Form.Select aria-label="Default select example"  className='select-field' >
      <option className='select-type px-5'>Select region</option>
      <option className='select-options' value="1">Canada</option>
      <option className='select-options' value="2">United Arab Emirates</option>
      <option className='select-options' value="3">United States</option>
    </Form.Select>
    </Col>
     <Col className='mb-5'>
     <Form.Select aria-label="Default select example"  className='select-field' >
      <option className='select-type px-5'>Select category</option>
      <option className='select-options' value="2">Data Scientist</option>
      <option className='select-options' value="3">JavaScript Developer</option>
      <option className='select-options' value="3">Python Developer</option>
      <option className='select-options' value="3">Business intelligence</option>
    </Form.Select>
    </Col>
    <div className='text-center'>
      <Button className='select-submit-btn' onClick={()=>setSelection(true)}>Submit</Button>
    </div>
    </form>
    </div>
    </div>  
  )
}

export default SelectionCom