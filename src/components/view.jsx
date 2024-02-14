import { useState } from "react"
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import { Card,CardHeader, Heading, Input, Button, Text } from '@chakra-ui/react'

const View=()=>{
  const location = useLocation()
    const dit =location.state.data
    
    const [list, setList] = useState('');
    const [info, setInfo] = useState('');
    
    
    return(
        <div>
        <ChakraProvider>
        <Link to='/components/loyalty'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <Heading fontSize='18px' > Program Details</Heading>
            
                {dit.map((obj, index) => (
                  <Card key={index} align='center'>
                  <CardHeader fontSize='18px' m={0}>{obj.program_name}</CardHeader>
                  <div className='clup' >
          <div className='clu'>
            <p className='clund'>Merchant</p>
            <Heading fontSize='14px' className='clun'>{obj.business_name}</Heading>
          </div>
          <div className='clu'>
            <p className='clund'>Total Amount Spent</p>
            <Heading fontSize='14px' className='clun'> ₦{(obj.transaction_amount).toLocaleString('en-US')}</Heading>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Claimed</p>
            <Heading fontSize='14px' className='clun'>{JSON.stringify(obj.claimed)}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Claimed Time</p>
            <Heading fontSize='14px' className='clun'> {obj.claim_time}</Heading>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Transaction Time</p>
            <Heading fontSize='14px' className='clun'>{(new Date(obj.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Expires on</p>
            <Heading fontSize='14px' className='clun'>{(new Date(dit.expires)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Heading>
          </div>
         </div>
        <div>
           </div>
                  </Card>

                   ))}

            
        </ChakraProvider>
             
        </div>
    )
}
export default View



