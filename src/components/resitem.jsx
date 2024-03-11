import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardHeader, Stack, CardBody, Button, Heading, Text } from '@chakra-ui/react'
import { useDisclosure, Input,  Spinner  } from "@chakra-ui/react"
import good from './images/good.svg';
import { Box, SimpleGrid,  StackDivider} from '@chakra-ui/react'
import { Nav } from './nav.jsx'


const Item = () => {
  const [finfo, setFinfo]  = useState([])
  const [message, setMessage] = useState('')
  const [messag, setMessag] = useState('')
    const [info, setInfo] = useState('');
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState('');
    const navigate = useNavigate()
    const [buttonVisible, setButtonVisible] = useState(true);
    
    const show=(index)=>{
      const mata = info[0].products[index]
      const data = {info, mata}
       navigate('/components/restock', {state:{data}})
    }
    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 20000);
    };
    let tok= JSON.parse(localStorage.getItem("user-info"));

    const terms = (tok) => {
      let refreshval;
    
      if (tok === null || typeof tok === 'undefined') {
        refreshval = 0;
      } else {
        refreshval = tok.refresh_token;
      }
    
      return refreshval;
    };
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
    let response = await fetch("https://api.prestigedelta.com/procureproducts/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
    setLoading(false)
    setInfo(response)
    
      }}
      useEffect(() => {
        fetchData()
      }, [])
    let refresh = terms(tok)
    
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
    let response = await fetch("https://api.prestigedelta.com/products/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
   
    setFinfo(response)
      }}
  
      useEffect(() => {
        fetchDat()
      }, [])
    
  
 

    if(loading) {
        return(
        <p>Loading...</p>)} 
    
    return(
        <ChakraProvider >
        <div>
        <Nav />
           
            
        </div>
        </ChakraProvider>
    )
}
export default Item