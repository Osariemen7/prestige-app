import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Business =()=>{
    const [name, setName] = useState([])
    const navigate = useNavigate()
    

    function toSentenceCase(inputString) {
        if (!inputString) return inputString; // Handle empty or null input
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

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
    
      setName(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])

        return toSentenceCase(name[0].business_name);
}
