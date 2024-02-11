import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'

const Loyalty =()=>{
    const [info, setInfo] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
const navigate = useNavigate()
const location = useLocation()
let ams = location.state.response
const currentDate = new Date(); // Get the current date

const thirtyDaysBefore = new Date(); // Create a new Date object
thirtyDaysBefore.setDate(currentDate.getDate() - 60)  

    let tok= JSON.parse(localStorage.getItem("user-info"));
       let refresh = tok.refresh_token
    
    const fetchDa = async () => {
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
      let response = await fetch(`https://api.prestigedelta.com/rewards/?start_date=${thirtyDaysBefore.toLocaleDateString('en-US')}&end_date=${(new Date()).toLocaleDateString('en-US')}`,{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } else { 
       
      response = await response.json();
      setList(response)
      setLoading(false)
        }}
        
        const det=(index)=>{
            const data = list[0].rewards[index]
             navigate('/components/view', {state:{data}})
          }
  console.log(ams) 
    return(
        <div>
            <ChakraProvider>
            <Link to='/components/login'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <div className="dash">
                <h3 className="h1">Account</h3>
                <Heading color='#fff' fontSize='15px'>Unclaimed Balance</Heading>
                <Heading size='lg' mt={0} color='#fff'>₦{(parseFloat(ams.unclaimed_cashback)).toLocaleString('en-US')}</Heading>
              </div>
              <p >When Amount gets to a certain value it will be automatically transferred to: </p>
                <p>{ams.bank}</p>
                <p>{ams.account_number}</p>
              {ams.relationships.map((obj, index) => (
                             <Card key={index} m={5} onClick={() => det(index)}>
                    <Heading fontSize='15px'>
                         {obj.program_name}
                    </Heading>
                    <Text>Merchant: {obj.business_name}</Text>
                    <Text>Claimed: {JSON.stringify(obj.claimed)}</Text>
                    
                </Card>
    
                 ))}

            </ChakraProvider>
        </div>
    )
}
export default Loyalty