import React, { useState, useEffect } from 'react';
import add from './images/bud.svg'
import pic from './images/v.svg';
import good from './images/good.svg'
import { Link, useNavigate } from 'react-router-dom';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { Nav } from './nav.jsx'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Input, Button  } from "@chakra-ui/react"


const Savings = () =>{
    const [total, setTotal] = useState([]);
    const [budget, setBudget] = useState('');
    const [nam, setNam] = useState('')
    const [message, setMessage] = useState('')
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [fun, setFun] = useState('')
    const [loading, setLoading]= useState(true)
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState('')
    const [buttonVisible, setButtonVisible] = useState(true);

    const showSidebar = () => setSidebar(!sidebar)
    let tok= JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
       let refreshval;

  if ( tok === null || typeof tok === "undefined" ) {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)

   
    // const openModal = () => {
    //   setIsOpen(true);
    // };
    const closeModal = () => {
         onClose();
      fetchDa()
    };
    const handleInputChange = (event) => {
      setBudget(event.target.value);
    };
    const handleName =(event) => {
      setNam(event.target.value)
    }

    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 20000);
    };  
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
    let response = await fetch("https://api.prestigedelta.com/subaccount/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
    setLoading(false)
    setTotal(response)
      }}
      useEffect(() => {
        fetchDa()
      }, [])
    async function fproj(e) {
      e.preventDefault();
      handleClick()
       let items ={refresh}
        let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(items)
        });
        rep = await rep.json();
        let bab = rep.access_token 
        let account_type = 'EXPENSE'
        let name = nam.toUpperCase()
        console.warn(name, budget, account_type)
        let item = {name, budget, account_type};
      
    
      try {
        let result = await fetch('https://api.prestigedelta.com/createsubaccount/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
    
        if (result.status === 400) {
          const errorResult = await result.json();
          setMessage(JSON.stringify(errorResult.message));
        } else {
           result =await result.json();
           setFun(JSON.stringify(result))
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    ;
    }
    const operate = (index) => {
      const data = total[index];
      if (data.name === 'OPERATIONAL EXPENSE') {
        navigate('/components/save', { state: { data } });
      } else {
        navigate('/components/detail', { state: { data } });
      }
    };
    const show=(index)=>{
      const data = total[index]
       navigate('/components/detail', {state:{data}})
    }
    console.log(total)
    if(loading) {
      return(
      <p>Loading...</p>)} 

    return(
        <div>
        <Nav />
            <ChakraProvider>
           <Heading size='md' className='saed'>Budget</Heading></ChakraProvider>
           <div className='svin'>
              <p>Create sub-account and manage your cash flow</p>
              <img className=''  src={pic} alt='' onClick={onOpen}/>
           </div>
           
           {total.map((obj, index) => (
  <div key={index} className='spt' onClick={() => operate(index)}>
    <div className='bfle'>
      <img src={add} alt='' className='wad' />
      <span>{obj.name}</span>
    </div>
    {obj.budget !== 0 ? (
      <div>
        <div className='asx'>
          <p className='clun' key={index}>
            {Math.round(((parseInt(obj.spent) / parseInt(obj.budget)) * 100 + Number.EPSILON) * 100) / 100}%
          </p>
          <p className='clun'>₦{obj.balance.available_balance.toLocaleString('en-US')}</p>
        </div>
        <div className="progress-b" style={{ width: '100%' }}>
          <div className="progress-bi" style={{ width:`${Math.min(((parseInt(obj.spent) / parseInt(obj.budget)) * 100), 100)}%` }}>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <div className='bfle'>
          <p className='clun' key={index}>0%</p>
          <p className='clun'>₦{obj.balance.available_balance.toLocaleString('en-US')}</p>
        </div>
        <div className="progress-b" style={{ width: '100%' }}>
          <div className="progress-bi" style={{ width: '0%' }}>
          </div>
        </div>
      </div>
    )}
  </div>
))}
<ChakraProvider>
<Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
          
            <ModalHeader>Create Sub-Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
      {fun === '' ? (
      <div>
      
  
      
            <Input type='text' placeholder='Name of Category' width={273} ml={9} onChange={handleName}/><br />
       <br/> <Input type="number" width={273} ml={9} onChange={handleInputChange}  placeholder='Enter Monthly Budget Amount'/><br />
               <br/> {message ? <p>{message}</p> : null} 
                {buttonVisible && (  <Button  colorScheme='blue' variant='solid' onClick={fproj}>Add</Button> 
                )}
      {!buttonVisible && <p>Processing...</p>}
            
            </div>) :
            <div>
          
          <img className='goo' src={good} alt="" />
          <Heading fontSize='14px' className="hoo">Sub-Account Successfully created!</Heading>  
      </div>}
      </ModalBody>
              </ModalContent>
      
            </Modal> </ChakraProvider>
        </div>
    )

}
export default Savings