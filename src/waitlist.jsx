import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { Typography} from '@mui/material';
import { BootstrapButton, ValidationTextField} from './components/material.js'
import { ChakraProvider, Spinner } from '@chakra-ui/react';
  




const Foam =()=>{
    const [email, setEmail] = useState('')
    const [full_name, setFullname] = useState('');
    const [Phone_no, setPhone] = useState('');
    const [message, setMessage] = useState("");
    const [business_nature, setBuisness] = useState('')
    const [buttonVisible, setButtonVisible] = useState(true);
    
    const navigate = useNavigate()
     
    
   
    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 5000);
    };
   
    const handleEmailChange = (event) =>{
       setEmail(event.target.value)
    }
    const handleFullChange = (event)=>{
         setFullname(event.target.value)
    }
    const handlePhone = (event)=> {
         setPhone((event.target.value).replace('0', '234'))
    }
    const handleBuisness = (event)=>{
         setBuisness(event.target.value)
    }
    
  
      async function reg() {
        
          handleClick()
            console.warn( full_name, Phone_no, business_nature, email)
            let item = { full_name, Phone_no, business_nature, email};
            let resut = await fetch ('https://api.prestigedelta.com/leads/',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                  'accept' : 'application/json'
             },
             body:JSON.stringify(item)
            });
        
            if (resut.status !== 201) {
              resut = await resut.json();
              setMessage(JSON.stringify(resut));}
            else {
              resut = await resut.json();
              navigate('/waitlistsuccess', {state:{resut}})
            
                
            }
          }
          //
      return(
        <div style={{padding:'4%'}}>
      <Helmet>
         <title>Waitlist</title>
         </Helmet>
        <Typography  variant="h5" align='left' marginLeft='8%' marginTop='10%' fontWeight="fontWeightBold">Join the Waitlist!</Typography>
            <br/><Typography align='left' marginLeft='8%' variant='subtitle2' >ill and submit the form to get access to the the Prestige POS application</Typography>
          <br/> 
        <form>
        <ValidationTextField
           onChange={handleEmailChange}
        label="Email Address"
        type='email'
        required
        variant="outlined"
        id="validation-outlined-input"
      /> <br/><br/>
      <ValidationTextField
           onChange={handleFullChange}
        label="Full Name"
        type='text'
        required
        variant="outlined"
        id="validation-outlined-input"
      />
       <br/><br/>
       <ValidationTextField
           onChange={handlePhone}
        label="Phone Number"
        type='text'
        required
        variant="outlined"
        id="validation-outlined-input"
      />
      <br/> <br/>
      <ValidationTextField
           onChange={handleBuisness}
        label="Business Nature"
        type='text'
        required
        variant="outlined"
        id="validation-outlined-input"
      />
      
     <br/>
              <div className="message">{message ? <p>{message}</p> : null}</div>
        </form><br/>
        {buttonVisible && (  <BootstrapButton variant="contained" onClick={reg} disableRipple>
                Submit
      </BootstrapButton>
      )}  
     </div>
      )
    
}
export default Foam