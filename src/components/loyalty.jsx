import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'
import { Typography, TextField, Autocomplete,Box } from '@mui/material';

const Loyalty =()=>{
    const [info, setInfo] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
const navigate = useNavigate()
const location = useLocation()
 
const ams = location.state && location.state.response;

const currentDate = new Date(); // Get the current date

const thirtyDaysBefore = new Date(); // Create a new Date object
thirtyDaysBefore.setDate(currentDate.getDate() - 60)  

    let tok= JSON.parse(localStorage.getItem("user-info"));
    const fetchDa = async () => {
      let response = await fetch(`https://api.prestigedelta.com/accountrewards/?bank_code=${tok.bank_code}&nuban=${tok.nuban}`,{
    method: "GET",
    
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
    response = await response.json();
    setLoading(false)
    setInfo(response)
      }}
    useEffect(()=>{
       fetchDa()
      },[])
      console.log(tok)
      
        
        const det=(index)=>{
            const data = info.relationships[index].rewards
             navigate('/components/view', {state:{data}})
          }
  console.log(ams) 
  if(loading){
    return( <p>Loading....</p>)
   
  }
    return(
        <div>
            <ChakraProvider>
            <Link to='/cashback'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <div className="dash">
                <h3 className="h1">Account</h3><br/>
                <Heading color='#fff' fontSize='15px'>Total Balance</Heading>
                <Heading size='lg' mt={0} color='#fff'>₦{(parseFloat(info.unclaimed_cashback)).toLocaleString('en-US')}</Heading>
              </div>
              <Text align='left' ml='8%' fontSize='13px'>When Amount gets to a certain value it will be automatically transferred to: </Text>
                <Text align='left' ml='8%' fontSize='13px'>{info.bank}</Text>
                <Text align='left' ml='8%' fontSize='13px'>{info.account_number}</Text>
              {info.relationships.map((obj, index) => (
                             <Card key={index} m={5} onClick={() => det(index)}>
                    <Heading fontSize='15px'>
                    {obj.business}
                    </Heading>
                    <Text>Total Amount Spent: {JSON.stringify(obj.total_value)}</Text>
                    <Text>Total Reward: ₦{(obj.claimed_loyalty_reward).toLocaleString('en-US')}</Text>
                    <Text color='blue'>View more details!</Text>
                </Card>
    
                 ))}

            </ChakraProvider>
        </div>
    )
}
export default Loyalty