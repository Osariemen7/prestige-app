import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'

const Cusdet=()=> {
  
  const navigate = useNavigate('')
    const location = useLocation()
 const ite= location.state.data 

 let tok= JSON.parse(localStorage.getItem("user-info"));
 let refresh = tok.refresh_token

console.log(ite.id)
 const send =()=>{
  const data = ite
  navigate('/components/cusdet', {state:{data}})
 }
 
 
    return(
        <div>
        <ChakraProvider>
        <Link to='/components/customer'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <Heading fontSize='18px' className='saed'>Customer Details</Heading>
            <Heading fontSize='16px'>{ite.customer_name}</Heading>
            <div className='clup'>
          <div className='clu'>
            <p className='clund'>Number of Transactions</p>
            <Heading fontSize='14px' className='clun'>{ite.total_volume}</Heading>
          </div>
          <div className='clu'>
            <p className='clund'>Total Amount Spent</p>
            <Heading fontSize='14px' className='clun'> ₦{(ite.total_value).toLocaleString('en-US')}</Heading>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>No of purchase in the last 30 days</p>
            <Heading fontSize='14px' className='clun'>{ite.last_30_volume}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Spent in the last 30 days</p>
            <Heading fontSize='14px' className='clun'> ₦{(ite.last_30_value).toLocaleString('en-US')}</Heading>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Customer's Ranking</p>
            <Heading fontSize='14px' className='clun'>{ite.ranking}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Customer's Category</p>
            <Heading fontSize='14px' className='clun'>{ite.category}</Heading>
          </div>
         </div>
                  
          <div className='clup'>
              <p className='svin'>First Transaction: {(new Date(ite.first_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p className='svin'>Last Transaction: {(new Date(ite.last_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          </div>
        <div>
          <Button colorScheme='blue' variant='solid' onClick={send}>Get Customer Report</Button>
        </div>
          
</ChakraProvider>
        </div>
    )
}
export default Cusdet