import {useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Box, Button, Heading, Stack, SimpleGrid,  StackDivider, Text } from '@chakra-ui/react'

const Display = ()=>{
       const [message, setMessage] = useState('')
       const navigate = useNavigate()
       const location = useLocation()
       let am = location.state.data
       let amount = am.amount
       let sub_account = am.sub_account
       const currentDate = new Date(); // Get the current date

      

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() + 30)  

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
    
    async function overdraft(e){
        e.preventDefault()
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
              console.warn(amount, sub_account )
              let ited ={amount, sub_account}
              let resut = await fetch ('https://api.prestigedelta.com/overdraftdrawdown/',{
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                    'Authorization': `Bearer ${bab}`
               },
               body:JSON.stringify(ited)
              });
              if (resut.status !== 200) {
                const errorResult = await resut.json();
                setMessage(JSON.stringify(errorResult.message));
              } else {
                 resut =await resut.json();
                 navigate('/components/odip')
                    }
      }
      console.log(am)

    return(
        <div>
        <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <h4 className='oveh'>Confirm Overdraft</h4>
        <p className='ove'>You are borrowing</p>
        <h1>₦{(parseInt(amount)).toLocaleString('en-US')}</h1>
        <Stack direction='row' spacing={2} justify='center' align='center' gap='25%'>
        <p>From</p>
                <p>Overdraft Account</p>
        </Stack>
        <hr/>
        <Stack direction='row' spacing={2} ml='17%' justify='left' align='center' gap='35%'>
              <p>To</p>
                <p>{am.sub_account}<br/> Sub Account</p>
        </Stack>
        <hr/>
        <Stack direction='row' spacing={2} ml='15%' justify='left' align='center' gap='20%'>
        <p>Maturity Date</p>
                <p>{(thirtyDaysBefore).toLocaleDateString('en-GB')}</p>     
        </Stack>
        <hr/>
        <Stack direction='row' spacing={2} ml='15%' justify='left' align='center' gap='20%'>
        <p>Daily Interest Rate</p>
                <p>0.1%</p>   
        </Stack>
        <hr/>
        <Stack direction='row' spacing={2} ml='15%' justify='left' align='center' gap='45%'>
        <p>Term</p>
                <p>Daily</p>
              </Stack>
              <hr/>
              <Stack direction='row' ml='15%' spacing={2} justify='left' align='center' gap='32%'>
              <p>Description</p>
                <p>Overdraft</p>    
              </Stack>
        
        <button className='logb' onClick={overdraft}>Proceed</button>
             <div className="message">{message ? <p>{message}</p> : null}</div>
        </div>
    )
}
export default Display