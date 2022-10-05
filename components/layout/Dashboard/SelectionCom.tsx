import React,{useState} from 'react';
import axios from "axios";
import {Col, Form, Button } from 'react-bootstrap';
import {List} from './Interface/ListInterface';

import SendMailCom from './SendMailCom';

export const SelectionCom = () => {
  const [selection, setSelection] = useState(false);
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState('');
  const [data,setData] =  useState<List[]>([]);

const getList= async(e:React.FormEvent):Promise<any> => {
  setSelection(true)
  e.preventDefault();
  const Get_List: string = (process.env.NEXT_PUBLIC_FP_GET_LISTS as string);
   await axios.post(Get_List,{
    region:region,
    category:category
   }).then((response:any) => {
      setData(response.data[0]);
      console.log(response.data);
      })
    }
 
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
    <>
    {!selection && (
    <div className='selection-form-container'>
    <div className='selection-form-div'>
    <form className='selection-form' onSubmit={getList} >
     <div className='selection-heading-div'>
     <h5 className='selection-form-heading'>Select category & region for recruitment</h5>
     </div> 
     <Col className='mb-5'>
     <Form.Select aria-label="Default select example" onChange={(e) =>{setRegion(e.target.value)}}className='select-field' >
     <option style={{display:'none'}}>Select Region</option>
     {Provinces.map((province:{plain:string}, index)=>{return(<option key={index}>{province.plain}</option>)})}
    </Form.Select>
    </Col>
     <Col className='mb-5'>
     <Form.Select aria-label="Default select example" onChange={(e) =>{setCategory(e.target.value)}} className='select-field' >
     <option style={{display:'none'}}>Select Category</option>
     {Categories.map((category:{category:string}, index)=>{return(<option key={index}>{category.category}</option>)})}
    </Form.Select>
    </Col>
    <div className='text-center'>
      <Button className='select-submit-btn' type='submit'>Submit</Button>
    </div>
    </form>
    </div>
    </div>)} 
    {selection && (<><SendMailCom data={data}/></>)}
    </>
  )
}
export default SelectionCom
// {setSelection}: {setSelection: any}