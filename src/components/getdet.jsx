import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Button, Heading, Text } from '@chakra-ui/react'
import good from './images/good.svg'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Input, Stack  } from "@chakra-ui/react"


const Loydet=()=> {
  const [error, setError] = useState('');
    const [tock, setTock] = useState('');
    
  const modal3 = useDisclosure()
  
  
    const navigate = useNavigate('')
    const location = useLocation()
 const ite= location.state.data 

 let tok= JSON.parse(localStorage.getItem("user-info"));
 let refresh = tok.refresh_token

 async function closeLoy(){
  let item ={refresh}
      let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(item)
      });
    
      rep = await rep.json();
      let bab = rep.access_token
        let resut = await fetch (`https://api.prestigedelta.com/loyalty/${ite.id}/`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json',
              'Authorization': `Bearer ${bab}`
         },
         
        });
          back()   
}
 const back =()=>{
  navigate('/components/getloy')
 }
console.log(ite.id)
//  const send =()=>{
//   const data = ite
//   navigate('/components/customanalytics', {state:{data}})
//  }
 
 
    return(
        <div style={{padding:'5%'}}>
        <ChakraProvider>
        <Link to='/components/getloy'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
            <Heading fontSize='16px'>{ite.name}</Heading>
            <div className='clup'>
          <div className='clu'>
            <p className='clund'>Cashback Ratio</p>
            <Heading fontSize='14px' className='clun'>{ite.cash_back_ratio * 100}%</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Minimium Amount </p>
            <Heading fontSize='14px' className='clun'> ₦{(parseInt(ite.min_value)).toLocaleString('en-US')}</Heading>
          </div>
        </div>
        <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Minimium Number of Purchased Items</p>
            <Heading fontSize='14px' className='clun'>{ite.min_volume}</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Paid </p>
            <Heading fontSize='14px' className='clun'> ₦{(parseInt(ite.paid)).toLocaleString('en-US')}</Heading>
          </div>
         </div>
         <div className='clup'>
          <div className='dlu'>
            <p className='clund'>Duration</p>
            <Heading fontSize='14px' className='clun'>{ite.duration_days} Days</Heading>
          </div>
          <div className='dlu'>
            <p className='clund'>Amount Due</p>
            <Heading fontSize='14px' className='clun'>₦{(parseInt(ite.due)).toLocaleString('en-US')}</Heading>
          </div>
         </div>
         <div className='loy2'>
         
          <div className='dlu'>
            <p className='clund'>No of Customers</p>
            <Heading fontSize='14px' className='clun'>{ite.customer_count}</Heading>
          </div>
         </div>
                  <div className='clup'>
              <p className='svin'>Creation Date: {(new Date(ite.created)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
              <p className='svin'>Expiration Date: {(new Date(ite.expires)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
          </div>
          <Button colorScheme='red' variant='solid' onClick={modal3.onOpen}>Delete</Button>
          <Modal isOpen={modal3.isOpen} onClose={modal3.onClose}>
      <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Close {ite.name} Program</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
    
    {tock === '' ? (
      <div>
         <Heading fontSize='16px'>Are you sure you want to close this Loyalty Program?</Heading>
        <div  className="">
      <Stack direction='row' spacing={1} m={2} justify='center' align='center' gap='20%'>
          <Button colorScheme="red" onClick={closeLoy}>Yes </Button>
          <Button colorScheme="blue" onClick={modal3.onClose}>No </Button>
          </Stack> </div>
        
        {error ? <p>{error}</p> : null}
      </div>) :
      <div>
          <i class="fa-solid fa-x tx" onClick={back}></i>
          <img className="goo" src={good} alt="" />
          <Heading fontSize='14px'>Loyalty Program Closed Successfully</Heading>  
      </div>}
      </ModalBody>
              </ModalContent>
        </Modal>
        
</ChakraProvider>
        </div>
    )
}
export default Loydet