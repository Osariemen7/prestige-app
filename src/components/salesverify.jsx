import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import { Button, Stack, Text, Heading, Card, Spinner, CardBody  } from "@chakra-ui/react"
import Select from 'react-select';

const SalesVerify = () => {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState()
    const [users, setUsers] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

   let meal = location.state.data
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
let response = await fetch(`https://api.prestigedelta.com/transactionlist/?start_date=${thirtyDaysBefore.toLocaleDateString('en-US')}&end_date=${(new Date()).toLocaleDateString('en-US')}`,{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})

if (response.status === 401) {
  navigate('/components/login');
} else {  
response = await response.json();}
setLoading(false)
setUsers(response)

}
     useEffect(() => {
  fetchInfo()
  }, [])

const handleTransact = (selectedOption) => {
  setSelectedOption(selectedOption);
};
        function toSentenceCase(inputString) {
            if (!inputString) return inputString; // Handle empty or null input
            return inputString.charAt(0).toUpperCase() + inputString.slice(1);
        }
        async function ema(e) {
          e.preventDefault(); 
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
            
            let payment_method= meal.channel
            let payment_ref = selectedOption.value
            let sale_id = meal.id
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
        
console.log(meal)
        if(loading) {
            return(
            <p>Loading...</p>)}
            const filteredItems = users.transactions.filter(item => item.amount === meal.amount && item.transaction_type=== 'NIPCR');
const options = filteredItems.map((item) => ({
  label: `${item.beneficiary.account_name} (Amount:₦${item.amount}, Time:${new Date(item.time).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })})`,
  value: item.reference,
  }));
    return(
        <div >
<Link to='/components/inventory'>
            <i className="fa-solid fa-chevron-left bac"></i>
             </Link>        
   <div>            <ChakraProvider >
            
            <Button colorScheme='black'  variant='outline'>Verify Sales</Button>
            <Card backgroundColor='#f2f4f7' m={4} >
             <Text justify='red' fontSize='12px'>{(new Date(meal.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
            <Text>Method of Payment: {meal.channel}</Text>
            {meal.sold_products.map((obj, index) => (
  <div className="td2" key={index} >

            <Stack direction='column'mb={0} gap='10px' mt={3} spacing={4} align='center' justify='left'>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Product</Heading>
                 <Text>{obj.product_name}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
               <Heading size='xs'>Amount</Heading>
                 <Text>₦{(obj.sold_amount).toLocaleString('en-US')}</Text>
               </Stack>
               <Stack direction='row'mb={2} gap='30px' mt={0} spacing={2} align='center' justify='center'>
                 <Heading size='xs'>Quantity</Heading>
                 <Text>{obj.sold_quantity}</Text>
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
</Card>
{message ? <p>{message}</p> : null}
<Button variant='solid' colorScheme='blue' onClick={ema}>Verify</Button>
            </ChakraProvider>
            </div>

        </div>
    )
}
export default SalesVerify