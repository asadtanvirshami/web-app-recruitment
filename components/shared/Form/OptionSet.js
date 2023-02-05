import { Select } from "antd";
import { Controller } from "react-hook-form";

const OptionSet = (props) => {

  return (
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
  )
}

export default OptionSet