import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, Button, Heading, Text } from '@chakra-ui/react'

const ProductAnalytics =()=>{
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    let fin = location.state.data
    let index = fin.mata

    let tok= JSON.parse(localStorage.getItem("user-info"));
   let refresh = tok.refresh_token
   const fetchDats = async () => {
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
  let response = await fetch(`https://api.prestigedelta.com/products/${parseInt(fin.info[0].id)}/?product_id=${parseInt(index.id)}`,{
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
      fetchDats()
    }, [])
  
   const send =()=>{
    let data = list
    navigate('/components/chat', {state:{data}})
  }
  if(loading) {
    return(
    <p>Loading...</p>)}
    const sentences =(list.message_value).split('\n')

    return(
        <div>
            <ChakraProvider>
            <Link to='/components/product'><i class="fa-solid fa-chevron-left bac"></i></Link>
<Card p={2} m={2} backgroundColor='#eff1fa' >
<Heading fontSize='14px'>Product Analytics</Heading>
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
export default ProductAnalytics