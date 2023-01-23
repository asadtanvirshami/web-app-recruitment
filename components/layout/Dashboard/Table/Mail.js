import React,{useState,useMemo} from 'react'
import moment from 'moment';
import axios from 'axios';

import{Row,Col,Form,Button} from 'react-bootstrap'
import {Divider, notification, Space } from 'antd';

const Context = React.createContext({
  name: 'Default',
});

const Mail = ({isCheck,List}) => {

  const [subject, setSubject] = useState('')
  const [nameOfSender, setNameOfSender] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')

  const SendEmail=(e)=>{
    e.preventDefault();
    const tempStateIsCheck = [...isCheck]
    const tempStateList = [...List]
    tempStateIsCheck.forEach((x,indexone)=>{
      tempStateList.forEach((y,index)=>{
        if(x === y.id){
          console.log(body)
          // axios.post(process.env.NEXT_PUBLIC_FP_SEND_MAIL ,{
          //   id:y.id,
          //   email:y.email,
          //   firstname:y.firstname,
          //   lastname:y.lastname,
          //   region:y.region,
          //   field:y.field,
          //   txt_body:body,
          //   subject:subject,
          //   emailSentBy:email,
          //   sender:nameOfSender,
          //   sent_date:moment().format('MMMM Do YYYY'),
          //   sent_day:moment().format('dddd')
          // })
          openNotification('topRight')
    }})})}

    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.info({
        message: `Notification`,
        description: <Context.Consumer>{({ name }) => 'Your email has been sent!'}</Context.Consumer>,
        placement,
      });
    };
    const contextValue = useMemo(
      () => ({
        name: 'Ant Design',
      }),
      [],
    );

  return (
    <>
    <div className=''>
      <div className='entry-form-div mt-4'>
      <Form className='' onSubmit={SendEmail}>
      <div className='login-heading-div'><h4 className='mb-4'>Mail</h4></div>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Sender:</Form.Label>
        <Form.Control type="text" required placeholder="John Doe" onChange={(e) =>{setNameOfSender(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" required placeholder="invisorsoft@gmail.com" onChange={(e) =>{setEmail(e.target.value)}}/>
        </Form.Group>
      </Row>
        <Form.Group as={Col} md={12} controlId="formGridEmail">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" required placeholder="Subject" onChange={(e) =>{setSubject(e.target.value)}}/>
        </Form.Group>

      <Row>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Comments</Form.Label>
        <Form.Control onChange={(e)=>{setBody(e.target.value)}} as="textarea" rows={3} />
      </Form.Group>
      </Row>
      <Button type='submit'>Send</Button>
    </Form>
    </div>
    </div>

    <Context.Provider value={contextValue}>
        {contextHolder}
        <Space>
        </Space>
        <Divider />
      </Context.Provider>
    </>
  )
}

export default Mail