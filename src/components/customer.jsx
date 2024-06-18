import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav } from './nav.jsx'

const Customer =()=>{
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [sidebar, setSidebar] = useState('')

    const showSidebar = () => setSidebar(!sidebar)
 let tok= JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
       let refreshval;

  if ( tok === null || typeof tok === "undefined" ) {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }
  return refreshval;
};

let refresh = terms(tok)
    const fetchData = async () => {
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
      let response = await fetch("https://api.prestigedelta.com/businessprofile/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } else { 
       
      response = await response.json();
      setLoading(false)
      setList(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])
        console.log(list)
        console.log(list[0])
        const createLoy=()=>{
          navigate('/components/custloy')
       }

       const getLoy=()=>{
         navigate('/components/getloy')
      }
        
      let sub_account = tok.user.has_default_sub_accounts
      const subAccount = () => {
        const redirectTo = sub_account ? '/components/savings' : '/components/reboard';
        navigate(redirectTo);
      };

if(loading) {
            return(
            <p>Loading...</p>)}
            let myArray= list[0].customers 
        
              //const spaceIndex = list[0].customers[0].customer_name.indexOf(' ');
              const customer=(index)=>{
                const data = list[0].customers[index]
                 navigate('/components/cusdet', {state:{data}})
              }
                    
    return(
        <div>
        <Nav />
           <h3 className='saed'>Business Profile</h3>
           <p className='svin'>Get to know your customers</p>
           <h4 className='clun'>{list[0].business_name}</h4>
           <div style={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
           <div className='clup'>
          <div className='blc'>
            <p className='dnc'>Nature of business</p>
            <h4 className='cbl'>{list[0].business_nature}</h4>
          </div>
          <div className='blc'>
            <p className='dnc'>Business Transaction Count</p>
            <h4 className='cbl'>{list[0].transaction_count}</h4>
          </div>
        </div>
        <div className='clup'>
          <div className=' blc'>
            <p className='dnc'>Business Transaction Value </p>
            <h4 className='cbl'>{list[0].total_revenue}</h4>
          </div>
          <div className='blc'>
            <p className='dnc'>Customer Base</p>
            <h4 className='cbl'>{list[0].customer_base}</h4>
          </div>
        </div>
        <div className='clup'>
          <button className='loyb' onClick={createLoy}>Create Loyalty program</button>
          <button className='loyb' onClick={getLoy}>Manage Loyalty program</button>
        </div>
        </div>
        <div className='mobile-view'>
        <h3>Customers</h3>
        { myArray.length > 0 && typeof myArray[0] === 'object' ?(
        <div>
        {list[0].customers.map((obj, index) =>
            
            <div key={index} className='xp' onClick={() => customer(index)}>
                  <h4 className='cbl'>{obj.customer_name}</h4>
                <div className='zp'>
                  <p className='dnc'>Total amount spent:</p>
                  <h5 className='dnc'>₦{(obj.total_value).toLocaleString('en-US')}</h5>
                  </div>

                <div className='zp'>
                      <p className='dnc'>No of Transactions</p>
                       <h4 className='dnc'>{obj.total_volume}</h4>
                 </div>
                 <div className='zp'>
                  <p className='dnc'>Last Transaction: </p>
                  <h4 className='dnc'>{(new Date(obj.last_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
               </div>             
              </div> )}
        </div>
        ):(
        <p></p>)}
        </div>
        <div className='desktop-view'>
          <div className='content'>
          <h3>Customers</h3>
        { myArray.length > 0 && typeof myArray[0] === 'object' ?(
        <div>
        {list[0].customers.map((obj, index) =>
            
            <div key={index} className='xp' onClick={() => customer(index)}>
                  <h4 className='cbl'>{obj.customer_name}</h4>
                <div className='zp'>
                  <p className='dnc'>Total amount spent:</p>
                  <h5 className='dnc'>₦{(obj.total_value).toLocaleString('en-US')}</h5>
                  </div>

                <div className='zp'>
                      <p className='dnc'>No of Transactions</p>
                       <h4 className='dnc'>{obj.total_volume}</h4>
                 </div>
                 <div className='zp'>
                  <p className='dnc'>Last Transaction: </p>
                  <h4 className='dnc'>{(new Date(obj.last_transaction)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</h4>
               </div>             
              </div> )}
        </div>
        ):(
        <p></p>)}

          </div>
        </div>
               
        </div>
    )
}
export default Customer