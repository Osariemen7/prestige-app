import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Getloy = () =>{
    const [total, setTotal] = useState([]);
    const [message, setMessage] = useState('')
    const [loading, setLoading]= useState(true)
    const navigate = useNavigate()
    

    let tok= JSON.parse(localStorage.getItem("user-info"));
    let refresh = tok.refresh_token
    
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
    let response = await fetch("https://api.prestigedelta.com/loyalty/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
    setLoading(false)
    setTotal(response)
      }}
      useEffect(() => {
        fetchDa()
      }, [])
    
    const show=(index)=>{
      const data = total[index]
       navigate('/components/getdet', {state:{data}})
    }
    console.log(total)
    if(loading) {
      return(
      <p>Loading...</p>)} 

    return(
        <div>
         <Link to='/components/customer'><i class="fa-solid fa-chevron-left bac"></i></Link>
           <h3 className='saed'>Loyalty Program</h3>
           <div className='svin'>
              <p>List of your Current Loyalty Programs</p>
             
           </div>
           
            {total.map((obj, index) => ( 
  <div  className='spt'  key={index} onClick={() => show(index)}>
        {/* {obj.budget !== 0 ? ( */}
      <div> <p className='tm'>{obj.name}</p>

        <div className='loyt'>
                 <p className='clun'>
            Percentage Cashback
          </p>
          <p className='clun'>{(obj.cash_back_ratio)* 100}%</p>
          
        </div>
            
      </div>
    {/* ) : ( */}
      <div>
        <div className='bfle'>
          <p className='clun'>Duration</p>
          <p className='clun'>{obj.duration_days} Days</p>
        </div>
             </div>
    {/* )} */}
  </div>
 ))} 

           
        </div>
    )

}
export default Getloy