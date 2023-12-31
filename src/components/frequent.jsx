import { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";


const Frequent =()=>{
  const [often, setOften] = useState('');
  const [clickedItem, setClickedItem] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundColor1, setBackgroundColor1] = useState('');
  const [backgroundColor2, setBackgroundColor2] = useState('');
  const [backgroundColor3, setBackgroundColor3] = useState('');
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation();
  let pin = location.state.pro
  const terms = (pin) => {
    let nam;  
    if (pin.length === 0) {
      nam = 'null';
    } else {
      nam = pin
    }
  
    return nam;
  };
  let pan= terms(pin)
  
  const valueChange = (event) => {
    setClickedItem(event.target.value)
    
  }
  const handleChange = (event) => {
    setOften(event.target.value)
  }
  const handleClick = (item) => {
    setClickedItem(item);
    const newColor = backgroundColor === 'lightcyan' ? 'lightblue' : 'lightcyan';
    setBackgroundColor(newColor);
    };
    const handleClick1 = (item) => {
      setClickedItem(item);
      const newColor1 = backgroundColor1 === 'lightcyan' ? 'lightblue' : 'lightcyan';
      setBackgroundColor1(newColor1);
      };
      const handleClick2 = (item) => {
        setClickedItem(item);
        const newColor2 = backgroundColor2 === 'lightcyan' ? 'lightblue' : 'lightcyan';
        setBackgroundColor2(newColor2);
        };
        const handleClick3 = (item) => {
          setClickedItem(item);
          const newColor3 = backgroundColor3 === 'lightcyan' ? 'lightblue' : 'lightcyan';
          setBackgroundColor3(newColor3);
          };
  const review = (e) => {
     e.preventDefault()
     console.warn(clickedItem, often, pan)
     let pal ={clickedItem, often, pan}
     if (clickedItem.length > 1 && often.length > 1) {
            
      navigate('/components/select', {state:{pal}})
      
    } else {
      setMessage("All fields must be filled");
    }
     
  }
console.log(pin)
    return(
        <div>
           <div>
           <Link to='/components/createp'><i class="fa-solid fa-chevron-left bac"></i></Link>
             <h3>How frequently would you like to repay the Loan?</h3>
             <p className="sp">Set you payment plan for the loan and down-payment</p>
           </div>
           <div className="dflex1">
              <input type="radio" 
                value='Daily'
                checked={often === 'Daily'}
                onChange={handleChange}
              />
               <label>Daily</label>
           </div>
           <div className="dflex1">
               <input type="radio" 
                value='Weekly'
                checked={often === 'Weekly'}
                onChange={handleChange}
               />
                <label>Weekly</label>
           </div>
            <div className="dflex1">
              <input type="radio"
              value='Monthly'
                checked={often === 'Monthly'}
                onChange={handleChange} />
              <label>Monthly</label>
            </div>
            <div>
            <h3>How much will you pay {often}?</h3>
            <p className='sp'>Enter an amount you'll pay {often} for the down-payment and loan repayment</p>
            <div className="freq">
               <div onClick={() => handleClick('10000')} style={{backgroundColor:backgroundColor}} className="mon">₦10000</div>
               <div onClick={() => handleClick1('20000') } style={{backgroundColor:backgroundColor1}} className="mon">₦20000</div>
               <div onClick={() => handleClick2('50000')} style={{backgroundColor:backgroundColor2}} className="mon">₦50000</div>
            </div>
            <div className="freq">
               <div onClick={() => handleClick3('100000')} style={{backgroundColor:backgroundColor3}} className="mon">₦100000</div>
               <input onChange={valueChange} className="mon1" type="number" placeholder="Different amount"/>
            </div>  
            <p>{clickedItem}</p>  
        </div>
        <div className="message">{message ? <p>{message}</p> : null}</div>
            <button onClick={review} className="logb">Continue</button>
        </div>
    )
    
}
export default Frequent