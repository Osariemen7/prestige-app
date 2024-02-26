import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardFooter, CardBody, SimpleGrid, Button, Heading, Text } from '@chakra-ui/react'
import { Typography, TextField, Autocomplete,Box } from '@mui/material';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure  } from "@chakra-ui/react"
import good from './images/good.svg'



const Loyalty =()=>{
    const [info, setInfo] = useState([])
    const [message, setMessage] = useState('');
    const [fun, setFun] = useState('')
    const [buttonVisible, setButtonVisible] = useState(true);
    
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const modal1 = useDisclosure()
const navigate = useNavigate()
const location = useLocation()
 
const ams = location.state && location.state.response;

const currentDate = new Date(); // Get the current date

const thirtyDaysBefore = new Date(); // Create a new Date object
thirtyDaysBefore.setDate(currentDate.getDate() - 60)  

const handleClick = () => {
  // When the button is clicked, setButtonVisible to false
  setButtonVisible(false);
  setTimeout(() => {
    setButtonVisible(true);
  }, 20000);
};

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

      const closeModal = () => {
        modal1.onClose();
        fetchDa()
      };

      async function fsav() {
        handleClick()
                  let id = info.id
        
          let item = {id};
        try {
          let result = await fetch('https://api.prestigedelta.com/accountrewards/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              
            },
            body: JSON.stringify(item)
          });
          
                if (result.status !== 200) {
            const errorResult = await result.json();
            setMessage(JSON.stringify(errorResult.message));
          } else {
             result =await result.json();
             setFun(JSON.stringify(result))   
          }
             
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
      
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
                      <Button colorScheme='blue' m={3} onClick={modal1.onOpen}>Withdraw</Button>
              </div>
              <Text align='left' ml='8%' fontSize='13px'>Minimium amount you can Withdraw is ₦1000, funds will be transferred to: </Text>
                <Text align='left' ml='8%' fontSize='13px'>{info.bank}</Text>
                <Heading align='left' ml='8%' fontSize='13px'>{info.account_number}</Heading>
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

 <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
      <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Transfer Cashback Fund </ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            
      {fun === '' ? (
      <div>
      <h3 className='h4'></h3>
      <form>
        <Heading fontSize='15px'>Are you sure you want to transfer cashback funds to your account?</Heading>
           <br/>
                {buttonVisible && (  <Button colorScheme='blue' mr={3}  onClick={fsav}>Transfer</Button> 
                )}
      {!buttonVisible && <p>Processing...</p>}
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            </div>) :
            <div>
            <i class="fa-solid fa-x tx" onClick={closeModal}></i>
            <ModalCloseButton  />
          <img style={{marginLeft: '37%'}} src={good} alt="" />
          <Heading fontSize='14px'>Fund Successfully Transferred!</Heading>  
      </div>}

            </ModalBody>
              </ModalContent>
        </Modal>
            </ChakraProvider>
        </div>
    )
}
export default Loyalty