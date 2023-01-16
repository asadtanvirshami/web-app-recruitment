import React,{useEffect,useState} from 'react'

export const Comments = ({data}) => {

    useEffect(() => {
        console.log('data',data)
    }, [data])

    return (<>{data.comments}</>)
}
export default Comments