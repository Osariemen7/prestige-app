import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
let tok= JSON.parse(localStorage.getItem("user-info"));
const terms = (tok) => {
  let refreshval;

  if (tok === null || typeof tok === 'undefined')  {
    refreshval = 0;
  } else {
    refreshval = tok.refresh_token;
  }

  return refreshval;
};
let refresh = terms(tok)
const CreatePage =()=>{
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [refr, setRefre] = useState(refresh)
    

   
    const handleName =(event)=> {
        setName(event.target.value)
    }
   
  
    const create = (e) => {
        e.preventDefault()
        setRefre(refr)
        console.warn(name, refr)
        let data = {name, refr}
        if (name.length > 1 ) {
            
            navigate('/components/save', {state:{data}})
            
          } else {
            setMessage("All fields must be filled");
          }   
    }
    
    console.log(refr)
    return(
        <div>
        <Link to='/components/pop'><i class="fa-solid fa-chevron-left bac"></i></Link>
            
           <h3 className="head">Create Project</h3>
           <p className='ptt'>A descriptive name makes your project memorable</p>
           <form>
              <p className="sp">Project Name</p>
              <input className="line" onChange={handleName} type="text" placeholder="Enter name of Project" /><br/>
              
              <div className="message">{message ? <p>{message}</p> : null}</div>
              <button type="submit" onClick={create} className="logb">Continue</button>
           </form>
        </div>
    )
}
export default CreatePage