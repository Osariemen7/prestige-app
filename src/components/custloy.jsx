import { useState } from "react"
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom"
import { ChakraProvider} from '@chakra-ui/react';
import { Input, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
 
const CreateLoyalty =()=>{
const [messag, setMessag] = useState('')
const [duration_days, setPassword] = useState("");
const [name, setname] = useState('');
const [cashback, setCashback] = useState('')
const [min_volume, setMin] =useState('')
const [min_value, setVal] =useState('')
    
const navigate = useNavigate()

let tok= JSON.parse(localStorage.getItem("user-info"));
    let refresh = tok.refresh_token
    
const handleUsernameChange =(evnt) => {

  setname(evnt.target.value);
}
const handleMin =(evnt) => {

    setMin(evnt.target.value);
  }
  const handleVal =(evnt) => {

    setVal(evnt.target.value);
  }
const handleCash =(evnt) => {

    setCashback(evnt.target.value);
  }
const handlePasswordChange =(evnt)=>{
  
  setPassword(evnt.target.value);
}
     
async function ema(e) {
      e.preventDefault();
      let ite ={refresh}
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
        let cash_back_ratio = cashback/100
        console.warn( name, min_value, min_volume, duration_days, cash_back_ratio)
        let item = { min_volume, min_value, duration_days, cash_back_ratio, name };
        let result = await fetch ('https://api.prestigedelta.com/loyalty/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json',
              'Authorization': `Bearer ${bab}`
         },
         body:JSON.stringify(item)
        });
      
        if (result.status !== 200) {
          setMessag(JSON.stringify(result));
        } else {
          result = await result.json();
     
        navigate('/components/getloy')
        }
      }
      
  
    return(
        <div>
         <Helmet>
            <title>Reward Page</title>
            
        </Helmet>
         <ChakraProvider>
         <Link to='/components/customer'>
      <i className="fa-solid fa-chevron-left bac"></i>
    </Link>
    
         <Heading textAlign='left' ml='50px' fontSize='22px' mt='1px' color='#4682B4'>Set up Loyalty program</Heading>
            <Text textAlign='left' ml='50px' fontSize='14px'>To be eligible for the loyalty program, customers need to fulfill the specified purchase criteria within the set duration.</Text>
          <br/>
          <Text ml='50px' textAlign='left'>Name of Loyalty Program</Text>
          <Input
          size='md'
          width={273} ml='1px'
            type="text"
            placeholder="Enter Name"
            onChange={handleUsernameChange}
          /><br/><br/>
          <Text ml='50px' textAlign='left'>Minimium Purchase Amount</Text>
          <Input
          size='md'
          width={273} ml='8px'
            type="number"
            placeholder="Amount"
            onChange={handleVal}
          /><br/><br/>
        <Text>Minimium number of Items Purchased</Text>
          
          <Input
          size='md'
            type='number'
            width={273}  ml='8px'
            placeholder="Enter Number"
            onChange={handleMin}
          />
           <br/> <br/>
           <Text textAlign='left' ml='50px'>Percentage cashback to be received</Text>
          
           <Input
          size='md'
          width={273}  ml='8px'
            type='text'
            placeholder="Enter Number"
            onChange={handleCash}
          />
           <br/> <br/>
           <Text ml='50px' textAlign='left'>Duration(Number of Days)</Text>
          
          <Input
          size='md'
            type='number'
            width={273}  ml='8px'
            placeholder="E.g 30"
            onChange={handlePasswordChange}
          />
           <br/> <br/>
        
   
    <div className="message">{messag ? <p>{messag}</p> : null}</div>
        <br/>           
          <Button colorScheme="blue" variant='solid' ml='' width={273} onClick={ema}>Create</Button>
          
          </ChakraProvider>
        </div>
    )
}
export default CreateLoyalty