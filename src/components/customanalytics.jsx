import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'

const CustAnalytics =()=>{
    const [list, setList] = useState('')
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate('')
      const location = useLocation()
   const ite= location.state.data 

   let tok= JSON.parse(localStorage.getItem("user-info"));
   let refresh = tok.refresh_token

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
        const sentences =(list.message_value).split('\n')

    return(
        <div>
            <ChakraProvider>
            <Link to='/components/customer'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <Card p={2} m={2}>
<Heading fontSize='14px'>Customer Analysis for {ite.customer_name}</Heading>
{sentences.map((sentence, index) => (
      <p key={index}>{sentence}</p>
    ))}<br/>
<Text>Have a question? </Text>
<div>
<Button colorScheme='blue' variant='solid' onClick={send}>Start Conversation</Button>
</div>
</Card>
            </ChakraProvider>
        </div>
    )

}
export default CustAnalytics