import { Link, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {Card, Button, Heading, Text } from '@chakra-ui/react'

const SalesAnalytics =()=>{
    const navigate = useNavigate()
const location = useLocation()
let tip = location.state.result

    const send =()=>{
        let data = tip
        navigate('/components/chat', {state:{data}})
      }
      function applyBoldFormatting(text) {
        // Replace **text** with <strong>text</strong> for bold formatting
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      }
      const sentences = applyBoldFormatting(tip.message_value).split('\n');

      
return(
    <div>
        <ChakraProvider>
        <Link to='/components/invoice'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <Card p={3} backgroundColor='#eff1fa'>
                  <Heading fontSize='15px'>Sales Tip</Heading>
                  {sentences.map((sentence, index) => (
                    <p key={index} dangerouslySetInnerHTML={{ __html: sentence }} />
    ))}<br/>
                    <Text>Have a question? </Text>
<div>
<Button colorScheme='blue' variant='solid' onClick={send}>Start Conversation</Button>
</div>

                  </Card>
        </ChakraProvider>
    </div>
)
}
export default SalesAnalytics