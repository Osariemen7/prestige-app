import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import good from './images/good.svg'
import { ChakraProvider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, SimpleGrid, Box, Button, Heading, Stack,  Text } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Input, Spinner  } from "@chakra-ui/react"



const Detail = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState('');
    const [buttonVisible, setButtonVisible] = useState(true);
    const [info, setInfo] = useState([])
    const [fin, setFin] = useState('')
    const [fun, setFun] = useState('')
    const [amount, setAmount] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('');
    const [tock, setTock] = useState('');
    const [list, setList] = useState([])
    const [expense_budget, setExpense] = useState('');
    const [auto, setAuto] = useState('');
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
  
    const navigate = useNavigate()
    const location = useLocation();
     let index = location.state.data

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
let refresh = terms(tok)

  const closeModals = () => {
    modal2.onClose(); 
  };
  const close = () => {
    navigate('/components/savings')
  }

const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    modal1.onClose();
    fetchDa()
  };
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const handleAmount=(event)=> {
    setAmount(event.target.value)
  }
  const handleInputChange = (event) => {
    setExpense(event.target.value);
  };
  
  const debit = (selectedOption) => {
    let menu
    if (selectedOption.value === 'main'){
        menu = true;
    }else{
        menu = false
    }
    return menu
  }
  let debit_main = debit(selectedOption)

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
  setInfo(response)
  
    }}
    useEffect(() => {
      fetchDa()
    }, [])
  const fetchInfo = async () => {
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
  let response = await fetch(`https://api.prestigedelta.com/subtransactions/?start_date=01/31/2022&end_date=${(new Date()).toLocaleDateString('en-US')}&name=${index.name}`,{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  let result =  await fetch("https://api.prestigedelta.com/autosort/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    result = await result.json();
  if (response.status === 401) {
    navigate('/components/login');
  } else {  
  response = await response.json();}

  setList(response)
  setAuto(result)

  }
  useEffect(() => {
    fetchInfo()
    }, [])
    async function fproj(e) {
      e.preventDefault();
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
        let sub_account = index.name
        console.warn(sub_account, expense_budget, account_type)
        let item = {sub_account, expense_budget, account_type};
      
    
      try {
        let result = await fetch('https://api.prestigedelta.com/setsubbudget/', {
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
          setMessages(JSON.stringify(errorResult.message));
        } else {
           result =await result.json();
           setFin(JSON.stringify(result))
        }
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }
    ;
    }
    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 20000);
    };

  async function fsav(e) {
    handleClick()
    e.preventDefault();
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
      let receiver = index.name
      let funder = selectedOption.value
      console.warn(funder, debit_main, amount, receiver)
      let item = {funder, debit_main, amount, receiver};
    
  
    try {
      let result = await fetch('https://api.prestigedelta.com/fundsubaccount/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${bab}`
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
  
  async function dauto() {
    
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
      const love =(finfo) =>{
        let sort
      if (finfo.auto_fund === true){
        sort = false
      } else {
        sort = true
      }
      return sort
    }
      let auto_sort= love(finfo)
      let sub_account = index.name
      console.warn(auto_sort, sub_account)
      let item = {auto_sort, sub_account};
    
    try {
      let result = await fetch('https://api.prestigedelta.com/autosort/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Authorization': `Bearer ${bab}`
        },
        body: JSON.stringify(item)
      });
      result =await result.json();
        fetchDa()
    
    } catch (error) {
      // Handle fetch error
      console.error(error);
    };
  }
  
    const receipt =(index)=>{
      const ite = list[index]
      navigate('/components/Receipt', {state:{ite}} )
    }
    const finfo = info.find(inf => inf.name === index.name)
    console.log(finfo)
    async function closeProj(e){
        e.preventDefault()
        let project_name = index.name;
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
              console.warn(project_name )
              let ite ={project_name}
              let resut = await fetch (`https://api.prestigedelta.com/subaccount/${index.name}/`,{
                  method: 'DELETE',
                  headers:{
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                    'Authorization': `Bearer ${bab}`
               },
               body:JSON.stringify(ite)
              });
              if (resut.status !== 200) {
                const errorResult = await resut.json();
                setError(JSON.stringify(errorResult.message));
              } else {
                 resut =await resut.json();
                    setTock(JSON.stringify(resut))}
      }
  const options = [
    ...info.map((item) => ({
      label: item.name,
      value: item.name,
    })),
    {
      value: 'main',
      label: 'MAIN ACCOUNT',
    },
  ];
  const overdraft= ()=>{
    const data = index
       navigate('/components/overdraft', {state:{data}})
  }
  const transfer= ()=>{
    const mata = finfo
       navigate('/components/getgroup', {state:{mata}})
  }
  if(loading) {
    return(
    <p>Loading...</p>)} 

    return(
      <ChakraProvider>
        <div>
            <Link to='/components/savings'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
             <h4 className="cpn">{index.name} SUB ACCOUNT</h4>
             <div className="dash">
                <p className="dp">Balance</p>
                <Heading fontSize='25px' className="h2">₦{(finfo.balance.available_balance).toLocaleString('en-US')}</Heading> 
            <div className="act">
                 <Button  colorScheme="blue" onClick={modal1.onOpen}>Fund</Button>
                 <Button onClick={() => transfer()} colorScheme="blue">Transfers</Button>  
                <Button onClick={() => overdraft()} colorScheme='blue'>Overdraft</Button>
            </div>                
             </div>
             <Stack direction='row' justify='center' align='center' gap='20%' m='2%'>
                <p>Monthly Budget</p>
                <Heading fontSize='16px' className="sco">₦{(index.budget).toLocaleString('en-US')}</Heading>
             </Stack>
             <Stack direction='row' justify='center' align='center' gap='22%' mb='2%'>
                <p>Amount Spent</p>
                <Heading fontSize='16px' className="sco">₦{(index.spent).toLocaleString('en-US')}</Heading>
             </Stack>
             <SimpleGrid m={3} mt={1} spacing={2} templateColumns='repeat(auto-fill, minmax(100px, 2fr))'>
             <Button colorScheme="blue" onClick={modal2.onOpen}>Edit Budget</Button>  
             {finfo.auto_fund === false ?(
             <Button onClick={dauto} colorScheme="blue">Enable<br/> Auto Fund</Button>):(
              <Button onClick={dauto} colorScheme="blue">Disable<br/> Auto Fund</Button>
             )}
                       <Button colorScheme="red" onClick={modal3.onOpen} >Close<br/> Sub Account</Button>
            
             </SimpleGrid>
             <Heading fontSize='14px' className="saed">Activity</Heading>
             {list.map((obj, index) => 
             <Card m={2} backgroundColor='#F0F8FF'>
                  <div className='td' onClick={() => receipt(index)}>
                  <div className='drz'>
                        <p className="ove" key={index}>{obj.status}</p>
                       <Heading fontSize='16px' key={index}>₦{obj.amount}</Heading>
                  </div>
                  <div className='tg'>
                  <p className="tm" key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                       <div><span>Receipt </span><i class="fa-solid fa-file-export"></i></div>
                  </div>
                       <Text fontSize='14px' className='tm' key={index}>{obj.narration}</Text>
                  </div></Card>
                       )}
                       <div className="dax">
                                 </div>
    <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
      <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Fund {index.name }</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
            
      {fun === '' ? (
      <div>
      <h3 className='h4'></h3>
      <form>
        
       <Select
      onChange={handleBank}
      className="pne"
      placeholder="Transfer From"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/>
    <Input placeholder='Amount' size='md' type="number" onChange={handleAmount} width={273} ml={9}/><br/><br/>
    <br/>
                {buttonVisible && (  <Button colorScheme='blue' mr={3}  onClick={fsav}>Fund</Button> 
                )}
      {!buttonVisible && <p>Processing...</p>}
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
            </div>) :
            <div>
            <i class="fa-solid fa-x tx" onClick={closeModal}></i>
            <ModalCloseButton  />
          <img style={{marginLeft: '37%'}} src={good} alt="" />
          <Heading fontSize='14px'>Sub-Account Successfully Funded!</Heading>  
      </div>}

            </ModalBody>
              </ModalContent>
        </Modal>
    <Modal isOpen={modal3.isOpen} onClose={modal3.onClose}>
      <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Close {index.name } Sub-Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
    
    {tock === '' ? (
      <div>
         <Heading fontSize='16px'>Are you sure you want to close this Sub Account?</Heading>
        <div  className="">
      <Stack direction='row' spacing={1} m={2} justify='center' align='center' gap='20%'>
          <Button colorScheme="red" onClick={closeProj}>Yes </Button>
          <Button colorScheme="blue" onClick={modal3.onClose}>No </Button>
          </Stack> </div>
        <p>Funds will be transfered into main account</p>
        {error ? <p>{error}</p> : null}
      </div>) :
      <div>
          <i class="fa-solid fa-x tx" onClick={close}></i>
          <img className="goo" src={good} alt="" />
          <Heading fontSize='14px'>Sub account Closed Successfully</Heading>  
      </div>}
      </ModalBody>
              </ModalContent>
        </Modal>

<Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
  
          <ModalHeader>Set Monthly Budget for {index.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody> 
      {fin === '' ? (
      <div>
      <h4 className='h4'></h4>
      <form>
      <Input placeholder='Amount' size='md' type="number" onChange={handleInputChange} width={273} ml={9}/><br/><br/>
     
        <br />
                {messages ? <p>{messages}</p> : null} 
                <Button colorScheme='blue' onClick={fproj}>Save</Button>
            </form>
            </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModals}></i>
          <img style={{marginLeft:'38%'}} src={good} alt="" />
          <Heading fontSize='14px' textAlign='center'>Sub Account Updated!</Heading>  
      </div>}
            
            </ModalBody>
              </ModalContent>
        </Modal>
        </div>
        </ChakraProvider>
    )
}

export default Detail