import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, SimpleGrid, Box, Button, Heading, Stack,  Text } from '@chakra-ui/react'
import add from './images/bud.svg'
import pic from './images/v.svg';
import { useDisclosure, Input, Spinner  } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Nav } from './nav.jsx'
import good from './images/good.svg'
import { InviteApp } from './nav.jsx';




const Employee = () => {
    const [fun, setFun] = useState('')
    const [messag, setMessag] = useState('');
    const [list, setList] = useState('');
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [username, setUser] = useState('');
    const [buttonVisible, setButtonVisible] = useState(true);
    const [info, setInfo] = useState('')
    const navigate = useNavigate()
    const modal1 = useDisclosure();
    const modal2 = useDisclosure();
    const modal3 = useDisclosure();

    let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token

    const handleUser =(event)=> {
      setUser((event.target.value).replace('0', '234'))
  }
  const handleClick = () => {
    // When the button is clicked, setButtonVisible to false
    setButtonVisible(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 5000);
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
      let respon = await fetch("https://api.prestigedelta.com/referrals/",{
        method: "GET",
        headers:{'Authorization': `Bearer ${bab}`},
        })
        respon = await respon.json()
                
    let response = await fetch("https://api.prestigedelta.com/employeemanager/",{
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
    setInfo(respon)
      }}
      useEffect(() => {
        fetchData()
      }, [])
    
    async function bus(e) {
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
      let business_id = list[0].id
      let role_type = 'employee'
      
          console.warn(business_id, role_type, username)
          let item = {business_id, role_type, username};
          let result = await fetch ('https://api.prestigedelta.com/employeemanager/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json',
                'Authorization': `Bearer ${bab}`
           },
           body:JSON.stringify(item)
          });
        
          if (result.status !== 200) {
            result = await result.json()
            setMessag(JSON.stringify(result));
          } else {
            result = await result.json();
          localStorage.setItem('user-info', JSON.stringify(tok))
          setFun(JSON.stringify(result))
          }
        }

        async function employ(index, username, activate) {
          
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
        let business_id = list[0].id
        
        
            console.warn(business_id, activate, username)
            let item = {business_id, activate, username};
            let result = await fetch ('https://api.prestigedelta.com/employeemanager/',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                  'accept' : 'application/json',
                  'Authorization': `Bearer ${bab}`
             },
             body:JSON.stringify(item)
            });
          
            if (result.status !== 200) {
              result = await result.json()
              setMessag(JSON.stringify(result));
            } else {
              result = await result.json();
            localStorage.setItem('user-info', JSON.stringify(tok))
            setMessage(JSON.stringify(result))
            }
          }
        // const remove= (index)=>{
        //   const data = reverse[index]
        //   navigate('/components/eventory', {state:{data}})
        // }

console.log(list)
 if(loading) {
    return(
    <p>Loading...</p>)
  }
    return(
        <div>
        <Nav/>
        <ChakraProvider>
        <Heading fontSize='24px'>Employee Management</Heading>
        <br/>
           <Stack direction='column' m={0} spacing='1px' justifyContent='center' alignItems='center'>
           <p>Add New Employee</p>
  <img className='emp' src={pic} alt='' onClick={modal1.onOpen} />
</Stack>
<Heading fontSize='18px'>List of Employees</Heading>
{list[0].employees.map((obj, index) => (
  <div  key={index} className='spt'>
  <Heading fontSize='16px'>{obj.user}</Heading>
  <p>{(obj.username).replace('234', '0')}</p>
  <Stack direction='row' spacing={5} justify='center'>
  <InviteApp inviteCode={info[0].referral_code} numb={(obj.username).replace('234', '0')}/>
  { obj.active === true ?(<Button w='25%' colorScheme='red' onClick={() => employ(index, obj.username, false)}>Remove</Button>) :
  <Button w='25%' colorScheme='green' onClick={() => employ(index, obj.username, true)}>Activate</Button>}
  </Stack>
  </div>))}
<Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
      <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            
      {fun === '' ? (
      <div>
      
      <form>
        
    <Input placeholder='Phone No of Employee' size='md' type="number" onChange={handleUser} width={273} ml={9}/><br/><br/>
    <br/>
                {buttonVisible && (  <Button colorScheme='blue' mr={3}  onClick={bus}>Add</Button> 
                )}
      {!buttonVisible && <p>Processing...</p>}
                
                <div className="message">{messag ? <p>{messag}</p> : null}</div>
            </form>
            </div>) :
            <div>
        
          
          <img style={{marginLeft: '37%'}} src={good} alt="" />
          <Heading fontSize='14px'>Employee Profile Created!</Heading>  
      </div>}

            </ModalBody>
              </ModalContent>
        </Modal>
    
</ChakraProvider>
        </div>
    )
}
export default Employee