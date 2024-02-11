import { useState, useEffect } from "react"
import { Helmet } from "react-helmet";
import Select from 'react-select';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { ChakraProvider, InputGroup, Spinner } from '@chakra-ui/react';
import { Input, InputRightElement, Heading, Text } from '@chakra-ui/react';
import { Typography, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { NotifyPop } from "./firebase";

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 32%',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Enter =()=>{
const [info, setInfo] = useState([])
const [loading, setLoading] = useState(true)
const [nuban, setNuban] = useState('')
const [selectedOption, setSelectedOption] = useState(null)
const [users, setUsers] = useState('')
const [messag, setMessag] = useState('')
const [buttonVisible, setButtonVisible] = useState(true);

const [create_anchor_user, setCreateanchoruser] = useState(true);
const location = useLocation();

 
const navigate = useNavigate()


const handleBank = (selectedOption) => {
    setSelectedOption(selectedOption);
  };


const handleNuban =(evnt)=>{
        
    setNuban(evnt.target.value);
}
console.log(info)
let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
const fetchDa = async () => {
    let response = await fetch("https://api.prestigedelta.com/getbanklist/",{
  method: "GET",
  
  })
  //localStorage.setItem('user-info', JSON.stringify(tok))
  
  if (response.status === 401) {
    navigate('/components/login');
  } else { 
  response = await response.json();
  setLoading(false)
  setInfo(response)
    }}
    useEffect(() => {
      fetchDa()
    }, [])
    const options = info.map((item) => ({
        label: item.bank_name,
        value: item.bank_code,
      }));
      const teams = (selectedOption) => {
        let ref;
  
          if ( selectedOption === null || typeof selectedOption === 'undefined') {
             ref = 10;
              }
               else {
             ref= selectedOption.value;
           }
            return ref}
         let bank_code = teams(selectedOption)
        
         
async function ema(e) {
  let response = await fetch(`https://api.prestigedelta.com/accountrewards/?bank_code=${bank_code}&nuban=${nuban}`,{
    method: "GET",
    
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
    response = await response.json();
    
      navigate('/components/loyalty', {state: {response}})
      }}
      
     
            const handleClick = () => {
        // When the button is clicked, setButtonVisible to false
        setButtonVisible(false);
        setTimeout(() => {
          setButtonVisible(true);
        }, 5000);
      };
    
  if(loading) {
    return(
    <p>Loading...</p>)
  }
    return(
        <div>
         <Helmet>
            <title>Set up Page</title>
            
        </Helmet>
         <ChakraProvider>
         <Link to='/components/register'>
      <i className="fa-solid fa-chevron-left bac"></i>
    </Link>
    <NotifyPop />
         <Heading textAlign='left' ml='50px' fontSize='20px' mt='18px' color='blue'>Set up your Settlement Account</Heading>
            <Text textAlign='left' ml='50px' fontSize='14px'>Fill in your account details!</Text>
          <br/>
          
          
      <Select
      onChange={handleBank}
      className="lne"
      placeholder="Select Bank"
      options={options}
      isSearchable={true}
      value={selectedOption}
    /><br/>
          <Input
          size='md'
          width={273} ml='18px'
            type="number"
            placeholder="Account Number"
            onChange={handleNuban}
          /><br/><br/>
          <div >{users ? <div><p className="me">{users.account_name}</p><br/></div> : null}</div>

  </ChakraProvider>
<br/>              
{buttonVisible && (<BootstrapButton variant="contained" onClick={ema} disableRipple>
                   Next
      </BootstrapButton>
      
       )}  
       {!buttonVisible && null} 
            <div className="message">{messag ? <p>{messag}</p> : null}</div>
     
      
        </div>
    )
}
export default Enter