import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Button, Heading, Text } from '@chakra-ui/react'

const Loydet=()=> {
  
  const navigate = useNavigate('')
    const location = useLocation()
 const ite= location.state.data 

 let tok= JSON.parse(localStorage.getItem("user-info"));
 let refresh = tok.refresh_token

console.log(ite.id)
//  const send =()=>{
//   const data = ite
//   navigate('/components/customanalytics', {state:{data}})
//  }
 
 
    return(
        <div>
        <ChakraProvider>
        <Link to='/components/getloy'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
            <Heading fontSize='16px'>{ite.name}</Heading>
            <div className='clup'>
          <div className='clu'>
            <p className='clund'>Cashback Ratio</p>
            <Heading fontSize='14px' className='clun'>{ite.cash_back_ratio * 100}%</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Minimium Amount </p>
            <Heading fontSize='14px' className='clun'> ₦{(parseInt(ite.min_value)).toLocaleString('en-US')}</Heading>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Minimium Number of Purchased Items</p>
            <Heading fontSize='14px' className='clun'>{ite.min_volume}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Paid </p>
            <Heading fontSize='14px' className='clun'> ₦{(parseInt(ite.paid)).toLocaleString('en-US')}</Heading>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Duration</p>
            <Heading fontSize='14px' className='clun'>{ite.duration_days} Days</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Due</p>
            <Heading fontSize='14px' className='clun'>₦{(parseInt(ite.due)).toLocaleString('en-US')}</Heading>
          </div>
         </div>
         <div className='loy2'>
         
          <div className='dlu'>
            <p className='clund'>No of Customers</p>
            <Heading fontSize='14px' className='clun'>{ite.customer_count}</Heading>
          </div>
         </div>
                  <div className='clup'>
              <p className='svin'>Creation Date: {(new Date(ite.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p className='svin'>Expiration Date: {(new Date(ite.expires)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          </div>
                  
</ChakraProvider>
        </div>
    )
}
export default Loydet