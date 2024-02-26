import tick from './images/tick.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {Button, Heading,Card} from '@chakra-ui/react';


const SuccessPage=()=>{
    const location = useLocation()
     const navigate= useNavigate()
     
     let meal = location.state.result || ''
     
      function create() {
        
        navigate('/components/inventory')
      }
      
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}}>
          <ChakraProvider>
           <div style={{ marginTop:'30%'}}>
           <Heading>Congratulations!</Heading>
              <img src={tick} style={{marginLeft:'35%'}} alt=''/>
              <Heading fontSize='18px' mb={3}>You have successfully confirmed payment for the Sale!</Heading>
              <Card m={3} backgroundColor='#F0F8FF' p={3}>
              {meal.message.map((sentence, index) => (
   <p>{sentence}</p>
    ))}
</Card><br/>
              <p className=''>Click to return to the Home page</p><br/>
              
              <Button colorScheme='blue' width='60%' onClick={create}>Home</Button>
           </div>
           </ChakraProvider> 
           
        </div>
    )
}
export default SuccessPage