import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"

const Accounts =()=> {
  const [info, setInfo] = useState([
    {
        "id": 2,
        "name": "first",
        "status": "inactive",
        performance: 0.0,
        my_membership: {
            "member": {
                "phone_number": "2349020161808",
                "first_name": "Osagumwenro",
                "last_name": "Aibueku",
                "username": "2349020161808",
                "email": "aibuekuosagumwro@gmail.com"
            },
            "invite_code": "CNZ33",
            "admin": false,
            "super_admin": false,
            "valid_admin": true,
            "invited_by": {
                "phone_number": "2348069234749",
                "first_name": "Osariemen",
                "last_name": "Aibueku",
                "username": "2348069234749",
                "email": "osariemwen7@gmail.com"
            },
            "performance": 0.0,
            "member_status": "Very poor",
            "projects_no": "6",
            "in_default": false,
            "blacklisted": false,
            "invite_slots": "5",
            "last_deposit": null,
            "join_date": "2023-06-24T12:49:54.777962Z"
        },
        "members_no": "2",
        "projects_no": "14",
        "members": [
            {
                "member": {
                    "phone_number": "2348069234749",
                    "first_name": "Osariemen",
                    "last_name": "Aibueku",
                    "username": "2348069234749",
                    "email": "osariemwen7@gmail.com"
                },
                "invite_code": "JHC9",
                "admin": false,
                "super_admin": true,
                "valid_admin": true,
                "invited_by": {
                    "username": ""
                },
                "performance": 0.0,
                "member_status": "Very poor",
                "projects_no": "8",
                "in_default": false,
                "blacklisted": false,
                "invite_slots": "4",
                "last_deposit": null,
                "join_date": "2023-06-23T20:23:36.242026Z"
            }
        ]
    }
])
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const navigate= useNavigate()
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
  let response = await fetch("https://api.prestigedelta.com/accounts/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  response = await response.json()
  localStorage.setItem('user-info', JSON.stringify(tok))
 if (response.status === 401){
     navigate('/components/login')
  } else {
 setUsers(response)
  }}

useEffect(() => {
  fetchData()
}, [])
let wark =users[0]

const toggleHidden =()=>{
           if(hidden==="******")
           {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
             
            setHidden(`₦${gal}`)
            return;
           }
           setHidden("******")
         }
         
         const fetchInfo = async () => {
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
        let response = await fetch("https://api.prestigedelta.com/transactionlist/?start_date=01/31/2023&end_date=07/31/2023",{
        method: "GET",
        headers:{'Authorization': `Bearer ${bab}`},
        })
        response = await response.json()
        if (response.status !== 200) {
          navigate(window.location.pathname, { replace: true });
        } else {  
        response = await response.json();}

        setInfo(response)
      
        }
        useEffect(() => {
          fetchInfo()
          }, [])
if (info.length < 1)        
return(
     
        <div>
        <Helmet>
            
            <title>Transactions</title>
            
        </Helmet>
           <div className="dash">
              <h3 className="h1">Account</h3>
              <p className='dp'>Total Balance</p>
              { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
              <h1 className="h1">{hidden}</h1>
             
           </div>
            <div className="acct">
               <Link to='/components/fund'><button className='abut'>Add Fund</button></Link> 
               <div>
                  <Link to='./transact'><button className='abut'>Transfer</button></Link>
               </div>
              
                <button className='abut'>Overdraft</button>
              </div>
              <p className='l'>RECENT TRANSACTIONS</p>
              <p className='ad'>no transaction yet</p>

          <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                  
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                <Link to='/components/club'><i class="fa-solid fa-people-group home"></i></Link>
                  
                  <p className='dfp'>Club</p>
                </div>
                <div>
                  <i class="fa-solid fa-wallet home1"></i>
                  <p className='dfp'>Account</p>
                </div> 
            </footer> 
        </div>
    )
    return(
      <div>
             <div className="dash">
                <h3 className="h1">Account</h3>
                <p className='dp'>Total Balance</p>
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className="h1">{hidden}</h1>
                <div className="acct">
                 <Link to='/components/fund'><button className='abut'>Add Fund</button></Link> 
                 <div>
                    <Link to='./transact'><button className='abut'>Transfer</button></Link>
                 </div>
        
                  <button className='abut'>Overdraft</button>
                </div>
             </div>
              
          <p className='l'>RECENT TRANSACTIONS</p>
          {info.map((obj, index) => 
                  <div className='td'>
                  <div className='tl'>
                       <p key={index}>{obj.classification}</p>
                       <p key={index}>{obj.amount}</p>
                  </div>
                  <div className='tg'>
                       <p  key={index}>{obj.status}</p>
                       <p key={index}>{(new Date(obj.time)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                  </div>
                       <p className='tm' key={index}>{obj.narration}</p>
                  </div>
                       )}
                       <footer className='dflex2'>
                  <div>
                    <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                    <p className='dfp'>Home</p>
                  </div>
                  <div>
                  <Link to='/components/project'><i class="fa-solid fa-layer-group home"></i></Link>
                    <p className='dfp'>Project</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-people-group home"></i>
                    <p className='dfp'>Club</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-wallet home1"></i>
                    <p className='dfp'>Account</p>
                  </div> 
              </footer> 
      </div>
   )
}
export default Accounts