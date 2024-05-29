import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import good from './images/good.svg';
import { Card, CardHeader,AlertDialogBody, AlertDialog, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogHeader, AlertDialogContent, AlertDialogFooter,  CardBody, Box, Button, Heading, Stack, SimpleGrid,  StackDivider, Text } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure, Input,   Spinner  } from "@chakra-ui/react"
import { NotifyPop } from '../firebase';
import { Nav } from './nav.jsx'
import { Helmet } from 'react-helmet';
import { DailyRep } from './daily.jsx'

const Inventory = () => {
    const [sidebar, setSidebar] = useState('')
    const [info, setInfo] = useState('');
    const [daily, setDaily] = useState([])
    const [loading, setLoading] = useState(true)
    const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
    const [messages, setMessages] = useState('')
    const [expense_budget, setExpense] = useState('');
    const [list, setList] = useState([])
    const [buttonVisible, setButtonVisible] = useState(true);
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [fun, setFun] = useState('')
    const [amount, setAmount] = useState('')
    const [acct, setAcct] = useState([])
    const [selectedOption, setSelectedOption] = useState('')
    const [fin, setFin] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState("");
    const [time, setTime] = useState('')
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
  
    const showSidebar = () => setSidebar(!sidebar)
    const closeSidebar =()=>{
      if (sidebar === !sidebar){
        setSidebar('')
      }
    }
  const nav =()=>{
    navigate('/components/product')
  }
  
  const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  const begin =(event)=>{
    setStart(event.target.value)
  }
  const conc =(event)=>{
    setEnd(event.target.value)
  }

const range=(event)=>{
  setSearchTerm(event.target.value)
}

  const handleAmount=(event)=> {
    setAmount(event.target.value)
  }
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
  const closeModal = () => {
    onClose()
    fetchData()
    setFun('')
  };
  const handleInputChange = (event) => {
    setExpense(event.target.value);
  };
  
  const closeMode = () => {
    modal3.onClose() 
  };

  const handleClick = () => {
    // When the button is clicked, setButtonVisible to false
    setButtonVisible(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 20000);
  };

  const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 30)  


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
async function fproj() {

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
    let sub_account = info[0].sub_account.name
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
  let response = await fetch("https://api.prestigedelta.com/products/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))
  let respons = await fetch("https://api.prestigedelta.com/analytics/?duration=DAILY",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })

    let respon = await fetch("https://api.prestigedelta.com/businessprofile",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
   
  response = await response.json();
  respons = await respons.json()
  respon = await respon.json()
  setInfo(response)
  setDaily(respons)
  setName(respon)
    }}

    useEffect(() => {
      fetchData()
    }, [])
    let refresh = terms(tok)
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
setAcct(response)

  }}
  useEffect(() => {
    fetchDa()
  }, [])
const options = [
  ...acct.map((item) => ({
    label: `${item.name} 
    (₦${item.balance.available_balance})`,
    value: item.name,
  })),
  {
    value: 'main',
    label: 'MAIN ACCOUNT',
  },
];
let sub_account = tok.user.has_default_sub_accounts
const subAccount = () => {
  const redirectTo = sub_account ? '/components/savings' : '/components/reboard';
  navigate(redirectTo);
};
  console.log(tok.user.has_default_sub_accounts)  

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
    let response = await fetch(`https://api.prestigedelta.com/salestransactions/?start_date=${thirtyDaysBefore.toLocaleDateString('en-US')}&end_date=${(new Date()).toLocaleDateString('en-US')}&name=${info[0].sub_account.name}`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    
    if (response.status === 401) {
      navigate('/components/login');
    } else {  
    response = await response.json();}
    setLoading(false)
    setList(response)
    }
    useEffect(() => {
      if(info.length > 0 && typeof info[0].sub_account !== 'undefined')
      fetchInfo()
      }, [info])
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
          let receiver = info[0].sub_account.name
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
       console.log(list)
       const salesTra = async () => {
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
      let response = await fetch(`https://api.prestigedelta.com/salestransactions/?start_date=${new Date(start).toLocaleDateString('en-US')}&end_date=${(new Date(end)).toLocaleDateString('en-US')}&name=${info[0].sub_account.name}`,{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      
      if (response.status === 401) {
        navigate('/components/login');
      } else {  
      response = await response.json();}
    
      setList(response)
      }
      const receipt =(index)=>{
        const data = reverse[index]
        navigate('/components/salesverify', {state:{data}} )
      }
      const invoice = (index, inde) => {
        const data = reverse[index].sold_products[inde];
        navigate('/components/pinvoice', { state: { data } });
      };

      const overdraft= (index)=>{
        const data = reverse[index]
        navigate('/components/eventory', {state:{data}})
      }
      
      const cancelRef = useRef();
    
   console.log(info)
   
      
      if(loading) {
        return(
        <p>Loading...</p>)} 
        console.log(daily)
        let sale = daily[daily.length - 1].revenue
        let target = daily[daily.length - 1].rev_target
        const reverse = [...list.sales].reverse();
        console.log(reverse)

        
         return(
        <ChakraProvider>
        <div onClick={closeSidebar} >
        <Helmet>
            
            <title>Home</title>
            
        </Helmet>
        <Nav />
           
        <div className='dash'>
               <h3 className='h1'>{name[0].business_name}</h3>
              <p className='dp'>Today's Sale</p>
              <Heading size='xl' color='#fff'>₦{parseFloat(sale).toLocaleString('en-US')}</Heading>
              <Text fontSize='10px' color='#fff'>Today's Target: ₦{parseFloat(target).toLocaleString('en-US')}</Text>
             {list.sales_count === 0 ? (<Button onClick={modal3.onOpen} colorScheme='blue' m={3}>Record your first Sale</Button>):<Button onClick={modal3.onOpen} colorScheme='blue' m={3}>Record Sales</Button>} 
            </div>
            <NotifyPop />
<Heading fontSize='15px' textAlign='left' ml='15px'>Activity</Heading>
        <Stack direction='row' spacing={1} justify='center' align='center' >
<div>
<DailyRep />
         <Heading fontSize='12px'>Start Date</Heading>
        <Input placeholder='' defaultValue={(thirtyDaysBefore).toISOString().slice(0, 10)}  size='md' type='date' onChange={begin} width={173} ml={3}/><br/><br/>
        </div> 
        <div>
        <Heading fontSize='12px'>End Date</Heading>
        <Input placeholder='Date' size='md' defaultValue={new Date().toISOString().slice(0, 10)} type='date' onChange={conc} width={173} ml={2}/><br/><br/>
        </div></Stack> 
        <Button colorScheme='blue' variant='outline' 
         w='230px' onClick={() => salesTra()}>Filter</Button><br/><br/>
<div className='mobile-view'>
{reverse.map((obj, index) => (
  <Card m={2} backgroundColor='#F0F8FF'>
  <div className="td2" key={index} >
    <div className="tg">
    <Text mb={0} >{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
    {obj.verified !== true? (<Button colorScheme='red' onClick={() => receipt(index)} size='xs' outline='solid'>Confirm Sale</Button>): <div className='loos' onClick={() => overdraft(index)}><span>receipt </span><i className="fa-solid fa-file-export"></i></div>} </div>
  {obj.verified !== true? (<div className='loos' onClick={() => overdraft(index)}><span>invoice </span><i className="fa-solid fa-file-export"></i></div>): null}  
    {obj.sold_products.map((product, inde) => (
    <div key={inde} onClick={() => invoice(index, inde)}  >
   <div className='drz'> 
      <Text fontSize='13px'>Product:</Text>
      <Heading mt={0} fontSize='13px' className="ove">{product.product_name}</Heading>    
      </div> 
      <Stack  direction='row' ml='4%' mb={0} gap='40%' spacing={2} align='center' justify=''>
      <Text fontSize='13px'>Amount Sold:</Text>
      <Heading mt={0} fontSize='15px' className="ove">₦{(product.sold_amount).toLocaleString('en-US')}</Heading>    
      </Stack>
       
       
      </div>
))}
  </div>
</Card>))}
</div>
<div className='desktop-view'>
<div className='content'>
{reverse.map((obj, index) => (
  <Card m={2} backgroundColor='#F0F8FF'>
  <div className="td2" key={index} >
    <div className="tg">
    <Text mb={0} >{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
    {obj.verified !== true? (<Button colorScheme='red' onClick={() => receipt(index)} size='xs' outline='solid'>Confirm Sale</Button>): <div className='loos' onClick={() => overdraft(index)}><span>receipt </span><i className="fa-solid fa-file-export"></i></div>} </div>
  {obj.verified !== true? (<div className='loos' onClick={() => overdraft(index)}><span>invoice </span><i className="fa-solid fa-file-export"></i></div>): null}  
    {obj.sold_products.map((product, inde) => (
    <div key={inde} onClick={() => invoice(index, inde)}  >
   <div className='drz'> 
      <Text fontSize='13px'>Product:</Text>
      <Heading mt={0} fontSize='13px' className="ove">{product.product_name}</Heading>    
      </div> 
      <Stack  direction='row' ml='4%' mb={0} gap='40%' spacing={2} align='center' justify=''>
      <Text fontSize='13px'>Amount Sold:</Text>
      <Heading mt={0} fontSize='15px' className="ove">₦{(product.sold_amount).toLocaleString('en-US')}</Heading>    
      </Stack>
       
       
      </div>
))}
  </div>
</Card>))}
</div>
</div>
                       <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fun === '' ? ( 
          <div>
          <ModalHeader>Add Funds</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={handleBank}
      className="pne"
      placeholder="Transfer From"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/><br/>
    <Input placeholder='Amount' size='md' onChange={handleAmount} width={273} ml={9}/><br/><br/>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
          </ModalBody>

          <ModalFooter>
          {buttonVisible && (  <Button colorScheme='blue' mr={3} onClick={fsav}>
              Fund
            </Button> 
                )}
      {!buttonVisible && <p><Spinner/></p>}
            
          </ModalFooter>
          </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" className='nig' />
          <Heading size='xs' textAlign='center' m='10px'>Sub-Account Successfully Funded!</Heading>  
      </div>}
        </ModalContent>
      </Modal>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fin === '' ? ( 
          <div>
          <ModalHeader>Set Monthly Inventory Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody>     
    <Input placeholder='Set Budget Amount' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
      <div className="message">{message ? <p>{message}</p> : null}</div>
          </ModalBody>
          {messages ? <p>{messages}</p> : null}
          <ModalFooter>
          {buttonVisible && (  <Button colorScheme='blue' mr={3} onClick={fproj}>
              Update 
            </Button> 
                )}
      {!buttonVisible && <p><Spinner/></p>}
            
          </ModalFooter>
          </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={modal2.onClose}></i>
          <img src={good} alt="" className='nig' />
          <Heading size='xs' textAlign='center' m='10px'>Sub-Account Successfully Updated!</Heading>  
      </div>}
        </ModalContent>
      </Modal>
        </div>
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={modal3.onClose}
        isOpen={modal3.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Choose Payment Method</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            How are you receiving payment? 
          </AlertDialogBody>
          <Stack m={5}  spacing={9} direction='row' justify='center'>
          <Link to='/components/invoice'><Button ref={cancelRef} colorScheme='blue' onClick={onClose}>
              Cash
            </Button></Link>
            <Link to= '/components/tinvoice'><Button colorScheme='green' ml={3}>
              Transfer
            </Button></Link>
            </Stack>
        </AlertDialogContent>
      </AlertDialog>
        </ChakraProvider>
    )
}
export default Inventory