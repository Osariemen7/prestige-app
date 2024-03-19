import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

let refresh = terms(tok);
export const Business =()=>{
    const [name, setName] = useState([])
    const navigate = useNavigate()
    

    function toSentenceCase(inputString) {
        if (!inputString) return inputString; // Handle empty or null input
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }

    
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
export const getAccessToken = async (refresh) => {
  // Function to fetch access token using refresh token
  let item = { refresh };
  let rep = await fetch('https://api.prestigedelta.com/refreshtoken/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(item)
  });

  rep = await rep.json();
  return rep.access_token; // Return the access token
};
export const fetchDat = async (setInfo, navigate,setLoading) => {
  try {
     const bab = await getAccessToken(refresh)
let response = await fetch("https://api.prestigedelta.com/referrals/",{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
response = await response.json()
if (response.status === 401) {
  navigate('/components/login');
} else {  
setInfo(response)
setLoading(false)
}

 }catch (error) {
  console.error("Error fetching products:", error);
  // Handle error
}
}