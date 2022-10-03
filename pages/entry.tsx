import React,{useState,useEffect} from 'react'
import EntryCom from '../components/layout/entrypage/EntryCom';
import Loader from '../components/shared/Loader';

type Props = {}
const entry = (props: Props) => {
const [loading, setLoading] = useState(true);
  
useEffect(() => {
 setTimeout(() => setLoading(false), 1000)
}, [])
  
  
const renderData = () => {
if (loading != false) {
return (
<div className="ld text-center mt-5">
<Loader/>
</div>
);
}
return (   
<div className='login-page-div'>
<EntryCom/>
</div>
)
}
return renderData();
 }
  

export default entry