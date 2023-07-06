import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Vector from './images/Vector.svg';
import Modal from 'react-modal';

const Addlist=()=>{
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const location = useLocation();
  let index = location.state.data
  let tok= JSON.parse(localStorage.getItem("user-info"));
  const terms = (tok) => {
    let refreshval;

  if (tok === null || typeof tok === 'undefined') {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)



  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  const fetchDa = async () => {
    let item ={refresh}
    let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(item)
    });
    rep = await rep.json();
    let bab = rep.access_token
  let response = await fetch("https://api.prestigedelta.com/projectlist/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  //localStorage.setItem('user-info', JSON.stringify(item))
  if (response.status === 401) {
    navigate('/components/login');
  } else {  
    response = await response.json()
    setInfo(response)
    setLoading(false)
    }
  
}
useEffect(() => {
  fetchDa()
}, [])

async function fproj(e) {
  e.preventDefault();
   let items ={refresh}
    let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json'
     },
     body:JSON.stringify(items)
    });
    rep = await rep.json();
    let bab = rep.access_token 
    console.warn(index.name, amount)
    let project_name = index.name
    let item = {project_name, amount};
    let result = await fetch ('https://api.prestigedelta.com/fundproject/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'accept' : 'application/json',
          'Authorization': `Bearer ${bab}`
     },
     body:JSON.stringify(item)
    });
    if (result.status !== 200) {
      result = await result.json()
      setMessage(JSON.stringify(result));
    } else {
      result = await result.json();
      closeModal()
    }
    
 }
console.log(tok)
if(loading) {
  return(
  <p>Loading</p>)
}
  return(
    <div>
        <Link to='/components/project'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <h4 className="dh3">{index.name}</h4>
        <div className="kd">
        <div className="pp">
           <p>Balance</p>
           <p>In Progress</p>
        </div>
        <h2 className="ah3">₦{(index.balance).toLocaleString('en-US')}</h2>
        <p className='asav1'>Next Payment Date: {(new Date(index.next_payment_day)).toDateString('en-GB')}</p>
                <p className='asav1'>Amount To pay: ₦{(index.payment_amount).toLocaleString('en-US')}</p>
          <h3 key={index}>{ Math.round(((parseInt( index.equity)/parseInt(index.target) * 100) + Number.EPSILON) * 100) / 100}% </h3>
          <div className="progress-b" style={{ width: `${100}%` }}>
          <div className="progress-bar" style={{ width: `${parseInt(index.equity) / parseInt(index.target) * 100}%` }}>
          </div> </div>
        </div>
         <div className="aflex">
         <button className="pof" onClick={openModal}>Top up</button>
         <Link className="trb" to='/components/transact'>View Transactions</Link>
         
         </div>
         <div className='dfle'>
            <img src={Vector} alt=''/>
                <p className='dfp'>Maturity date may depend on your ability to make the payment on schedule</p>
            </div>
            <div className="pd">
              <div className="asa2">
                 <p>Savings Target(30%)</p>
                 <p>Maturity Date</p>
              </div>
              <div className="asav1">
                <p>₦{(index.target_equity).toLocaleString('en-US')}</p>
                <p>{(new Date(index.maturity_day)).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <div className="pd">
               <div className="asa2">
                  <p>Interest Value(6% p.a)</p>
                  <p>Repayment Date</p>
               </div>
               <div className="asav1">
                  <p>₦{(index.interest_value).toLocaleString('en-US')}</p>
                  <p>{(new Date(index.repayment_day)).toLocaleDateString('en-GB')} </p>
               </div>
            </div>
            <h4 className="prit">Project Resources</h4>
            <p className="prip">List of project Resources you will need for this project</p>
            <div className="">
            {index.assets.map((obj, index) =>
              <div className="asa">
                <p key={index}>{obj.name}</p>
                <p key={index}>₦{(obj.price).toLocaleString('en-US')}</p>
              </div>)}
               <div className="asagr">
                <p>Total</p>
                <p>₦{(index.target).toLocaleString('en-US')}</p>
               </div>
            </div>
            <Modal
            className='modal'
            isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
        <i class="fa-solid fa-x mx" onClick={closeModal}></i>
           <h3 className='h4'>instantly Top up</h3>
            <form >
                <p className='mp'>Enter Amount</p>
                <input type="text" className='mine'  onChange={handleInputChange} /><br/>
                <p className='mp'>Payment Method</p>
                <select className="line">
                    <option></option>
                    <option>Prestige Account</option>
                </select>
                {message ? <p>{message}</p> : null} 
                <button className='logb' onClick={fproj}>Continue</button>
            </form>
            </Modal> 
    </div>
  )
}
export default Addlist