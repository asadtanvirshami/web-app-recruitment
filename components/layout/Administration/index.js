import React,{useState,useEffect} from 'react'
import Router from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

import{Row,Col,Spinner} from 'react-bootstrap'
import { SettingOutlined,CloseCircleOutlined} from '@ant-design/icons';
import { Collapse,Input,Button,Space,Modal} from 'antd';
const { Panel } = Collapse;

const AdminPanel = ({sessionData}) => {

  useEffect(() => {if(sessionData.auth != true){Router.push('/signin')}}, [])

  const [optionSets, setOptionSets] = useState([])

  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [addName, setAddName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(false)
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [modalPasswordVisible, setModalPasswordVisible] = useState(false);

  useEffect(() => {//fetching the option sets and spliting them/
  axios.get(process.env.NEXT_PUBLIC_FP_GET_OPTIONSET)
  .then((r)=>{
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
  })
  }, [])
  
  const saveItem  =({i})=>{//saving the Added item in the list of optionsets in the types table in db
    if(i==0){
    let type = 'categories'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==1){
    let type = 'cities'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==2){
    let type = 'resources'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==3){
    let type = 'sources'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==4){
    let type = 'experiences'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==5){
    let type = 'security_clearences'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
    if(i==6){
    let type = 'regions'
    setLoading(true)
    setType(type)
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_OPTIONSET,{
        name:optionSets[i],
        type:type
    })
    .then((r)=>{if(r.status===200){
      setLoading(false),
      setMessage('Added')}
      else{setMessage('Not Added')}})
   } 
  }

  const handleClick=({i})=>{//changing the email or password and sending the post req to the API
    const id = Cookies.get('id')
    if(i=='email'){
    setLoading(true)
    setType('email')
    axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_USER,{id:id,email:email,type:'email'}).then((r)=>{
      if(r.status==200){setLoading(false),setModalEmailVisible(false),Cookies.set("email",email);}
    })
    }
    if(i=='password'){
      setLoading(true)
      setType('password')
      axios.post(process.env.NEXT_PUBLIC_FP_UPDATE_USER,{id:id,password:password,type:'password'}).then((r)=>{
        console.log(r.status)
        if(r.status==200){setLoading(false),setModalPasswordVisible(false)}
      })
    }
  }

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this: 
      }}
    />
  );

  const deleteItem = ({index,i}) => {//deleting the item in the db and filtering the array
    console.log(index,i)
    let tempState = [...optionSets]
  tempState[i].splice(index,1)
   setOptionSets(tempState)
  };

  const addItem = ({i}) => {//pushing the item in the array 
    let tempState = [...optionSets]
    let tempData = [...tempState ];
    tempData[i].push(addName)
    setOptionSets(tempState)
  };
  
  return (
  <>
    <div className='global-container'>
      <div className=''>
      <Row>
        <Col xs={12} md={9}>
        <div className='pb-4 mx-3'><h3>Selection Update Panel</h3></div>
      <Row>
        <Row>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Categories" key="1" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[0].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=0})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                    <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                    {loading && type=='categories'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=0})=>{addItem({i})}}>Add</Button>} 
                    {loading && type=='categories'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                    <Button type="primary" className='mx-1' onClick={({i=0})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Cities" key="2" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[1].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=1})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                    <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                    {loading && type=='cities'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=1})=>{addItem({i})}}>Add</Button>} 
                    {loading && type=='cities'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                    <Button type="primary" className='mx-1' onClick={({i=1})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Resources" key="3" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[2].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=2})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                    <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                    {loading && type=='resources'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=2})=>{addItem({i})}}>Add</Button>} 
                    {loading && type=='resources'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                    <Button type="primary" className='mx-1' onClick={({i=2})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Sources" key="4" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[3].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=3})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                  <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                  {loading && type=='sources'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=3})=>{addItem({i})}}>Add</Button>} 
                  {loading && type=='sources'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                  <Button type="primary" className='mx-1' onClick={({i=3})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Experiences" key="5" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[4].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=4})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                  <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                  {loading && type=='experiences'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=4})=>{addItem({i})}}>Add</Button>} 
                  {loading && type=='experiences'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                  <Button type="primary" className='mx-1' onClick={({i=4})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Security Clearences" key="6" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[5].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=5})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                    <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                    {loading && type=='security_clearences'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=5})=>{addItem({i})}}>Add</Button>} 
                    {loading && type=='security_clearences'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                    <Button type="primary" className='mx-1' onClick={({i=5})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
          <Col md={4}>
            <Collapse ghost>
              <Panel header="Regions" key="7" extra={genExtra()}>
                <div div className='scroll-div'>
                    {optionSets.length>0 ? optionSets[6].map((x,index)=>{return(<><p key={index} className='options'>{index+1}. {x}
                    <CloseCircleOutlined style={{float:"right", color:'red'}} onClick={({i=6})=>{deleteItem({index,i})}}/></p></>)}):[]}
                </div>
                  <hr></hr>
                  <label className=''>Add Item</label>
                  <Space direction="vertical">
                  <Space wrap>
                  <Input placeholder='Add Item' onChange={(e)=>{setAddName(e.target.value)}}/>
                  {loading && type=='regions'?<Button disabled={true}>Add</Button>:<Button type="dashed" className='mx-1' onClick={({i=6})=>{addItem({i})}}>Add</Button>} 
                  {loading && type=='regions'?<Button><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:
                  <Button type="primary" className='mx-1' onClick={({i=6})=>{saveItem({i})}}>Save</Button>}
                  </Space>
                  </Space>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Row>
      </Col>
        <Col xs={12} md={3}>
        <div className='pb-4 mx-4'><h3>Personal Info</h3></div>
        <div className='settings'>
          <ul>
            <li onClick={()=>{setModalEmailVisible(true)}}>Change email</li>
            <li onClick={()=>{setModalPasswordVisible(true)}}>Change password</li>
          </ul>
        </div>
      </Col>
      </Row>
      <hr></hr>
    </div>
    </div>
    <Modal
        title="Enter Your Email"
        centered
        open={modalEmailVisible}
        footer={false}
        onOk={() => setModalEmailVisible(false)}
        onCancel={() => setModalEmailVisible(false)}
      >
      <div className='container'>
        <div className='mt-4 mb-4'>
        <label>Email:</label>
        <Input onChange={(e)=>{setEmail(e.target.value)}} style={{maxWidth:'100%'}}/>
        </div>
        {loading&&type=='email'?<Button className='btn-sm'><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:<Button className='btn-sm' onClick={({i='email'})=>{handleClick(({i}))}}>Save Email</Button>}
      </div>
    </Modal>
    <Modal
        title="Enter Your Password"
        centered
        open={modalPasswordVisible}
        footer={false}
        onOk={() => setModalPasswordVisible(false)}
        onCancel={() => setModalPasswordVisible(false)}
      >
      <div className='container'>
        <div className='mt-4 mb-4'>
        <label>Password:</label>
        <Input onChange={(e)=>{setPassword(e.target.value)}} style={{maxWidth:'100%'}}/>
        </div>
        {loading&&type=='password'?<Button className='btn-sm'><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/></Button>:<Button className='btn-sm' onClick={({i='password'})=>{handleClick(({i}))}}>Save password</Button>}
      </div>
    </Modal>
  </>
  )
}

export default AdminPanel