import React from 'react'
import {Spinner} from 'react-bootstrap'

type Props = {

}

function Loader({}: Props) {
  return (
    <div>
    <div className="text-center" style={{position:"relative",top:"35vh"}}>
        <Spinner animation="border" style={{height:"50px", width:"50px"}} />
        <div className="mt-2">Loading...</div>
      </div>
    </div>
    
  )
}

export default Loader