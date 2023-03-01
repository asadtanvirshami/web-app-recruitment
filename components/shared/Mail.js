import React,{useState,useMemo,useEffect} from 'react'
import moment from 'moment';
import axios from 'axios';
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

import{Row,Col,Form,Spinner} from 'react-bootstrap'
import {Divider, Space, notification } from 'antd';
import Cookies from 'js-cookie';

const Context = React.createContext({
  name: 'Default',
});

const Mail = ({isCheck,listArr}) => {

  const [subject, setSubject] = useState('')
  const [nameOfSender, setNameOfSender] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  const [api, contextHolder] = notification.useNotification();
  const userId = Cookies.get("id")
  const userEmail = Cookies.get("email")

  const SendEmail=(e)=>{
    e.preventDefault();
    setLoading(true)
    const tempStateIsCheck = [...isCheck]
    const tempStateList = [...listArr]
    let tempData = []
    tempStateIsCheck.forEach((x,indexone)=>{
      tempStateList.forEach((y,index)=>{
        if(x === y.id){
         tempData.push({
          id:y.id,
          email:y.email,
          txt_body:body,
          subject:subject,
          emailSentBy:userEmail,
          sender:nameOfSender,
          userId:userId,
          sent_date:moment().format('MMMM Do YYYY'),
          sent_day:moment().format('dddd')
         })
      }})
    })
    axios.post(process.env.NEXT_PUBLIC_FP_SEND_MAIL ,tempData).then((r)=>{
      if(r.status===200){
        openNotification('topRight')
      }
    })
    setLoading(false)
}

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

    const modules = {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
      ],
      clipboard: {
        matchVisual: false,
      },
    };

    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "link",
      "image",
      "video",
    ];

    const onChange = (value) => {
      setBody(value);
    };

  return (
    <>
    <div className=''>
      <div className='entry-form-div mt-4'>
      <Form onSubmit={SendEmail}>
      <div className='login-heading-div'><h4 className='mb-4'>Mail</h4></div>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>Name of Sender:</Form.Label>
        <Form.Control type="text" required placeholder="John Doe" onChange={(e) =>{setNameOfSender(e.target.value)}}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label>From Email:</Form.Label>
        <Form.Control type="text" defaultValue={userEmail} required placeholder="info@invisorsoft.com" onChange={(e) =>{setEmail(e.target.value)}}/>
        </Form.Group>
      </Row>
        <Form.Group as={Col} md={12} controlId="formGridEmail">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" required placeholder="Subject" onChange={(e) =>{setSubject(e.target.value)}}/>
        </Form.Group>
      <Row>
        <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Compose</Form.Label>
        <div style={{height:300}}>
        <ReactQuill
        style={{height:230}}
              theme="snow"
              value={body}
              onChange={onChange}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
        </div>    
      </Form.Group>
      </Row>
      {loading?
      <button type='submit' className='custom-btn mx-1'>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        </button>
        :
        <button type='submit' className='custom-btn mx-1'>Send</button>}
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
