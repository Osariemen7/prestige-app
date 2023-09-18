import React, { useState, useEffect } from 'react';
import bank from './images/bank.svg';
import Line from './images/Line 1.svg';
import stack from './images/stack.svg';
import sidearrow from './images/sidearrow.svg';
import money from './images/money.svg';
import club from './images/club.svg';
import { Link, useNavigate } from 'react-router-dom';


const Dashboard =()=>{
  const [users, setUsers] = useState('');
  const [hidden, setHidden] = useState("******");
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(true);

  const showSidebar = () => setSidebar(!sidebar)
  
  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  let name = tok.user
  
 
  const project = (task) => {
    if (task === 'Create your First Project' || task === 'Create a new Project') {
      navigate('/components/project');
    } else if (task === 'Transfer Funds from Main Account') {
      navigate('/components/accounts');
    } else if (task === 'Fund Your Main Account') {
      navigate('/components/fund');
    } else {
      navigate('/components/club');
    }
  };
  // useEffect(() => {
  //   const reloadCount = sessionStorage.getItem('reloadCount');
    
  //   if (!reloadCount || reloadCount < 2) {
  //     const updatedReloadCount = reloadCount ? parseInt(reloadCount) + 1 : 1;
  //     sessionStorage.setItem('reloadCount', String(updatedReloadCount));
  //     window.location.reload();
  //   } else {
  //     sessionStorage.removeItem('reloadCount');
  //   }
  // }, []);
  
  
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
      let respet = await fetch("https://api.prestigedelta.com/tasks/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
      respet = await respet.json();
      response = await response.json()
      localStorage.setItem('user-info', JSON.stringify(tok))
      if (response.status === 401){
        navigate('/components/login')
      } else {
     setLoading(false)
     setUsers(response)
     setInfo(respet)
      }
       
     }
  
    useEffect(() => {
      fetchData()
    }, [])
    console.log(tok)
    console.log(info.tasks)
//   useEffect(() => {
//     fetch('https://sandbox.prestigedelta.com/accounts/')
//       .then(response => response.json())
//       .then(json => setData(json))
//       .catch(error => console.error(error));
//     }, []);
//     let wark = JSON.stringify(data)
let wark =users[0]

console.log(users) 


const toggleHidden =()=>{
  
        if(hidden==="******")
        {let gal =(wark.main_balances.available_balance).toLocaleString('en-US')
          
         setHidden(`₦${gal}`)
         return;
        }
        setHidden("******")
      }
    
      if(loading){
        return(
          <p>Loading...</p>)
      }      
    return(
        <div>
            <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-house"></i>
                    <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                  <p className='dfp'>Project</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/club' className='nav-text'><i class="fa-solid fa-people-group home"></i>
                     <p className='dfp'>Club</p></Link>
                    </li>
                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>  
                </ul>
            </nav>

            <h3 className='dah3'>Hi, {name.first_name} </h3>
            <div className='dash'>
                <p className='dp'>Total Balance</p>
                
                { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                <h1 className='h1'>{hidden}</h1>
                <img src={Line} alt=''/><br/>
                <Link to='/components/fund'>
                   <button className='dbut'>Add Money</button>
                </Link>
            </div>
            <div className="dflex">
                <img src={bank} alt=''/>
                <div>
                  <h3 className='dh3'>Access to Finance</h3>
                  <p className='dfp'>Get access to loan when you save 30% of your estimated project amount</p>
                </div>   
            </div>
            <p className='l'>{info.label}</p>
            {(info.tasks).map((obj, index) =>
            <div className='dflex1' onClick={() => project(obj.task)}>
                <img src={stack} alt='' />
                
                <div key={index}>
                    <h4 className='dh3'>{obj.task}</h4>
                    <p className='dfp'>{obj.message}</p>
                </div>
                <img src={sidearrow} alt='' />
            </div>)}
                
        </div>
    )
}
export default Dashboard