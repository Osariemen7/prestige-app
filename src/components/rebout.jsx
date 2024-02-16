import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { generateToken } from "../firebase";
import { BootstrapButton,  ValidationTextField} from './material.js'


const Business=()=>{
    const [message, setMessage] = useState("");
    const [business_name, setBusinessname] = useState('');
    const [business_type, setBusinesstype] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const locs = location.state.data

    let tok = JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
    let refreshval;
  
    if ( typeof tok ==='undefined' || tok === null) {
      refreshval = 0;
    } else {
      refreshval = tok.refresh_token;
    }
  
    return refreshval;
  };
  let refresh = terms(tok)
  const term = (tok) => {
    let banes 
    if (typeof tok === 'undefined' || tok === null) {
    
     banes = "";
    } else {
      banes = tok.last_name;
    }
  
    return banes;
  };
  let bane = term(tok)

  useEffect(() => {
    generateToken();
  }, []);

    const handleBusiness=(event) =>{
        setBusinessname(event.target.value)
    }
    const handleBusinesstype =(event) => {
        setBusinesstype(event.target.value)
    }

        const bus=(e)=>{
          e.preventDefault()
          let data ={business_name, business_type, locs}
          if ( business_name.length < 1 || business_type.length < 1){
            setMessage('All Fields must be Filled')
          }
          else {
          
          navigate('/components/last', {state:{data}})
        }}
     console.log(tok)
    return(
        <div style={{padding: '2%'}}>
            <h2>Hi {bane}, tell us about your business</h2>
            <p>Prestige finance is legally required to collect this information</p>
            <ValidationTextField
  
  onChange={handleBusiness}
label="Business Name"
type='text'
required
variant="outlined"
id="validation-outlined-input"
/><br/><br/><br/>

<ValidationTextField
  
  onChange={handleBusinesstype}
label="Type of business"
type='text'
required
variant="outlined"
id="validation-outlined-input"
/><br/><br/><br/>
                
                <div className="message">{message ? <p>{message}</p> : null}</div>
              <BootstrapButton variant="contained" onClick={bus} type="submit">Next</BootstrapButton>          </div>
    )
}
export default Business