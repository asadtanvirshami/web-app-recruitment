import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import React,{useState,useEffect, useRef} from 'react';
import { Controller } from "react-hook-form";



const AddOpt = (props) => {
    const inputRef = useRef(null);
    console.log(props)
    return(
    <>
    <Controller
      name={`${props.name}`}
      defaultValue=""
      control={props.control}
      {...props.register(`${props.name}`)}
      render={({ field }) => (
        <>
          <div>{props.label}</div>
          <Select disabled={props.disabled} style={{minWidth:200}} 
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
            }
            {...field}
            dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: '8px 0',
                    }}
                  />
                  <Space
                    style={{
                      padding: '0 8px 4px',
                    }}
                  >
                    <Input
                        name={props.name}
                    />
                    <Button type="text" icon={<PlusOutlined />} >
                      Add item
                    </Button>
                  </Space>
                    <Button type="text" icon={<PlusOutlined />} >
                      Delete item
                    </Button>
                    <Button type="text" icon={<PlusOutlined />} >
                      save item
                    </Button>
                </>
              )}
          >
            {
              props.options.map((x, index) => {
                return(
                  <Select.Option key={index} value={x}>{x}</Select.Option>
                )
              })
            }
          </Select>
        </>
      )}
    />
    </>
)}

export default AddOpt