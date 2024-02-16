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
                  <Card key={index} align='center' margin={4} backgroundColor='skyblue'>
                  <div className='' >
        
            <br/><Heading fontSize='14px' className='clun'>Details for {obj.business_name} Loyalty Program</Heading>
          
          
            <p className=''></p>
            <Text fontSize='14px' className='clun'>Total Amount Spent: ₦{(obj.transaction_amount).toLocaleString('en-US')}</Text>
            <Text fontSize='14px' className=''>Reward:<span className="clun">₦{(obj.reward_amount).toLocaleString('en-US')}</span></Text>
        </div>
      
          <div className=''>
            <p className='clund'></p>
            <Text fontSize='14px' className='clun'>Claimed: {JSON.stringify(obj.claimed)}</Text>
        
            <p className='clund'></p>
            <Text fontSize='14px' className='clun'>Claimed Time: {(new Date(obj.claim_time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Text>
         </div>
            <p className='clund'></p>
            <Text fontSize='14px' className=''>Transaction Time:<span className="clun">{(new Date(obj.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span></Text>
          
          <div className=''>
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



