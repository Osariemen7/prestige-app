import { useState, useEffect } from "react"
import { Helmet } from "react-helmet";
import Select from 'react-select';
import { Link, useNavigate } from "react-router-dom"
import { ChakraProvider, InputGroup } from '@chakra-ui/react';
import { Input, InputRightElement, Button, Heading, Text } from '@chakra-ui/react'
import { NotifyPop } from "../firebase"; 

const Enter =()=>{
const [info, setInfo] = useState([])
const [loading, setLoading] = useState(true)
const [nuban, setNuban] = useState('')
const [selectedOption, setSelectedOption] = useState(null)
const [users, setUsers] = useState('')
const [messag, setMessag] = useState('')
    
const navigate = useNavigate()


const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };


const handleNuban =(evnt)=>{
        
    setNuban(evnt.target.value);
}
console.log(info)
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
  let response = await fetch("https://api.prestigedelta.com/getbanklist/",{
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
      fetchDa()
    }, [])
    const options = info.map((item) => ({
        label: item.bank_name,
        value: item.bank_code,
      }));
      const teams = (selectedOption) => {
        let ref;
  
          if ( selectedOption === null || typeof selectedOption === 'undefined') {
             ref = 10;
              }
               else {
             ref= selectedOption.value;
           }
            return ref}
         let bank_code = teams(selectedOption)
  
async function ema(e) {
      e.preventDefault();
      
      let bank_code=selectedOption.value
        console.warn(bank_code, nuban)
        let item = { bank_code, nuban};
        let result = await fetch ('https://api.prestigedelta.com/dj-rest-auth/login/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json',
          
         },
         body:JSON.stringify(item)
        });
      
        if (result.status !== 200) {
          setMessag(JSON.stringify(result));
        } else {
          result = await result.json();
     
        navigate('/components/setup')
        }
      }
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
      let response = await fetch(`https://api.prestigedelta.com/banktransfer/?bank_code=${bank_code}&nuban=${nuban}`,{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      response = await response.json()
      localStorage.setItem('user-info', JSON.stringify(tok))
    //   if (data.code === 'token_not_valid'){
    //     navigate('/components/token')
    //   } else {
     setUsers(response)
     
      }
    
    useEffect(() => {
    if (selectedOption !== '' && nuban.length=== 10) {
      fetchData();
    }
  }, [selectedOption, nuban]);
  
  if(loading) {
    return(
    <p>Loading...</p>)
  }
    return(
        <div>
         <Helmet>
            <title>Set up Page</title>
            
        </Helmet>
         <ChakraProvider>
         <Link to='/components/register'>
      <i className="fa-solid fa-chevron-left bac"></i>
    </Link>
      <NotifyPop />
         <Heading textAlign='left' ml='50px' fontSize='20px' mt='68px' color='blue'>Set up your Account</Heading>
            <Text textAlign='left' ml='50px' fontSize='14px'>Fill in your details to claim reward!</Text>
          <br/>
          
          
      <Select
      onChange={handleBank}
      className="lne"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/>
          <Input
          size='md'
          width={273} ml='18px'
            type="number"
            placeholder="Account Number"
            onChange={handleNuban}
          /><br/><br/>
          <div >{users ? <div><p className="me">{users.account_name}</p><br/></div> : null}</div>
<br/>              
          <Button colorScheme="blue" variant='solid' ml='' width={273} onClick={ema}>Next</Button>
          
          </ChakraProvider>
        </div>
    )
}
export default Enter