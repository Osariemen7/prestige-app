import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'

const Cusdet=()=> {
  const [list, setList] = useState('')
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate('')
    const location = useLocation()
 const ite= location.state.data 

 let tok= JSON.parse(localStorage.getItem("user-info"));
 let refresh = tok.refresh_token

console.log(ite.id)
 const fetchData = async () => {
  let item ={refresh}
  let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        'accept' : 'application/json'
   },
   body:JSON.stringify(item)
  });
  
  rep = await rep.json();
  let bab = rep.access_token
let response = await fetch(`https://api.prestigedelta.com/customerreport/${ite.id}/`,{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
//localStorage.setItem('user-info', JSON.stringify(tok))

if (response.status === 401) {
  navigate('/components/login');
} else { 
 
response = await response.json();
setLoading(false)
setList(response)
  }}
  useEffect(() => {
    fetchData()
  }, [])

  const send =()=>{
    let data = list
    navigate('/components/chat', {state:{data}})
  }
  console.log(list)

  if(loading) {
          return(
          <p>Loading...</p>)} 
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
        
          <Card p={2} m={2}>
<Heading fontSize='14px'>Customer Analytics</Heading>
<Text>{list.message_value}</Text><br/>
<Text>Have a question? </Text>
<div>
<Button colorScheme='blue' variant='solid' onClick={send}>Start Conversation</Button>
</div>
</Card>
</ChakraProvider>
        </div>
    )
}
export default Cusdet