import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const Request = () => {
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState('')
    const navigate = useNavigate()
    const location = useLocation();
     let next = location.state.data
     let sub_account = next

    const handleAmountChange = (e) => (
        setAmount(e.target.value)
    )

    console.log(next)
      const send = (e) =>{
        e.preventDefault()
        let data = {amount, sub_account}
        if (amount.length > 1 ) {
          navigate('/components/odisplay', {state:{data}})
        } else {
          setMessage('please set an amount');
        }
      
        }
    
    return(
        <div>
           <Link to='/components/savings'><i class="fa-solid fa-chevron-left bac"></i></Link>
           <h2>Request for an Overdraft</h2>
           <p className='ov' >How much do you want?</p>

           <form>
              <p className="sp">Amount</p>
              <input className="lin" type="number" onChange={handleAmountChange} placeholder="Enter Amount" required/><br/><br/>
                 <button className="logb" onClick={send} type="submit">Proceed</button>
              <div className="message">{message ? <p>{message}</p> : null}</div>
           </form>
           
           
        </div>
     )
}
export default Request