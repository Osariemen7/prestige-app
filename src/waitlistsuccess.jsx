import tick from './components/images/tick.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {Button, Heading,Card} from '@chakra-ui/react';


const WaitlistPage=()=>{
    const location = useLocation()
     const navigate= useNavigate()
     
     let mess = location.state.resut || ''
     
      function create() {
        
        navigate('/waitlist')
      }
      
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}}>
          <ChakraProvider>
           <div style={{ marginTop:'30%'}}>
           <Heading>Congratulations!</Heading>
           <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={tick}  alt=''/>
              </div>
               <Heading fontSize='18px' p={3} mb={3}>You have completed the first step of your journey, You are number {mess.position} on the waitlist! </Heading>
              
              </div>
           </ChakraProvider> 
           
        </div>
    )
}
export default WaitlistPage