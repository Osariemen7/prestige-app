import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import plus from './images/plus.svg';

  
   

const ProjectPage =()=>{
    const [users, setUsers] = useState('');
     const [hidden, setHidden] = useState("******");
    const [info, setInfo] = useState('')
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
      //localStorage.setItem('user-info', JSON.stringify(tok))
      let respon = await fetch("https://api.prestigedelta.com/projects/",{
        method: "GET",
        headers:{'Authorization': `Bearer ${bab}`},
        })
      if (response.status === 401) {
        navigate('/components/login');
      } else {  
      response = await response.json();
      respon = await respon.json()
      setUsers(respon)
      setInfo(response)
      }}
  
    useEffect(() => {
      fetchDa()
    }, [])
    const show=(index)=>{
      const data = info[index]
       navigate('/components/Addlist', {state:{data}})
    }
  
      const toggleHidden =()=>{
        if(hidden==="******")
        {let gal =(users.total_balance).toLocaleString('en-US')
          
         setHidden(`₦${gal}`)
         return;
        }
        setHidden("******")
      }
     
    
   // let nam =parseInt( info[0].target_equity)/parseInt(info[0].target) * 100
    
   // console.log(nam) 
   console.log(tok)
   console.log(info)
   
   
 if(info.length < 1){
    return(
      
        <div>
        <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                  <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-house"></i>
                    <p className='dfp'>Home</p></Link>
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
                  <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                  <p className='dfp'>Analytics</p></Link>
                  </li>
                  <li className='nav-list'>
                  <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-cart-flatbed"></i>
                    <p className='dfp'>Inventory</p></Link>
                  </li>
                  <li className='nav-list'>
                  <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                <p className='dfp'>Project</p></Link>
                  </li>
                  <li className='nav-list'>
                  
                  <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                    <p className='dfp'>Log Out</p></Link>
                  </li>  
                </ul>
            </nav>
        <h2 className='head'>Project</h2>
        <div className="dash">
           <p className='dp'>Total Balance</p>
           <h1 className='h1'>₦0</h1>
        </div>
        <p className='l'>PROJECT PLANS</p>
        <div className='opend'>
            <p>You have no active project plan yet.<br /> To access low interest credit, create your first project</p>
        </div>
         <Link to='/components/pop'>
         <button className='logb'>Create First Project</button></Link>
        
        
    </div>    
    
    )} else{
        return(
            <div>
            <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    <li className='nav-list'>
                  <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-house"></i>
                    <p className='dfp'>Home</p></Link>
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
                  <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                  <p className='dfp'>Analytics</p></Link>
                  </li>
                  <li className='nav-list'>
                  <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-cart-flatbed"></i>
                    <p className='dfp'>Inventory</p></Link>
                  </li>
                  <li className='nav-list'>
                  <Link to='/components/project' className='nav-text'><i class="fa-solid fa-layer-group home"></i>
                <p className='dfp'>Project</p></Link>
                  </li>
                  <li className='nav-list'>
                  
                  <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                    <p className='dfp'>Log Out</p></Link>
                  </li> 
                </ul>
            </nav>
            <div className="dash">
                    <h3 className="h1">Project</h3>
                    <p className='dp'>Total Balance</p>
                    { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                    <h1 className="h1">{hidden}</h1>
            </div>
            <p className='l'>PROJECT PLANS</p>
            {info.map((obj, index) =>
            <div onClick={() => show(index)} className='pd'>
            {new Date() < new Date(obj.next_payment_day) ? ( 
                 <p style={{color:'green'}} className='asav1'>Next Payment Date: {(new Date(obj.next_payment_day)).toDateString('en-GB')}</p>): <p style={{color:'red'}} className='asav1'>Next Payment Date: {(new Date(obj.next_payment_day)).toDateString('en-GB')}</p>}
                <p className='asav1'>Amount To pay: ₦{(obj.payment_amount).toLocaleString('en-US')}</p>
                <div className='pp'>
                <p className='pn' key={index}>{obj.name}</p>
                    <p className='prog'>In Progress</p>
                </div>
                <div className='pp'>
                    <p key={index}>₦{(obj.target).toLocaleString('en-US')}</p>
                    <p key={index}>{ Math.round(((parseInt( obj.equity)/parseInt(obj.target) * 100) + Number.EPSILON) * 100) / 100}% </p>
                </div>
                <div className="progress-b" style={{ width: `${100}%` }}>
                <div className="progress-bar" style={{ width: `${parseInt( obj.equity)/parseInt(obj.target) * 100}%` }}>
                   </div> </div>
                <p className='ex'>You must have a minimum down-payment of ₦{(obj.minimum_balance).toLocaleString('en-US')} or loan disbursement will be extended to {(new Date(obj.extension_day)).toDateString('en-GB')}</p>
            </div>)}
            <Link to='/components/pop'>
         <button className='logb'>New Project</button></Link>
         
            </div>
        )
    }
}
export default ProjectPage
