import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Stack, Text, Heading, Card } from "@chakra-ui/react"
import Select from 'react-select';

const TransferVerify = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState()
    const [info, setInfo] = useState()
    const [users, setUsers] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation() 

   let meal = location.state.rent

   
    console.log(meal)
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
const currentDate = new Date(); // Get the current date

const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 90)  

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
        if (response.status === 401) {
        navigate('/components/login');
      } else { 
       
      response = await response.json();
      setInfo(response)
      
        }}
    
        useEffect(() => {
          fetchData()
        }, [])
        
      console.log(info)  
    
        const salesTra  = async () => {
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
          if( typeof info !== 'undefined')
          salesTra()
          }, [info])

          const handleSub=(e)=>{
            e.preventDefault()
            
            if ( selectedOption.length < 1){
              setMessage('Please select transaction!')
            }
            else {
            ema()
          }}
            

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
let response = await fetch(`https://api.prestigedelta.com/unverifiedtransactions/?sale_id=${meal.result.sale_id}`,{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})

if (response.status === 401) {
  navigate('/components/login');
} else {  
response = await response.json();}

setUsers(response)

}
console.log(users)
     useEffect(() => {

  fetchInfo()
  }, [])

const handleTransact = (selectedOption) => {
  setSelectedOption(selectedOption);
};

const invo = () =>{
  if(selectedOption.length < 1){
    setMessage('Please select transaction!')
  }else{
    let data = finfo
    navigate('/components/eventory',  {state:{data}})}
}
        function toSentenceCase(inputString) {
            if (!inputString) return inputString; // Handle empty or null input
            return inputString.charAt(0).toUpperCase() + inputString.slice(1);
        }
        async function ema(e) {
         
          let ite={refresh}
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
            
            let payment_method= 'TRANSFER'
            let payment_ref = selectedOption.value
            let sale_id = meal.result.sale_id
            let item = {payment_method, payment_ref, sale_id};
            let result = await fetch ('https://api.prestigedelta.com/sellproducts/',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                  'accept' : 'application/json',
                  'Authorization': `Bearer ${bab}`
             },
             body:JSON.stringify(item)
            });
          
            if (result.status !== 200) {
              setMessage(JSON.stringify(result))
              
            } else {
              result = await result.json();
              setMessage(result.message)
            }
          }
             console.log(list) 
        
        if(loading) {

                    return(
            <p>Loading...</p>)}
            const finfo = list.sales.find(sale => sale.id === meal.result.sale_id)
            console.log(finfo)
    
const options = users.map((item) => ({
  label: `${item.beneficiary.account_name} (Amount:₦${item.amount}, Time:${new Date(item.time).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })})`,
  value: item.reference,
  }));
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}} >
<Link to='/components/inventory'>
            <i className="fa-solid fa-chevron-left bac"></i>
             </Link>        
   <div >            <ChakraProvider >
            
            <Button colorScheme='black'  variant='outline'>Verify Sales</Button>
            <Card backgroundColor='#F0F8FF' m={4} >
             <Text justify='red' fontSize='12px'>{(new Date()).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            <Text>Method of Payment: TRANSFER</Text>
            {meal.ite.products.map((obj, index) => (
  <div className="td2" key={index} >

            <Stack direction='column'mb={0} gap='10px' mt={3} spacing={4} align='center' justify='left'>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Product</Heading>
                 <Text>{obj.product_name}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
               <Heading size='xs'>Amount</Heading>
                 <Text>₦{(obj.price).toLocaleString('en-US')}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Quantity</Heading>
                 <Text>{obj.quantity}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
               <Heading size='xs'>Quantity Type</Heading>
                 <Text>{obj.quantity_type}</Text>
               </Stack>          
      </Stack></div>))}
      <Select
      onChange={handleTransact}
      className="lne"
      placeholder="Select Transaction"
      options={options}
      isSearchable={true}
      value={selectedOption}
    />
    <ul>
      <li >{options}</li>
    </ul>
</Card>
{message ? <p className='message'>{message}</p> : null}
<Stack direction='row' spacing={6} justify='center' mb='5%'>
            <Button variant='outline' colorScheme='blue' onClick={invo}>Share Receipt</Button>
            <Button variant='solid' colorScheme='blue' onClick={handleSub}>Confirm Payment</Button>
            </Stack>
            </ChakraProvider>
            </div>

        </div>
    )
}
export default TransferVerify