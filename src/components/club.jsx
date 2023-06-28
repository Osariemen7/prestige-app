import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Club = () => {
    const [info, setInfo] = useState('')
    const [users, setUsers] = useState('')
    const [loading, setLoading] = useState(true)
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
  let response = await fetch("https://api.prestigedelta.com/members/",{
  method: "GET",
  headers:{'Authorization': `Bearer ${bab}`},
  })
  response = await response.json()
  localStorage.setItem('user-info', JSON.stringify(tok))
//   if (data.code === 'token_not_valid'){
//     navigate('/components/token')
//   } else {
 setUsers(response)
  }
  useEffect(() => {
    fetchData()
  }, [])
console.log(users)
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
      let response = await fetch("https://api.prestigedelta.com/group/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } 
      else if(response.status === 400){
        navigate('/components/fclub')
      }
      else {  
      response = await response.json();
      setLoading(false)
      setInfo(response)
        }
    }
  
useEffect(() => {
      fetchDa()
    }, [])
    
   if(loading) {
      return(
      <p>Loading</p>)
    }else{
        return(
            <div>
            <h2 className='head'>Group</h2>
            
                <div  className='pd'>
                    <div className='pp'>
                    <p className='pn' >Your Progress</p>
                        <p className='prog'>On Track</p>
                    </div>
                    <div className='ppn'>
                        <p >Average Total of Project</p>
                        <p>{info[0].my_membership.performance * 100}% </p>
                    </div>
                    <div>
                      <div className="progress-b" style={{ width: `${100}%` }}>
                      <div className="progress-bar" style={{ width: `${info[0].my_membership.performance *100}%` }}>
                       </div> </div>
                     
                    </div>
                   
                </div>
                <div>
  {info[0].my_membership.super_admin === true ? (
    <p>Invite Code: {info[0].my_membership.invite_code}</p>
  ) : null}
</div>
                <p></p>
               <div className='clup'>
                <div className='clu'>
                  <p className='clund'>Group Performance</p>
                 <h3 className='clun'>{info[0].performance}%</h3>
                </div>
                <div className='clu'>
                    <p className='clund'>Number of Users</p>
                    <h3 className='clun'>{info[0].members_no}</h3>
                </div>
               </div>
               <div className='clup'>
                <div className='clu'>
                  <p className='clund'>Total Number of Projects</p>
                  <h3 className='clun'>{info[0].projects_no}</h3>  
                </div>
                <div className='clu'>
                    <p className='clund'>Group Status</p>
                    <h3 className='clun'>{info[0].status}</h3>
                </div>
               </div>
               <h3>Members</h3>
               <div>
               {users.map((obj, index) =>
                <div className='cpp'>
                    <div className='cprof' key={index}>{obj.member.first_name[0]}{obj.member.last_name[0]}</div>
                    <div className='cprog'>
                    <p className='cpn' key={index}>{obj.member.first_name} { obj.member.last_name}</p>
                    <div className="progress-b" style={{ width: `${100}%` }}>
                      <div className="progress-bar" style={{ width: `${obj.performance *100}%` }}>
                       </div> </div>
                    </div>  
                    <h3 key={index}>{obj.performance * 100}% </h3>    
                </div>)}
               </div>
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
                  <i class="fa-solid fa-people-group home1"></i>
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
export default Club