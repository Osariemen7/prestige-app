import {useState} from 'react'
import OtpInput from 'react-otp-input';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import { Typography } from '@mui/material';
import { BootstrapButton} from './material.js'
import { ChakraProvider, Spinner } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';


const Verify = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const location = useLocation();
    const [buttonVisible, setButtonVisible] =useState(true)
  let num = location.state.item

  const handleClick = () => {
    // When the button is clicked, setButtonVisible to false
    setButtonVisible(false);
    setTimeout(() => {
      setButtonVisible(true);
    }, 15000);
  };
   async function vet(e){
        e.preventDefault()
        handleClick()
        let res= JSON.parse(localStorage.getItem("user-info"));
        let reference = res.reference
        const item = {otp, reference}
        console.log(JSON.stringify(item))
        // Post the payload using Fetch:
        let sult= await fetch('https://api.prestigedelta.com/verifyconfirm/', {
          method: 'POST',
          headers:{
          'Content-Type': 'application/json'
        //   'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYzNzk2NDY5LCJpYXQiOjE2NjM3OTYxNjksImp0aSI6IjMxM2M3YjgzY2QzYjQyMWJiMzcyNDc0MzA3MjYyNmJkIiwidXNlcl9pZCI6M30.UqMeJLcnNYUXYpxximYbbuw6KJ3Udj5crgp3R3NrjTM'
        },
        
        body:JSON.stringify(item),
      })
      if (sult.status !== 200) {
        setMessage("Invalid Otp");
      } else {
        sult = await sult.json(); 
      navigate('/components/register', {state:{num}})
      }
    }
    console.log(num)
    return(
        <div tyle={{padding: '2%', marginTop: '5%', alignItems: 'center', justifyContent: 'center' }}>
        <Helmet>
            <title>OTP Page</title>
            
        </Helmet>
        <Link to='/components/signup'><i class="fa-solid fa-chevron-left bac"></i></Link>
           <div > 
           <Typography  variant="h5" align='left' marginLeft='8%' fontWeight="fontWeightBold">Verify your phone number</Typography>
            <br/><Typography align='left' marginLeft='8%' variant='subtitle2' >Please enter the 4-digit verification code sent to your phone number in the boxes below</Typography>
           
            <p></p>
           <div className='dtp'>
              <OtpInput  
                 value={otp}
                 onChange={setOtp}
                  numInputs={4}
                 renderSeparator={<span> </span>}
                 renderInput={(props) => <input {...props }  className='otp' />}
                />    
           </div><br/><br/>
           {buttonVisible && (  <BootstrapButton variant="contained" onClick={vet} disableRipple>
                   Next
      </BootstrapButton>
      )}  <ChakraProvider>
       {!buttonVisible && <Spinner />}</ChakraProvider> 
           
           <div className="message">{message ? <p>{message}</p> : null}</div>
           <br/><p>Didn't get the code yet? <span className='lsf' >Resend OTP</span></p>
           </div>
           </div>
    )
}
export default Verify