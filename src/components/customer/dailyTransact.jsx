import {useState, useEffect} from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"
import { ChakraProvider } from '@chakra-ui/react';
import { Card, Heading, Stack, Input, Button } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Dailysh =()=> {
  const [info, setInfo] = useState('')
  const [users, setUsers] = useState('');
  
  const [data, setData] = useState('')
  const navigate= useNavigate()
  const [loading, setLoading] = useState(true)
  const [sidebar, setSidebar] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState(new Date())
  const [buttonEnabled, setButtonEnabled] = useState(false);
  
  const location = useLocation();

const ans = location.state.response

  const begin =(event)=>{
    setStart(event.target.value)
  }
  const conc =(event)=>{
    setEnd(event.target.value)
  }


    const read = info.transactions
    
    const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 0)  

         

          useEffect(() => {
            const timer = setTimeout(() => {
              setButtonEnabled(true);
            }, 15000)
            return () => clearTimeout(timer);
          }, [])
  

          
          
console.log(ans)
       
    return(
      <div>
      <ChakraProvider backgroundColor='skyblue' >
  
             <Heading m='15px' fontSize='18px'>Transaction for Today </Heading>  
             
     <Heading mt='10px' fontSize='15px' textAlign='center'>Cash Inflow: ₦{(ans.inflow).toLocaleString('en-US')}</Heading>
    
        {ans.transactions.map((obj, index) => 
                  <div className='td' > 
                  {obj.transaction_type === 'CLOSE_PROJECT' || obj.transaction_type ==='NIPCR' ? (
                      <div>
                      <div className='tl'>
                       <p key={index}>{obj.classification}</p>
                       <p key={index}>₦{(obj.amount).toLocaleString('en-US')}</p>
                  </div>
                  <div className='tg'>
                       <p  key={index}>{obj.status}</p>
                       <p key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                       <p className='tm' key={index}>{obj.narration}</p></div>) : null}
                  
                  </div>
                )}
  
                
                </ChakraProvider>               
      </div>
   )
}
export default Dailysh