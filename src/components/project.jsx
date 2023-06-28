import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import plus from './images/plus.svg';

  
   

const ProjectPage =()=>{
    const [users, setUsers] = useState('');
     const [hidden, setHidden] = useState("******");
    const [info, setInfo] = useState('')
    const navigate = useNavigate()
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
      
      if (response.status === 401) {
        navigate('/components/login');
      } else {  
      response = await response.json();}
    
      setInfo(response)
        }
  
    useEffect(() => {
      fetchDa()
    }, [])
  
      const toggleHidden =()=>{
        if(hidden==="******")
        {let gal =(info[0].balance).toLocaleString('en-US')
          
         setHidden(`₦${gal}`)
         return;
        }
        setHidden("******")
      }

    
   // let nam =parseInt( info[0].target_equity)/parseInt(info[0].target) * 100
    
   // console.log(nam) 
   console.log(tok)
   console.log()
  const show=()=>{
    
     navigate('/components/Addlist')
  } 
   
 if(info.length < 1){
    return(
        <div>
        <h2 className='head'>Project</h2>
        <div className="dash1">
           <p className='dp'>Total Balance</p>
           <h1 className='tp'>₦0</h1>
        </div>
        <p className='l'>PROJECT PLANS</p>
        <div className='opend'>
            <p>You have no active project plan yet.<br /> To access low interest credit, create your first project</p>
        </div>
         <Link to='/components/pop'>
         <button className='plus'>Create First Project</button></Link>
        <footer className='dflex2'>
      <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>  
        <i class="fa-solid fa-layer-group home1"></i>
        <Link to='/components/club'><i class="fa-solid fa-people-group home"></i></Link>
        <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
          
        </footer>
        
    </div>    
    
    )} else{
        return(
            <div>
            <div className="dash">
                    <h3 className="h1">Project</h3>
                    <p className='dp'>Total Balance</p>
                    { hidden ? <i onClick={toggleHidden} class="fa-regular fa-eye-slash see"></i> : <i class="fa-regular fa-eye see" onClick={toggleHidden}></i>}
                    <h1 className="h1">{hidden}</h1>
            </div>
            <p className='l'>PROJECT PLANS</p>
            {info.map((obj, index) =>
            <div onClick={show} className='pd'>
                <div className='pp'>
                <p className='pn' key={index}>{obj.name}</p>
                    <p className='prog'>In Progress</p>
                </div>
                <div className='pp'>
                    <p key={index}>₦{(obj.target).toLocaleString('en-US')}</p>
                    <p key={index}>{parseInt( obj.equity)/parseInt(obj.target) * 100}% </p>
                </div>
                <div className="progress-b" style={{ width: `${100}%` }}>
                <div className="progress-bar" style={{ width: `${parseInt( obj.equity)/parseInt(obj.target) * 100}%` }}>
                   </div> </div>
                
            </div>)}
            <Link to='/components/pop'>
         <button className='logb'>New Project</button></Link>
         <footer className='dflex2'>
                <div>
                <Link to='/components/dash'><i class="fa-solid fa-house home"></i></Link>
                  
                  <p className='dfp'>Home</p>
                </div>
                <div>
                <i class="fa-solid fa-layer-group home1"></i>
                  <p className='dfp'>Project</p>
                </div>
                <div>
                <Link to='/components/club'><i class="fa-solid fa-people-group home"></i></Link>
                  <p className='dfp'>Club</p>
                </div>
                <div>
                <Link to='/components/accounts'><i class="fa-solid fa-wallet home"></i></Link>
                  
                  <p className='dfp'>Account</p>
                </div> 
            </footer>
            </div>
        )
    }
}
export default ProjectPage
