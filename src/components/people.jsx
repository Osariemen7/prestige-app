import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Box, Button, Heading, Stack, SimpleGrid,  Input, Text } from '@chakra-ui/react'
 
const People=()=>{
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

   let valv = location.state.data
   let thread = valv.rata  
   let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token 
console.log(valv)

const  talk=()=>{
    navigate('/components/chat')
}
   const fetchDat = async () => {
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
  let response = await fetch(`https://api.prestigedelta.com/analystreport/?thread_id=${thread[thread.length - 1].gpt_thread_id}&category=${valv.selectedValue.value}&report=customer`,{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  response = await response.json()

//   if (data.code === 'token_not_valid'){
//     navigate('/components/token')
//   } else {
  
 setMessages(response)
 setLoading(false)
 
  }
  useEffect(() => {
    fetchDat()
  }, [])
  if(loading) {
    return(
    <p>Loading...</p>)
}  
const sentences =(messages.conversation[0].message_value).split('\n')

    return(
        <ChakraProvider backgroundColor='#eff1fa'>
        <div>
        <Link to='/components/dash'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
           <Card backgroundColor='#eff1fa' m={2} >
                 <Heading fontSize='15px'>REPORT ON {valv.selectedValue.label} CUSTOMER</Heading>
             <CardBody m={5} p={2} color=''>
             {sentences.map((sentence, index) => (
      <p key={index}>{sentence}</p>
    ))}
             </CardBody>
             <Text>Have more questions ?</Text>
             <div>
             <Button colorScheme='blue' variant='solid' onClick={talk} mt={2}>Ask Me</Button>
             </div>
           </Card>
        </div>
        </ChakraProvider>
    )
}
export default People