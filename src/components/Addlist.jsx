import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Vector from './images/Vector.svg';
import Modal from 'react-modal';
import good from './images/good.svg';


const Addlist=()=>{
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [isOpens, setIsOpens] = useState(false);
  const [tock, setTock] = useState('');
  const [error, setError] = useState('');
  const [fun, setFun] = useState('')
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
  const openModal1 = () => {
    setIsOpens(true);
  };
  const closeModal1 = () => {
    setIsOpens(false);
    
  };
   const close =() => {
    navigate('/components/project')
   }

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  

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
  

  try {
    let result = await fetch('https://api.prestigedelta.com/fundproject/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Authorization': `Bearer ${bab}`
      },
      body: JSON.stringify(item)
    });

    if (result.status !== 200) {
      const errorResult = await result.json();
      setMessage(JSON.stringify(errorResult.message));
    } else {
       result =await result.json();
       setFun(JSON.stringify(result))
    }
  } catch (error) {
    // Handle fetch error
    console.error(error);
  }
;
}
 async function closeProj(e){
  e.preventDefault()
  let project_name = index.name;
  let item ={refresh}
      let rep = await fetch ('https://sandbox.prestigedelta.com/refreshtoken/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json'
       },
       body:JSON.stringify(item)
      });
      
      rep = await rep.json();
      let bab = rep.access_token
        console.warn(project_name )
        let ite ={project_name}
        let resut = await fetch ('https://api.prestigedelta.com/closeproject/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json',
              'Authorization': `Bearer ${bab}`
         },
         body:JSON.stringify(ite)
        });
        if (resut.status !== 200) {
          const errorResult = await resut.json();
          setError(JSON.stringify(errorResult.message));
        } else {
           resut =await resut.json();
              setTock(JSON.stringify(resut))}
}
console.log(error)

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
        <h5 className="pbp">Bonus Balance: ₦{(index.bonus_balance).toLocaleString('en-US')}</h5>
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
                <p className='dfp'>Loan disbursement date may depend on your ability to make the payment on schedule</p>
            </div>
            <p className='prip'>You must have a minimum down-payment<br/> of ₦{(index.minimum_balance).toLocaleString('en-US')} on/before {new Date().toDateString('en-GB')} <br/>or loan disbursement day will be extended to<br/> {(new Date(index.extension_day)).toDateString('en-GB')}</p>
            <div className="pd">
              <div className="asa2">
                 <p>Loan Down-payment</p>
                 <p>Loan Disbursement On:</p>
              </div>
              <div className="asav1">
                <p>₦{(index.target_equity).toLocaleString('en-US')}</p>
                <p>{(new Date(index.maturity_day)).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <div className="pd">
               <div className="asa2">
                  <p>Interest On Loan</p>
                  <p>Loan Repayment by:</p>
               </div>
               <div className="asav1">
                  <p>₦{(index.interest_value).toLocaleString('en-US')}</p>
                  <p>{(new Date(index.repayment_day)).toLocaleDateString('en-GB')} </p>
               </div>
            </div>
            {index.goal_type === 'Cost' ? (
          <p className="prip">This project will save you ₦{(index.goal_amount).toLocaleString('en-US')} Monthly</p>) : 
          <p className="prip">This project will make you ₦{index.goal_amount} Monthly</p> }
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
               <button className="plog" onClick={openModal1} >Close Project</button>
            </div>
            <Modal
            className='modal'
            isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
        {fun === '' ? (
      <div>
      <i className="fa-solid fa-x mx" onClick={closeModal}></i>
      <h3 className='h4'>Instantly Top Up</h3>
      <form>
        <p className='mp'>Enter Amount</p>
        <input type="text" className='mine' onChange={handleInputChange} /><br />
        <p className='mp'>Payment Method</p>
        <select className="line">
                <option></option>
                <option>Prestige Account</option>
                </select>
                {message ? <p>{message}</p> : null} 
                <button className='logbs' onClick={fproj}>Continue</button>
            </form>
            </div>) :
            <div>
          <i class="fa-solid fa-x tx" onClick={close}></i>
          <img src={good} alt="" />
          <h4 className="hoo">Project Successfully funded!</h4>  
      </div>}
            </Modal> 
            <Modal
      className='prmo'
      isOpen={isOpens}
      onRequestClose={closeModal1}
      contentLabel="Example Popup"
    >
    {tock === '' ? (
      <div>
         <h3>Are you sure you want to close this project?</h3>
        <div  className="aflex">
          <button className="plut" onClick={closeProj}>Yes</button>
          <button className="plut" onClick={closeModal1}>No</button>
        </div>
        <p>Funds will be transfered into main account</p>
        {error ? <p>{error}</p> : null}
      </div>) :
      <div>
          <i class="fa-solid fa-x tx" onClick={close}></i>
          <img className="goo" src={good} alt="" />
          <h4 className="hoo">Project Closed Successfully</h4>
      </div>}
    </Modal>
    </div>
  )
}
export default Addlist