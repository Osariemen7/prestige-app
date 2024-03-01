import { useState, useEffect } from 'react';
import {  useLocation, Link, useNavigate } from "react-router-dom";
import html2canvas from 'html2canvas';
import Logo from './images/Logo.png';
import jsPDF from 'jspdf';
import Modal from 'react-modal';
import html2pdf from 'html2pdf.js';
import { ChakraProvider } from '@chakra-ui/react';
import { Button, Heading, Text } from '@chakra-ui/react'
import { BootstrapButton, ValidationTextField, CssTextField, ValidationEyeField} from './material.js'



const SalesInvoice =()=> {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [quantity, setQuatity] = useState([]);
    const [price, setPrice] = useState([]);
    const [tip, setTip] = useState([]);
    
    const [inputVal, setInputVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputVa, setInputVa] = useState('')
    const [inputV, setInputV] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [customer, setCustomer] = useState('');
    const [inpu, setInpu] = useState('');
    const [number, setNumber] = useState('')
    const [val, setVal] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    let meal = location.state.data

    const [item, setItem] = useState(meal.time)

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
const handleFormSubmit = (event) => {
    event.preventDefault();
    const newCustomer = customer || inpu;
    const newNumber = number || val
    const date = item || inputVa
    setItem(date);
    setInputVa('');
    setCustomer(newCustomer)
    setInpu('')
    setNumber(newNumber)
    setVal('')
    closeModal()
  }
  
  let tota = meal.amount
  let total = (tota).toLocaleString('en-US')

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleCust = (event) =>{
    setInpu(event.target.value)
  }
   const handlePhone =(event) => {
    setVal(event.target.value)
   }
  
  const handleInputchan = (event) => {
    setInputVa(event.target.value)
  }
  const currentDate = new Date(); // Get the current date

const thirtyDaysBefore = new Date(); // Create a new Date object
    thirtyDaysBefore.setDate(currentDate.getDate() - 90)  

 
  function toSentenceCase(inputString) {
    if (!inputString) return inputString; // Handle empty or null input
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

const fetchDat = async () => {
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
      let response = await fetch("https://api.prestigedelta.com/virtualnuban/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } else {     
      response = await response.json();
      setTip(response)
}
}
useEffect(() => {
  fetchDat()
  }, [])
  

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
      
      setList(response)
        }}
        useEffect(() => {
          fetchData()
        }, [])
        

        const sharePdf = async () => {
          try {
            const content = document.getElementById('main-element'); // Replace with the actual ID of your webpage content
        
            const options = {
              margin: 10,
              filename: new Date().toLocaleDateString('en-US'),
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
        
            html2pdf(content, options, async (pdf) => {
              try {
                const blob = await pdf.output('blob');
                const dataUrl = URL.createObjectURL(blob);
        
                if (navigator.share) {
                  await navigator.share({
                    title: toSentenceCase(list[0].business_name),
                    text: 'Here is your receipt/invoice.',
                    url: dataUrl,
                  });
                } else {
                  // Fallback for browsers that don't support Web Share API
                  console.log('Web Share API not supported.');
                  // You can implement your custom sharing logic here for unsupported browsers.
                }
        
                // Revoke the object URL to free up resources
                URL.revokeObjectURL(dataUrl);
              } catch (error) {
                console.error('Error sharing PDF:', error);
              }
            });
          } catch (error) {
            console.error('Error generating PDF:', error);
          }
        };
        
        const handleCaptureClick = async () => {
            const mainElement = document.getElementById('main-element');
            const canvas = await html2canvas(mainElement);
            const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for page size
    
        // Calculate the width and height to fit the whole canvas on the PDF
        const imgWidth = 210; // A4 page width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
        // Add the captured image to the PDF
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);
    
        // Save the PDF
        pdf.save(`${customer} receipt`);
    }

    
    const salesTra  = async () => {
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
    let response = await fetch(`https://api.prestigedelta.com/salestransactions/?start_date=${thirtyDaysBefore.toLocaleDateString('en-US')}&end_date=${(new Date()).toLocaleDateString('en-US')}&name=INVENTORY`,{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    
    if (response.status === 401) {
      navigate('/components/login');
    } else {  
    response = await response.json();}
    setLoading(false)
    setPrice(response)
    }
    useEffect(() => {
      if( typeof list !== 'undefined')
      salesTra()
      }, [list])
    
    console.log(meal)
        if(loading) {
          return(
          <p>Loading...</p>)}

          const finfo = price.sales.find(sale => sale.id === meal.id)
          console.log(finfo)
    return(
        <div>
        <Link to='/components/inventory'><i class="fa-solid fa-chevron-left bac"></i></Link>
            <main id="main-element"><ChakraProvider>
              <Button colorScheme='black' variant='outline'>{toSentenceCase(list[0].business_name)}</Button>
            
            
          {finfo.verified === true? <h5 className='invo'>RECEIPT</h5>: <h5 className='invo'>INVOICE</h5>}   
            {finfo.verified === true? <div><Heading fontSize='14px' className='saed'>Receipt for: {customer} -<span> {number}</span></Heading></div>:<div><h6 className='saed'>Bill To: {customer} -<span> {number}</span></h6></div>}
            <p className='ld'>{(new Date(item)).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
            
            <hr className='hr'></hr>
                        
          <div className='grn'>
            <div className='cule'>
                <Heading fontSize='13px'>Item</Heading>
                <Heading fontSize='13px'>Quantity</Heading>
                <Heading fontSize='13px'>Amount</Heading>
                <Heading fontSize='13px'>Quantity Type</Heading>
            </div>
    
            {meal.sold_products.map((obj, index) => (
            <div className='vcules' key={index}>
                 
                
                     <p key={index} className=''>{obj.product_name}</p>               
                
                     <p key={index}>{obj.sold_quantity}</p>
                
                    <p key={index} style={{marginLeft:'5%' }}>₦{parseFloat(obj.sold_amount).toLocaleString('en-US')}</p>
                     <p key={index}>{obj.quantity_type}</p>
                </div>))}
                    <p className='cveh'>Total: ₦{total}</p>
                    
                <div className='cule'>
                <p>Received:</p>
                <p></p>
                <p>₦{(meal.amount).toLocaleString()}</p>
                </div>
                </div> 
             {finfo.verified === true? (<div> <p className='font'>Thank you for your Patronage!!!</p>
                <p className='font'>Phone No: {list[0].owner_phone}</p>
                <p className='font'>{list[0].owner_email}</p>
                <p className='font'>{list[0].address}</p></div>):
                <div>
                <p className='font'>₦{total} Payment should be sent to</p>
                <p className='font'>Account No: {tip.account_number}</p>
                <p className='font'>Account Name: {tip.account_name}</p>
                <p className='font'>Bank: {tip.bank}</p>
                <p className='font'>Thank you for your Patronage!!!</p>
         
                </div>}  
                <img src={Logo} style={{marginLeft: '5%'}} alt="logo" className="frame2"/>
                </ChakraProvider> 
                </main>
                <ChakraProvider>
                {customer !== ''   ? (<Button colorScheme='blue'  onClick={sharePdf}>Share</Button>) : <Button colorScheme='blue' onClick={openModal}>Add Customer Name</Button> }
                </ChakraProvider>
           <Modal
            className='modal'
            isOpen={isOpen}
             onRequestClose={closeModal}
               contentLabel="Example Popup">
        <i class="fa-solid fa-x mx" onClick={closeModal}></i>
           <h3 className='h4'>Add Customer details</h3>
            <form >
            {customer === ''? (  <CssTextField label="Customer Name" onChange={handleCust} id="custom-css-outlined-input" />): null}
            <br/><br/>{number === ''? (<CssTextField label="Customer Number" onChange={handlePhone} type='number' id="custom-css-outlined-input" />): null}
             
             <br/><br/> <BootstrapButton  onClick={handleFormSubmit} variant="contained">Add</BootstrapButton> 
                
            </form>
            </Modal> 
        </div>
    )
}
export default SalesInvoice