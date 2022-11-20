import React,{useEffect,useState} from 'react'
import{List} from '../Interface/ListInterface'

export const Comments = ({data}:any) => {

    useEffect(() => {
        console.log('data',data)
    }, [data])

    return (<>{data.comments}</>)
}
export default Comments