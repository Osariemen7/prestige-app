import {useState, useEffect} from 'react'
import { useNavigate} from "react-router-dom";

const CustLog =()=> {
    const [number, setNumber] = useState('')
    
     const navigate = useNavigate()

    const handleUsernameChange =(event)=>{
        setNumber(event.target.value)
    }

    const fetchInfo = async () => {
          
        let response = await fetch(`https://api.prestigedelta.com/cashiertransactions/?phone_no=${number}`,{
        method: "GET",
      
        })
        
        if (response.status === 401) {
        
        } else {  
        response = await response.json();}
        
        
        navigate('/components/customer/dailyTransact', {state:{response}})
      
        }
             useEffect(() => {
                if(number.length === 11){
          fetchInfo()}
          }, [number])
    const ema =()=>{
       
    }
    return(
        <div>
        <h3>Please enter business owner Phone number</h3>
             <p className='sp'>Phone number</p>
            <input className="lin"  onChange={handleUsernameChange} type="text" name="username"  required/><br/><br/>
            <br/>
            <button className="logb" onClick={ema} type="submit">Next</button>
                  
        </div>
    )
}

export default CustLog