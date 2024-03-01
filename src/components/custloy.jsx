import { useState } from "react"
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom"
import { ChakraProvider} from '@chakra-ui/react';
import { Input, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
import { BootstrapButton, ValidationTextField } from "./material";
import { Typography } from "@mui/material";
 
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
    
         <Heading textAlign='left' ml='5%' fontSize='22px' mt='1px' color='#4682B4'>Set up Loyalty program</Heading>
            <Text textAlign='left' ml='5%' fontSize='14px'>To be eligible for the loyalty program, customers need to fulfill the specified purchase criteria within the set duration.</Text>
          
            </ChakraProvider>
          <br/>
          <ValidationTextField
  onChange={handleUsernameChange}
label="Loyalty Program Name"
type='text'
required
variant="outlined"
id="validation-outlined-input"
/>  
         <br/><br/>
          <ValidationTextField
  onChange={handleVal}
label="Minimium Purchase Amount"
type='number'
required
variant="outlined"
id="validation-outlined-input"
/>  
         <br/><br/>

<ValidationTextField
  onChange={handleMin}
label="Minimium number of store visit"
type='number'
required
variant="outlined"
id="validation-outlined-input"
/>  
          
           <br/> <br/>
           <Typography textAlign='left' marginLeft='7%' marginBottom='2%'>Duration(Number of Days)</Typography>
         
          <ValidationTextField
  onChange={handlePasswordChange}
label="E.g 30"
type='number'
required
variant="outlined"
id="validation-outlined-input"
/>  
         
           <br/> <br/>
        
           <Typography textAlign='left' marginBottom='2%' marginLeft='7%'>Percentage cashback to be received</Typography>
        
           <ValidationTextField
  onChange={handleCash}
label="Enter Number"
type='number'
required
variant="outlined"
id="validation-outlined-input"
/>  
           
           <br/> <br/>

           
   
    <div className="message">{messag ? <p>{messag}</p> : null}</div>
        <br/> <ChakraProvider>          
          <Button colorScheme="blue" variant='solid' ml='' width={273} onClick={ema}>Create</Button>
          
          </ChakraProvider>
        </div>
    )
}
export default CreateLoyalty