import React,{useEffect,useState} from 'react'
import axios from 'axios';

import{Row,Col,Spinner} from 'react-bootstrap'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const SignupSchema = yup.object().shape({
  id:yup.string(),
  name: yup.string(),
  email: yup.string(),
  phone:yup.string(),
  resource:yup.string(),
  category:yup.string(),
  security_clearence:yup.string(),
  region:yup.string(),
  city:yup.string(),
  experience:yup.string(),
  source:yup.string(),
  comments:yup.string(),
})

import InputComp from '../../shared/Form/Input'
import OptionSet from '../../shared/Form/OptionSet'
import CommenAreaCom from '../../shared/Form/Comment'

const Edit = ({consultantInfo, setVisible, optsets,updateConsultant}) => {

  const { register, control, handleSubmit,reset, formState: { errors } } = useForm({
  resolver: yupResolver(SignupSchema),
  });
  
  const [optionSets, setOptionSets] = useState([])

  const[loading, setLoading]=useState(false)

  useEffect(() => {
    console.log(consultantInfo)
        let tempState = {...consultantInfo};
        let tempStateOpt = [];
        optsets.forEach((item,index)=>{
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
        reset(tempState)
  }, [consultantInfo,optsets])
  
  const updateEntry=async(data)=>{
    console.log(data)
  setLoading(true)
  let res = await axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_CONSULTANT,{data}).then((x)=>{
    setLoading(false);
    setVisible(false);
  if(x.data[0]==1 && x.data[0]==1){
      //removeValues();
      updateConsultant({
        id:data.id,
        email:data.email,
        name:data.name,
        category:data.category, 
        phone:data.phone, 
        source:data.source, 
        source_link:data.source_link, 
        resource:data.resource, 
        comments:data.comments,  
        experience:data.experience, 
        region:data.region, 
        status:data.status, 
        security_clearence:data.security_clearence,
        city:data.city, 
      })
      setLoading(false);
      setVisible(false);
    }})
  }
  return (
    <div>  
        <form onSubmit={handleSubmit(updateEntry)}>
        <div className='pb-4'><h3>Enter Consultant Detail</h3></div>
        <Row>
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='name' control={control} label='Name:' />
        </Col>  
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='email' control={control} label='Email:' />
        </Col>  
        <Col md={6} className='py-1'>
        <InputComp  register={register} name='phone' control={control} label='Phone No.' />
        {errors.phone && <div className='error-line'>{errors.phone.message}*</div>} 
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='category' control={control} label='Category:'
        options={optionSets.length>0 ? optionSets[0].map(x=>x) :[]} />
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='source' control={control} label='Source:'
          options={optionSets.length>0 ? optionSets[3].map(x=>x) :[]} />
        </Col>  
        <Col className='py-1' style={{maxWidth:'32%'}}>
        <InputComp  register={register} name='source_link' control={control} label='Source Link:' /> 
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='resource' control={control} label='Resources:'
         options={optionSets.length>0 ? optionSets[2].map(x=>x) :[]} />
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='security_clearence' control={control} label='Security Clearence:'
        options={optionSets.length>0 ? optionSets[5].map(x=>x) :[]} />
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='experience' control={control} label='Experience:'
        options={optionSets.length>0 ? optionSets[4].map(x=>x) :[]} />
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='city' control={control} label='City:'
        options={optionSets.length>0 ? optionSets[1].map(x=>x) :[]} />
        </Col>  
        <Col md={6} className='py-1'>
        <OptionSet register={register} name='region' control={control} label='Region:'
        options={optionSets.length>0 ? optionSets[6].map(x=>x) :[]} />
        </Col>  
        <Col md={12} className='py-1'>
        <CommenAreaCom  register={register} name='comments' control={control} label='Comment:' /> 
        </Col>  
      </Row>
      <div className='mt-3'>
      {loading ?<button className='custom-btn' disabled type="submit"> <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></button>: 
      <button className='custom-btn' type="submit">Update</button>
       }
      </div>
      </form>
      </div>
  )
}

export default Edit