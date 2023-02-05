import React,{useState,useEffect} from 'react'
import Router from 'next/router';
import axios from 'axios';

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import{Row,Col,Button,Spinner} from 'react-bootstrap'

import InputComp from '../../shared/Form/Input'
import OptionSet from '../../shared/Form/OptionSet'
import CommenAreaCom from '../../shared/Form/Comment'

const SignupSchema = yup.object().shape({

  firstname: yup.string().required('Required'),
  lastname: yup.string().required('Required'),
  email: yup.string(),
  phone:yup.string(),
  resources:yup.string(),
  field:yup.string(),
  security_clearence:yup.string(),
  region:yup.string(),
  city:yup.string(),
  experience:yup.string(),
  source:yup.string(),
  comments:yup.string(),

})

const EntryCom = ({sessionData}) => {

  useEffect(() => {if(sessionData.auth != true){Router.push('/signin')}}, [])

  const { register, control, handleSubmit,reset, formState: { errors } } = useForm({
  resolver: yupResolver(SignupSchema),
  });

  const [optionSets, setOptionSets] = useState([])

  const [message, setMessage] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
  axios.get(process.env.NEXT_PUBLIC_FP_GET_OPTIONSET)
  .then((r)=>{
    if(r.status == 200){
    let tempStateOpt = []
    r.data.forEach((item,index)=>{
      tempStateOpt.push(
    item.categories.split(","),
    item.cities.split(","),
    item.resources.split(","),
    item.sources.split(","),
    item.experiences.split(","),
    item.security_clearences.split(","),
    item.regions.split(","),
      )
    })
  setOptionSets(tempStateOpt)
  }
  })
}, [])
  
  const onSubmit=async(data)=>{
    setLoading(true);
    let res = await axios.post(process.env.NEXT_PUBLIC_FP_POST_ENTRIES,{data}).then((res) => {
      if (res.data.message !== "Success") {
        setError(true);
        setLoading(false);
        setMessage("Not uploaded. Try again!");
      }else if(res.data.message === "Success") {
        setMessage("Uploaded successfully!");
        setLoading(false);
        reset()
      }
    })
  }

console.log('red---', )
  return (
    <div className='entry-form-container'>
      <div className='entry-form-div mt-4'>
      <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
        <div className='pb-4'><h3>Enter Consultant Detail</h3></div>
      <Row>
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='firstname' control={control} label='First name:' />
        {errors.firstname && <div className='error-line'>{errors.firstname.message}*</div>} 
        </Col>  
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='lastname' control={control} label='Last name:' />
        {errors.lastname && <div className='error-line'>{errors.lastname.message}*</div>} 
        </Col>  
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='email' control={control} label='Email:' />
        </Col>  
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='phone' control={control} label='Phone No.' />
        {errors.phone && <div className='error-line'>{errors.phone.message}*</div>} 
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='field' control={control} label='Category:'
        options={optionSets.length>0 ? optionSets[0].map(x=>x) :[]} />
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='source' control={control} label='Source:'
          options={optionSets.length>0 ? optionSets[3].map(x=>x) :[]} />
        </Col>  
        <Col className='py-1' style={{maxWidth:'32%'}}>
        <InputComp  register={register} name='source_link' control={control} label='Source Link:' /> 
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='resources' control={control} label='Resources:'
         options={optionSets.length>0 ? optionSets[2].map(x=>x) :[]} />
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='security_clearence' control={control} label='Security Clearence:'
        options={optionSets.length>0 ? optionSets[5].map(x=>x) :[]} />
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='experience' control={control} label='Experience:'
        options={optionSets.length>0 ? optionSets[4].map(x=>x) :[]} />
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='city' control={control} label='City:'
        options={optionSets.length>0 ? optionSets[1].map(x=>x) :[]} />
        </Col>  
        <Col md={4} className='py-1'>
        <OptionSet register={register} name='region' control={control} label='Region:'
        options={optionSets.length>0 ? optionSets[6].map(x=>x) :[]} />
        </Col>  
        <Col md={8} className='py-1'>
        <CommenAreaCom  register={register} name='comments' control={control} label='Comment:' /> 
        </Col>  
      </Row>
      <div className='mt-4'>
      {loading?<Button className='btn' disabled type="submit"><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:<button type="submit" className='btn' >Submit</button>}
      </div>
      <div className='mt-3'>
       {error?<span style={{fontSize:14, color:'red'}}>{message}</span>:<span style={{fontSize:14, color:'lightgreen'}}>{message}</span>}
      </div>
    </form>
    </div>
    </div>
  )
}

export default EntryCom