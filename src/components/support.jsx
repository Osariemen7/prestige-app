import tick from './images/tick.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import {Button, Heading,Card} from '@chakra-ui/react';
import { Nav } from './nav.jsx'
import { ShareApp } from './nav.jsx';


const Support=()=>{
     const navigate= useNavigate()
     let tok= JSON.parse(localStorage.getItem("user-info"));
     
      function create() {
        
        navigate('/components/inventory')
      }
      console.log(tok)
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}}>
        <Nav />
          <ChakraProvider>
          <Heading fontSize='15px' textAlign='left' marginLeft='7%' marginTop='2%'>Hi {tok.user.first_name} how can we help you?</Heading>
           <Card m='5%' mt={8} backgroundColor='#F0F8FF' p='3%'>
            <Heading fontSize='18px'>Referral</Heading>
            <div style={{justifyContent:'center'}}>
            <p>Send an invite, get people to sign-up <br/>using your referral code and get a reward</p>
            <p style={{fontWeight: 'bold'}}>{tok.user.referral_code}</p><br/>
            <ShareApp inviteCode={tok.user.referral_code}/>
            </div></Card>
           <p>Download Prestige finance app on https://play.google.com/store/apps/details?id=co.prestigefinance.biz</p> 

            <br/>
            <Card m='5%' backgroundColor='#F0F8FF' p='3%'>
            <Heading fontSize='18px' mb='3%'>Support and Assistance</Heading>
          <p>Need help  with your account, send an email to support <span style={{fontWeight: 'bold'}}>@prestigefinance.co</span></p>
          <br/><p>or Call your account manager on<br/><span style={{fontWeight: 'bold'}}> 0706 567 5105</span> </p>
          </Card>
            </ChakraProvider> 
           
        </div>
    )
}
export default Support