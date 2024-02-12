import { useState, useEffect } from "react"
import { Helmet } from "react-helmet";
import Select from 'react-select';
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Typography, Button, TextField, Autocomplete } from '@mui/material';
import { BootstrapButton, ValidationTextField } from "./components/material";


const Enter =()=>{
const [info, setInfo] = useState([])
const [loading, setLoading] = useState(true)
const [nuban, setNuban] = useState('')
const [selectedOption, setSelectedOption] = useState('')
const [users, setUsers] = useState('')
const [messag, setMessag] = useState('')
const [buttonVisible, setButtonVisible] = useState(true);

const [create_anchor_user, setCreateanchoruser] = useState(true);
const location = useLocation();

 
const navigate = useNavigate()


const handleBank = (event, newValue) => {
  setSelectedOption(newValue);}

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
      console.log(selectedOption)
    
  if(loading) {
    return(
    <p>Loading...</p>)
  }
    return(
        <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh',paddingTop:'25%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}} > 
         <Helmet>
            <title>Set up Page</title>
            
        </Helmet>
          <Typography variant="h6" align="left" marginLeft={3} fontWeight="fontWeightBold"  >Set up your Settlement Account</Typography>
           <h2></h2>
           <Typography align='left' marginLeft={3} variant='subtitle2' >Fill in your account details!</Typography>
           
          <br/>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Autocomplete
      
      id="combo-box-demo"
      value={selectedOption}
      options={options}
      onChange={handleBank}
      sx={{ width: '88%', maxWidth:'100%', align: 'center' }}
      renderInput={(params) => <TextField {...params} label="Select Bank" />}
        
    /> </div>
    <br/><br/>
    <ValidationTextField
  
           onChange={handleNuban}
        label="Account Number"
        type='number'
        required
        variant="outlined"
        id="validation-outlined-input"
      />

       <br/><br/>
          <div >{users ? <div><p className="me">{users.account_name}</p><br/></div> : null}</div>


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