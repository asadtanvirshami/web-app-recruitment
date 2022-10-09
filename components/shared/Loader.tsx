import React from 'react'
import {Spinner} from 'react-bootstrap'

type Props = {

}

function Loader({}: Props) {
  return (
    <div>
    <div className="text-center" style={{position:"relative",top:"350px", alignSelf:"center", justifyContent:"center"}}>
    <Spinner animation="border" style={{height:"50px", width:"50px"}} />
    </div>
</div>
    
  )
}

export default Loader