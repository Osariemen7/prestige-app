import { ChakraProvider, Stack } from '@chakra-ui/react';
import { Heading,Card} from '@chakra-ui/react';
import { Nav } from './nav.jsx'
import { ShareApp } from './nav.jsx';
import React, { useState, useEffect } from 'react';
import { fetchDat } from './api.jsx';
import { useNavigate } from 'react-router-dom';

const Referral =()=>{
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  let tok= JSON.parse(localStorage.getItem("user-info"));
  
  useEffect(() => {
    fetchDat(setInfo, navigate, setLoading)
  }, [])
  console.log(info)

  if(loading) {
    return(
    <p>Loading...</p>)} 
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}}>
        <Nav />
          <ChakraProvider>
          <Heading fontSize='15px' textAlign='left' marginLeft='7%' marginTop='2%'>Hi {tok.user.first_name} how can we help you?</Heading>
          <p>REFERRAL BONUSES ARE PAID ON MONDAY</p>
           <Card m='5%' mt={2} backgroundColor='#F0F8FF' p='3%'>
            <Heading fontSize='18px'>Referral</Heading>
            <div style={{justifyContent:'center'}}>
            <p>Send an invite, get people to sign-up <br/>using your referral code and get a reward</p>
            <p style={{fontWeight: 'bold'}}>{info[0].referral_code}</p><br/>
            <ShareApp inviteCode={info[0].referral_code}/>
            </div></Card>
            <p>Download Prestige finance app on https://play.google.com/store/apps/details?id=co.prestigefinance.biz</p> 
             <Card m='5%' mt={8} backgroundColor='#F0F8FF' p='3%'>
              <Stack direction='row' spacing={1} align='center' justify='center'>
              <Card m={2} backgroundColor='#2E5894' color='#fff' p='3%'>
                <p>Available Invite Slot for the Month</p>
                <p>{info[0].invite_count}</p>
              </Card>
              <Card m={2} backgroundColor='#2E5894' color='#fff' p='3%'>
                <p>Number of people Invited</p>
                <p>{info[0].invitee_count}</p>
              </Card>
              </Stack>
              <Stack direction='row' spacing={1}>
                <Card m={2} backgroundColor='#2E5894' color='#fff' p='3%'>
                  <p>Cash Inflow of People Invited</p>
                  <p>{info[0].invitee_inflow}</p>
                </Card>
                <Card m={2} backgroundColor='#2E5894' color='#fff' p='3%' >
                  <p>Invite Bonus</p>
                  <p>{info[0].invitee_bonus}</p>
                </Card>
              </Stack>
             </Card>
             {info[0].invitees.map((obj, index) => ( 
              <Card key={index} m='5%' mt={3} backgroundColor='#F0F8FF' p='3%'>
                 <p>{obj.first_name}</p>
                 <p>{obj.phone_no}</p>
                 <p>NO of transaction done: {obj.referee_trans_count}</p>
                 <p>Total Amount of Transation: {obj.referee_trans_amount}</p>
              </Card> ))}          
          </ChakraProvider>
        </div>
    )

}
export default Referral