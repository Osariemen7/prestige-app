import {useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom'
const Display = ()=>{
       const [message, setMessage] = useState('')
       const navigate = useNavigate()
       const location = useLocation()
       let amount = location.state.amount
       
       const currentDate = new Date(); // Get the current date

    const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() + 31)  

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
    
    async function overdraft(e){
        e.preventDefault()
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
              console.warn(amount )
              let ited ={amount}
              let resut = await fetch ('https://api.prestigedelta.com/overdraftdrawdown/',{
                  method: 'POST',
                  headers:{
                    'Content-Type': 'application/json',
                    'accept' : 'application/json',
                    'Authorization': `Bearer ${bab}`
               },
               body:JSON.stringify(ited)
              });
              if (resut.status !== 200) {
                const errorResult = await resut.json();
                setMessage(JSON.stringify(errorResult.message));
              } else {
                 resut =await resut.json();
                 navigate('/components/odip')
                    }
      }
     console.log(amount)
    return(
        <div>
        <Link to='/components/overd'><i class="fa-solid fa-chevron-left bac"></i></Link>
        <h4 className='oveh'>Confirm Overdraft</h4>
        <p className='ove'>You are borrowing</p>
        <h1>₦{(parseInt(amount)).toLocaleString('en-US')}</h1>
             <div className='rev'>
                <p>From</p>
                <p>Overdraft Account</p>
             </div>
             <div className='orev'>
                <p>To</p>
                <p>Main Account</p>
             </div>
             <div className='rev'>
                <p>Maturity Date</p>
                <p>{(thirtyDaysBefore).toLocaleDateString('en-GB')}</p>
             </div>
             <div className='rev'>
                <p>Daily Interest Rate</p>
                <p>0.1%</p>
             </div>
             <div className='orev2'>
                <p>Term</p>
                <p>Daily</p>
             </div>
             <div className='orev'>
                <p>Description</p>
                <p>Overdraft</p>
             </div>
             <button className='logb' onClick={overdraft}>Proceed</button>
             <div className="message">{message ? <p>{message}</p> : null}</div>
        </div>
    )
}
export default Display