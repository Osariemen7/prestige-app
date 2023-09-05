import { useState, useEffect } from 'react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
const Receipt=()=> {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate()
    const location = useLocation()
    let meal = location.state.ite

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
      setLoading(false)
      setList(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])
    
    const handleCaptureClick = async () => {
        const mainElement = document.getElementById('main-element');
        const canvas = await html2canvas(mainElement);
        const dataURL = canvas.toDataURL('image/png');
        downloadjs(dataURL, 'download.png', 'image/png');
      }
    console.log(meal)
    if(loading) {
      return(
      <p>Loading...</p>)}
    return(
        <div>
        <Link to='/components/getgroup'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <main id="main-element">
                <h3>Request successfully processed</h3>
                <h3>Tranfer of ₦{(parseInt(meal.amount)).toLocaleString('en-US')} to<br/> {meal.account_name}</h3>
                <div className="vasa1">
                    <p>Date</p>
                    <p>{(new Date()).toDateString('en-GB')}</p>
                </div>
                <div className="vasa">
                <p>Account Number</p>
              <p>{meal.nuban}</p>
                </div>
                <div className="vasa2">
               <p>Bank</p>
               <p>{meal.bank}</p>
           </div>
              <div className="vasa1">
                <p>Narration</p>
                <p>{meal.narration}</p>
              </div>
           <div className="space"></div>
            </main>
            <button className="logb" onClick={handleCaptureClick}>Save</button>
        </div>
    )
}
export default Receipt