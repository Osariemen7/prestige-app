import { useState } from "react"
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react';
import { Card  ,Heading, Input, Button, Text } from '@chakra-ui/react'

const View=()=>{
  const location = useLocation()
    const dit =location.state.data
    
    const [list, setList] = useState('');
    const [info, setInfo] = useState('');
    const [num, setNum] = useState(dit.reward_amount)
    
    let tok= JSON.parse(localStorage.getItem("user-info"));
       let refresh = tok.refresh_token
    
    async function ema(e) {
      e.preventDefault(); 
      let ite={refresh}
      let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(ite)
    });
    
    rep = await rep.json();
    let bab = rep.access_token 
        console.warn( dit.id)
        let reward_id = dit.id
        let item = {reward_id};
        let result = await fetch ('https://api.prestigedelta.com/rewards/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json',
              'Authorization': `Bearer ${bab}`
         },
         body:JSON.stringify(item)
        });
      
        if (result.status !== 200) {
          setInfo(JSON.stringify(result))
          
        } else {
          result = await result.json();
          toggleHidden()
        }
      }
      const toggleHidden = (dit) => {
        // Assuming `dit` is an object with a property named `reward_amount`
        const gal = (dit && dit.reward_amount) ? dit.reward_amount.toLocaleString('en-US') : '0';
      
        // Assuming `setNum` is a state setter function
        setNum(gal);
      };
      


    return(
        <div>
        <ChakraProvider>
        <Link to='/components/customer'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <Heading fontSize='18px' className='saed'>Loyalty Program Details</Heading>
            <div className="dash">
                <h3 className="h1">{dit.program_name}</h3>
                <p className='dp'>Total Balance</p>
                <Heading size='lg' mt={0} color='#fff'>₦{num}</Heading>
                <div>
                  <Button mb={2} colorScheme='blue' onClick={ema} variant='solid' >Claim Reward</Button> 
                </div></div>
            <Heading fontSize='16px'>Program Details</Heading>
            <Card align='center'>
            <div className='clup'>
          <div className='clu'>
            <p className='clund'>Merchant</p>
            <Heading fontSize='14px' className='clun'>{dit.business_name}</Heading>
          </div>
          <div className='clu'>
            <p className='clund'>Total Amount Spent</p>
            <Heading fontSize='14px' className='clun'> ₦{(dit.transaction_amount).toLocaleString('en-US')}</Heading>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Claimed</p>
            <Heading fontSize='14px' className='clun'>{JSON.stringify(dit.claimed)}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>claimed Time</p>
            <Heading fontSize='14px' className='clun'> {dit.claim_time}</Heading>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Created On</p>
            <Heading fontSize='14px' className='clun'>{(new Date(dit.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Expires On</p>
            <Heading fontSize='14px' className='clun'>{(new Date(dit.expires)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</Heading>
          </div>
         </div>
                  
          
        <div>
           </div>
           </Card>
        </ChakraProvider>
              <Text>Hello</Text>
        </div>
    )
}
export default View



