import { useState } from 'react'
import { Link, useNavigate, useLocation} from 'react-router-dom'
let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if (tok === null || typeof tok === 'undefined')  {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)
const Saving =()=>{
    const navigate = useNavigate()
    const [save, setSave] = useState(0)
    const [payment_amount, setPayment] = useState('')
    const [message, setMessage] = useState('')
    const [refr, setRefre] = useState(refresh)
    const [often, setOften] = useState('');
    const [oftens, setOftens] = useState('')
    const location = useLocation();
    let tack = location.state.data
    const handleChange = (event) => {
      setOften(event.target.value)
    }
    const handleName =(event)=> {
        setSave(event.target.value)
    }
    const handlePayment = (event) => {
      setPayment(event.target.value)
  }
  const handlOften = (event) => {
    setOftens(event.target.value)
  }
  
    const create = (e) => {
        e.preventDefault()
        setRefre(refr)
        console.warn(save, payment_amount, often, oftens, tack)
        let data = {save, payment_amount, often, oftens, tack}
        if (often.length > 1 && payment_amount.length > 1 && oftens.length > 1) {
            
            navigate('/components/listp', {state:{data}})
            
          } else {
            setMessage("All fields must be filled");
          }   
    }
    
    console.log(refr)
    return(
        <div>
        <Link to='/components/createp'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
           <h3 className="head">Continuation</h3>
           
           <form>
           <p className='sp'>Do you have anything saved up for this project?</p>
           <input type="radio" 
                value='Yes'
                checked={oftens === 'Yes'}
                onChange={handlOften}
              />
               <label>Yes</label>
           
           
               <input type="radio" className='rad'
                value='No'
                checked={oftens === 'No'}
                onChange={handlOften}
               />
                <label>No</label>
                {oftens === 'Yes'? (
                <div>
                <p className="sp">How much do you have saved?</p>
                 <input className="line" onChange={handleName} type="number" placeholder="₦0.00" />
                </div>): ''}
              <br/>
              <p className='sp'>Will this project help you generate revenue or reduce cost?</p>
              
              <input type="radio" 
                value='Cost'
                checked={often === 'Cost'}
                onChange={handleChange}
              />
               <label>Cost</label>
           
           
               <input type="radio" className='rad'
                value='Revenue'
                checked={often === 'Revenue'}
                onChange={handleChange}
               />
                <label>Revenue</label>
           {often === 'Cost'? (
            <p className='sp'>How much will it save you Monthly?</p>
           ) :
              <p className="sp">Expected Monthly Revenue</p>}
              <input className="line" onChange={handlePayment} type="number" placeholder="₦0.00" /><br/>
              
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button type="submit" onClick={create} className="logb">Continue</button>
           </form>
        </div>
    )
}
export default Saving