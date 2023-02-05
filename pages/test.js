import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import React,{useState,useEffect, useRef} from 'react';
import axios from 'axios';

let index = 0;

const test = () => {

  const [optionSets, setOptionSets] = useState([])
  const [name, setName] = useState(1);
  const inputRef = useRef(null);



 const handlePsot  =()=>{
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[2],
        type:'resource'
    })
    .then((r)=>{
      
      console.log(r)
    })
    
    
  }
  console.log(optionSets)
  
  const fetchBlogs = async (currentPage)=>{
    const res = await axios.get(
      process.env.NEXT_PUBLIC_FP_GET_LISTS_PAGINATE,{headers:{offset:`${currentPage}`,limit:10}}
    ).then((r)=>{
      console.log('-----<next>',r.data)
      let tempState = [...optionSets]
      r.data[0].List.forEach((x,i)=>{
        tempState.push(x)
      })
      console.log('-----<offset>',r.data[0].next)
      console.log('-----<offset>',r.data[0].previous)

       const data = tempState.slice(10, 20);
      setOptionSets(data)
    });
    

   }

   const handlePageClick =async (data) =>{ 
     let currentPage = name+1
     setName(currentPage)
     console.log(currentPage)
     const blogsFromDatabase = await fetchBlogs(currentPage)
     console.log(blogsFromDatabase)
    // blogsFromDatabase.forEach((x,index)=>{
    //   tempState.push(x)
    // })
   }

  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_FP_GET_LISTS_PAGINATE,{headers:{offset:1,limit:10}})
    .then((r)=>{
      let tempstate= []
      console.log('-----<get>',r.data)
      r.data[0].List.forEach((x,index)=>{
        tempstate.push(x)
      })
      r.data[0]
      setOptionSets(tempstate)
    })
    
    
  }, [])
  console.log(optionSets)


  return optionSets? (
   <>
   {optionSets.map((x,index)=>{return(<p>{index+1}.{x.name}</p>)})}
   <button onClick={handlePageClick}></button>
   </>
  ):(<></>)
};
export default test;