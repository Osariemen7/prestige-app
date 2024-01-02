import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Resident =()=>{
    const [message, setMessage] = useState("");
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [category, setCategory] = useState('')
    const [business_name, setBusiness] = useState('')
    const [account, setAccount] = useState('')
    
    const [business_type, setBustype] = useState('')
    const [create_anchor_user, setCreateanchoruser] = useState(true);
    
    const navigate = useNavigate();
    const location = useLocation()

    const pers = location.state.data
    const handleCity =(event)=>{
        setCity(event.target.value)
    }
        const handleState =(event)=>{
        setState(event.target.value)
    }
        const handleAddress =(event)=>{
        setAddress(event.target.value)
    }
    const handleCategory = (event) =>{
        setCategory(event.target.value)
    }
    let tok = JSON.parse(localStorage.getItem("user-info"));
    const terms = (tok) => {
        let refreshval;
      
        if ( typeof tok ==='undefined' || tok === null) {
          refreshval = 0;
        } else {
          refreshval = tok.refresh_token;
        }
      
        return refreshval;
      };
      let refresh = terms(tok)
    
    async function bus(e) {
        e.preventDefault();
        let gender =pers.gender
        let is_customer = true
        
        let dob = pers.dob
        let bvn = pers.bvn
        let ite ={refresh}
        let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(ite)
        });
        rep = await rep.json();
        let bab = rep.access_token
        
          setCreateanchoruser(create_anchor_user)
          console.warn(gender, address, dob, bvn, city, state, is_customer, create_anchor_user)
          let item = {gender, address, dob, bvn, city, state, is_customer, create_anchor_user};
          let result = await fetch ('https://api.prestigedelta.com/updateuser/',{
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
            setAccount('create')
          localStorage.setItem('user-info', JSON.stringify(tok)) 
          
          }
        }
        async function fetchData(){
          let ite ={refresh}
          let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(ite)
          });
          rep = await rep.json();
          let bab = rep.access_token
            
            let item = {   
            };
            let result = await fetch ('https://api.prestigedelta.com/createaccount/',{
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json',
                  'accept' : 'application/json',
                  'Authorization': `Bearer ${bab}`
             },
             body:JSON.stringify(item)
            });
            if (result.status !== 201 ) {
              result = await result.json()
              setMessage(JSON.stringify(result.message));
            } else {
              result = await result.json();
            localStorage.setItem('user-info', JSON.stringify(tok)) 
            navigate('/components/getin')
            }
        }
        useEffect(() => {
          if (account !== '') {
            fetchData();
          }
        }, [account]);
       
    const handleSubmit=(e)=>{
        e.preventDefault()
        let data ={city, state, address, pers}
        if ( city.length < 1 || state.length < 1 || address.length < 1){
          setMessage('All Fields must be Filled')
        }
        else {
        
        navigate('/components/rebout', {state:{data}})
      }}
    return(

        <div>
            <h2>Enter your Residential Address</h2>
                <p className='sp'>Residential Address</p>
                <input type="text" onChange={handleAddress} className="line" placeholder="Enter Residential Address"/><br/>
                 <p className='sp'>State</p>
                 <select onChange={handleState} className="line" placeholder="Enter State">
                    <option></option>
                    <option>Abia</option>
                    <option>Adamawa</option>
                    <option>Akwa-ibom</option>
                    <option>Anambra</option>
                    <option>Bauchi</option>
                    <option>Bayelsa</option>
                    <option>Benue</option>
                    <option>Borno</option>
                    <option>Cross-Rivers</option>
                    <option>Delta</option>
                    <option>Ebonyi</option>
                    <option>Edo</option>
                    <option>Ekiti</option>
                    <option>Enugu</option>
                    <option>FCT</option>
                    <option>Gombe</option>
                    <option>Imo</option>
                    <option>Jigawa</option>
                    <option>Kaduna</option>
                    <option>Kano</option>
                    <option>Kastina</option>
                    <option>Kebbi</option>
                    <option>Kogi</option>
                    <option>Kwara</option>
                    <option>Lagos</option>
                    <option>Nasarawa</option>
                    <option>Niger</option>
                    <option>Ogun</option>
                    <option>Ondo</option>
                    <option>Osun</option>
                    <option>Oyo</option>
                    <option>Plateau</option>
                    <option>Rivers</option>
                    <option>Sokoto</option>
                    <option>Taraba</option>
                    <option>Yobe</option>
                    <option>Zamfara</option>

                    </select>
                 <br/>
                 <p className='sp'>City</p>
                 <input className="line" onChange={handleCity} type="text" placeholder="Enter City" /><br/>
                 <p className='sp'>Select Category</p>
                 <select onChange={handleCategory} className="line" placeholder="Enter State">
                    <option></option>
                    <option>Customer</option>
                    <option>Business Owner</option>
                    </select>
                 <div className="message">{message ? <p>{message}</p> : null}</div>
               {category === 'Customer'?<button className="pog" onClick={bus}>Next</button> : <button className='pog' onClick={handleSubmit} type="submit">Next</button>
                   }    </div>
    )
}
export default Resident