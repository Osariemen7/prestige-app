
import { useState, useEffect, useRef } from 'react';
import {  Link, useNavigate } from "react-router-dom";
import Logo from './images/Logo.png';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { ChakraProvider } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { useDisclosure, Input, Card, Text, Button, Heading, Stack, Spinner  } from "@chakra-ui/react"
  import {AlertDialogBody, AlertDialog, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogHeader, AlertDialogContent, } from '@chakra-ui/react'

  import { Wheel } from 'react-custom-roulette';
  import { html2pdf } from 'html2pdf.js';

  const data = [
    { option: '0.6', likelihood: 0.3, style:{ backgroundColor: 'red', textColor: 'white' } },
  { option: `0.2`, likelihood: 0.3, style:{ backgroundColor: 'black', textColor: 'white' } },
  { option: `10`, likelihood: 0.1, style:{ backgroundColor: 'green', textColor: 'white' } },
  { option: `0`, likelihood: 0.4, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.1`, likelihood: 0.7, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.4`, likelihood: 0.4, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0`, likelihood: 0.7, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0.2`, likelihood: 0.4, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.1`, likelihood: 0.6, style:{ backgroundColor: 'black', textColor: 'white' }},
  { option: `0`, likelihood: 0.5, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0.5`, likelihood: 0.4, style:{ backgroundColor: 'black', textColor: 'white' } },
  { option: `0.3`, likelihood: 0.4, style:{ backgroundColor: 'red', textColor: 'white' }},
  { option: `0`, likelihood: 0.6, style:{ backgroundColor: 'black', textColor: 'white' }}
  ];
  
const Tinvoice =()=> {
  
  const [mustSpin, setMustSpin] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState('');
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true);
    const [quantity, setQuatity] = useState([]);
    const [price, setPrice] = useState([]);
    const [type, setType] = useState([]);
    const [item, setItem] = useState([])
    const [inputp, setInputp] = useState(0)
    const [inputVal, setInputVal] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputVa, setInputVa] = useState('')
    const [inputV, setInputV] = useState('');
    const [tip, setTip] = useState('')
    const [pack_size1, setPacksize] = useState([]);
    const [product, setProduct] = useState([])
    const [payment_meth, setPayment] = useState('TRANSFER')
    const [outline, setOutline] = useState('');
    const [message, setMessage] = useState('')
    const [messag, setMessag] = useState('Out of Stock please Restock')
    const [mess, setMess] = useState('')
    const [valid, setValid] = useState('');
    const [service, setService] = useState([])
    const [product_type, setProd] = useState('Service')
    const [buttonVisible, setButtonVisible] = useState(true);
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    const navigate = useNavigate()
    console.log(item)

    
    const handleSpinClick = () => {
      if (!mustSpin) {
        spinWheel();
      }
    };
  
    const spinWheel = () => {
      // Calculate the total likelihood
      const totalLikelihood = data.reduce((total, prize) => total + prize.likelihood, 0);
  
      // Generate a random value between 0 and the total likelihood
      const randomValue = Math.random() * totalLikelihood;
  
      // Determine which segment the randomValue falls into
      let currentLikelihood = 0;
      for (const prize of data) {
        currentLikelihood += prize.likelihood;
        if (randomValue < currentLikelihood) {
          setSelectedPrize(prize.option);
          setMustSpin(true);
  
          // Update win count
          
          break;
        }
      }
    };
  
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


// const opti = [
//   ...acct.map((item) => ({
//     label: `${item.name} 
//     (₦${item.balance.available_balance})`,
//     value: item.name,
//   }))]


const optio = ['item', 'pack'];
    const opt = optio.map((p) => ({
      label: p,
      value: p,
    }));

    const optn= ['item'];
    const op = optn.map((p) => ({
      label: p,
      value: p,
    }));
      
    const handleFormSubmit = () => {
      const selectedProduct = inputVa.value // Replace with the actual selected product name
  const rin = product.find(option => option.name === selectedProduct);
  
      if (rin && (rin.item_no === 0 && rin.pack_no === 0)) {
        setMessage('Out of Stock please Restock');
        modal1.onClose()
      } else{
      setQuatity([...quantity, inputValue]);
      setInputValue("");
      setPrice([...price, inputVal]);
      setInputVal('');
      setItem([...item, inputVa]);
      setInputVa('');
      setType([...type, inputV])
      setInputV('');
      setPacksize([...pack_size1, inputp])
      setInputp(0)
      modal1.onClose()
      modal2.onClose()}
    }
  //   const options = [
  //     ...product.map((item) => ({
  //       label: item.name,
  //       value: item.name,
  //       team:  item.pack_size,
  //       mony: item.pack_cost,
  //     }))
  //   ];
    const options = product.map((item) => ({
      label: `${item.name} 
      (Pack:${item.pack_no}, Item:${item.item_no})`,
        value: item.name,
        team:  item.item_no,
        mony: item.pack_no,
    }));

    const opto = service.map((item) => ({
      label: `${item.name}`,
        value: item.name,
        team:  item.item_no,
        mony: item.pack_no,
    }));
    
    // let amount = parseFloat(price) * parseFloat(quantity)
    // let tota =(amount.reduce((total, to) => {
    //   return total + parseFloat (to);
    // }, 0));
    const tota = quantity.reduce((total, q, index) => {
    const itemAmount =parseFloat(q) * parseFloat(price[index]);
    return total + itemAmount;
  }, 0);
    let total = (tota).toLocaleString('en-US')
  let won = (parseFloat(selectedPrize)/100) * tota 
  let tots = won + tota
    const handlePack =(e)=>{
      setInputp(e.target.value)
    }
   
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
    const handleInputChang = (event) => {
      setInputVal(event.target.value);
      
    };
    const handleInputchan = (inputVa) => {
      setInputVa(inputVa)
    }
    const handleInputCha = (inputV) => {
      setInputV(inputV)
    }
    
    
      
    function toSentenceCase(inputString) {
      if (!inputString) return inputString; // Handle empty or null input
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
  const handleAddProduct = (newValue) => {
      if (newValue && newValue.trim() !== '') {
        const newProduct = { label: newValue, value: newValue };
        setInputVa(newProduct);
      }
    };
    const summit = ()=>{
      if(inputV === '' || inputVa === '' || inputValue === '' || inputVal=== '' ){
     setMess('Please fill all the necessary fields')}
     else {
      handleFormSubmit()
      setProd('Product')
     }
    }
    
    const sum = ()=>{
      if( inputVa === '' || inputValue === '' || inputVal=== '' ){
     setMess('Please fill all the necessary fields')}
     else {
      handleFormSubmit()
           }
    }
    
  
  let refresh = terms(tok)

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
    
  
  
  const fetchDas = async () => {
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
    let response = await fetch("https://api.prestigedelta.com/productcatalogue/?product_type=SERVICE",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
    setService(response)
    
      }}
      useEffect(() => {
        fetchDas()
      }, [])

      const fetchDap = async () => {
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
      let response = await fetch("https://api.prestigedelta.com/productcatalogue/?product_type=PRODUCT",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      //localStorage.setItem('user-info', JSON.stringify(tok))
      
      if (response.status === 401) {
        navigate('/components/login');
      } else { 
       
      response = await response.json();
      setProduct(response)
      
        }}
        useEffect(() => {
          fetchDap()
        }, [])

      const creat = async() => {
        handleClick()
        let it ={refresh}
        let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
              'accept' : 'application/json'
         },
         body:JSON.stringify(it)
        });
        rep = await rep.json();
        let bab = rep.access_token
        let pack_size= pack_size1
        let amount = tota
        let payment_method = 'TRANSFER' 
      
        let quantity_type = type.map(tod => tod.value)
        let name = item.map(todo => todo.value)
        console.log(name, price, quantity, quantity_type, pack_size)
        let itemd = {name, price, quantity, quantity_type, pack_size};
        
        const separatedData = itemd.name.map((_, index) => ({
          name: itemd.name[index],
          price:parseInt( itemd.price[index]),
          quantity:itemd.quantity[index],
          quantity_type:itemd.quantity_type[index],
          pack_size:itemd.pack_size[index],
          product_type: product_type,
          amount: amount
        }));
        let products = separatedData
        let ite = {products, payment_method}
      try {
        let result = await fetch('https://api.prestigedelta.com/salestips/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(ite)
        });
              if (result.status !== 200 || product.item_no === 0) {
          const errorResult = await result.json();
          setMessage(JSON.stringify(errorResult))  
        } else {
           result =await result.json();
           
          setMessage(JSON.stringify(result.message))
          spod()
        navigate('/components/salesanalytics', {state:{result}})
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      }   
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
        setLoading(false)
        setList(response)
          }}
          useEffect(() => {
            fetchData()
          }, [])
          const handleClick = () => {
            // When the button is clicked, setButtonVisible to false
            setButtonVisible(false);
            setTimeout(() => {
              setButtonVisible(true);
            }, 10000);
          };

          const handleDeleteItem = (index) => {
            // Create copies of state arrays
            const newItemArray = [...item];
            const newQuantityArray = [...quantity];
            const newPriceArray = [...price];
            const newTypeArray = [...type];
          
            // Remove the entire row at the specified index
            newItemArray.splice(index, 1);
            newQuantityArray.splice(index, 1);
            newPriceArray.splice(index, 1);
            newTypeArray.splice(index, 1);
          
            // Update state with the new arrays
            setItem(newItemArray);
            setQuatity(newQuantityArray);
            setPrice(newPriceArray);
            setType(newTypeArray);
          };
 
      async function sprod() {
      
        handleClick()
         let items ={refresh}
          let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(items)
          });
          rep = await rep.json();
          let bab = rep.access_token 
          let pack_size= pack_size1
          let amount = tota
          let reward = selectedPrize
          let payment_method = 'TRANSFER'
          let quantity_type = type.map(tod => tod.value) 
          let name = item.map(todo => todo.value)
          console.log(name, price, quantity, quantity_type, pack_size)
          let itemd = {name, price, quantity, quantity_type, pack_size};
          
          const separatedData = itemd.name.map((_, index) => ({
            name: itemd.name[index],
            price:parseInt( itemd.price[index]),
            quantity:itemd.quantity[index],
            quantity_type:itemd.quantity_type[index] || 'item',
            pack_size:itemd.pack_size[index],
            product_type: product_type,
            amount: amount
          }));
          let products = separatedData
          let ite = {products, payment_method}
        try {
          let result = await fetch('https://api.prestigedelta.com/sellproducts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${bab}`
            },
            body: JSON.stringify(ite)
          });
                if (result.status !== 200 || product.item_no === 0) {
            const errorResult = await result.json();
            setMessage(JSON.stringify(errorResult))  
          } else {
             result =await result.json();
            setMessage(JSON.stringify(result.message))
            setValid('Valid')
            let rent = {result, ite, tota}
            navigate('/components/transferverify', {state:{rent}} )
          } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
      
      async function spod() {
      
        handleClick()
         let items ={refresh}
          let rep = await fetch ('https://api.prestigedelta.com/refreshtoken/',{
              method: 'POST',
              headers:{
                'Content-Type': 'application/json',
                'accept' : 'application/json'
           },
           body:JSON.stringify(items)
          });
          rep = await rep.json();
          let bab = rep.access_token 
          let pack_size= pack_size1
          let amount = tota
          let reward = selectedPrize
          let payment_method = 'TRANSFER'
          let quantity_type = type.map(tod => tod.value) 
          let name = item.map(todo => todo.value)
          console.log(name, price, quantity, quantity_type, pack_size)
          let itemd = {name, price, quantity, quantity_type, pack_size};
          
          const separatedData = itemd.name.map((_, index) => ({
            name: itemd.name[index],
            price:parseInt( itemd.price[index]),
            quantity:itemd.quantity[index],
            quantity_type:itemd.quantity_type[index] || 'item',
            pack_size:itemd.pack_size[index],
            product_type: product_type,
            amount: amount
          }));
          let products = separatedData
          let ite = {products, payment_method}
        try {
          let result = await fetch('https://api.prestigedelta.com/sellproducts/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${bab}`
            },
            body: JSON.stringify(ite)
          });
                if (result.status !== 200 || product.item_no === 0) {
            const errorResult = await result.json();
            setMessage(JSON.stringify(errorResult))  
          } else {
             result =await result.json();
            setMessage(JSON.stringify(result.message))
            setValid('Valid')
            modal3.onClose()
                     } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
      const cancelRef = useRef();
    
      const beef =() =>{
        const data = {inputVa, inputValue}
        navigate('/components/before', {state:{data}})
      }
      const done =()=> {
        navigate('/components/inventory')
      }
        console.log(list)
        console.log(options.length)
      
          if(loading) {
            return(
            <p>Loading...</p>)}
      return(
          <div>
          <Link to='/components/inventory'><i class="fa-solid fa-chevron-left bac"></i></Link>
         {message !== 'Out of Stock please Restock'? (
          <div>
          <ChakraProvider>
          
              <main id="main-element">
              <Button colorScheme='black' variant='outline'>{toSentenceCase(list[0].business_name)}</Button>
              <div></div>
              
          
            
              <p className='ld'>{(new Date()).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
                 
              <hr className='hr'></hr>
                          
            <div className='grn'>
            <Stack direction='row'mb={2} gap='30px' mt={3} spacing={4} align='center' justify='center'>
                  <Heading size='xs'>Item</Heading>
                  <Heading size='xs'>Quantity</Heading>
                  <Heading size='xs'>Amount</Heading>
                  <Heading size='xs'>Quantity Type</Heading>
           </Stack>
        
              <div className='culb' style={{marginLeft:'8%'}}>
                   <ul className="au">
                      {(item).map((todo, index) => (
                       <p key={index}>{todo.value} </p>))}
                       
                   </ul>
                   <ul className="aul">
                       {quantity.map((to, index) => (
                      <p key={index}>{to}</p>
                    ))}
                   </ul>
                   <ul className="aul" style={{marginLeft:'3%'}}>
                       {price.map((t, index) => (
                      <p key={index}>₦{parseFloat(t).toLocaleString('en-US')}</p>
                    ))}
                   </ul>
                   <ul className="aul" style={{marginLeft:'5%'}}>
                       {type.map((tod, index) => (
                      <p key={index}>{tod.value}<span className="deleteButton" onClick={() => handleDeleteItem(index)}>
                      <i  class="fa-solid fa-x"></i>
      </span></p>
                    ))}
                   </ul>
                   </div>
                      <p>Total: ₦{total}</p>
                                <hr className='hr1'></hr>
  
                  </div> 
                 
                  <img src={Logo} alt="logo" className="frame3"/>
               
                 </main></ChakraProvider>
                 <ChakraProvider>     
                 {valid === 'Valid' ? (<Button colorScheme='blue' variant='solid' onClick={done}>Back</Button>):      
               <Stack direction='row' spacing={2} align='center' justify='center'>  

                   <Button colorScheme='blue' variant='solid' onClick={modal1.onOpen}>Add Product</Button> 
                   <Button colorScheme='blue' variant='solid' onClick={modal2.onOpen}>Add Service</Button> 
              
                    </Stack>} <br/><br/>
                    { item.length !== 0 ? (  <div>  <div>{buttonVisible && (<Button colorScheme='blue' variant='solid' onClick={modal3.onOpen}>Confirm Payment</Button> 
                   )}
        {!buttonVisible && <Spinner />}</div></div>): null }
             
                {item.length !== 0 ?( <div> 
                  <div>
                <p className=''>₦{total} Payment should be sent to</p>
                <Heading fontSize='15px' className=''>Account No: {tip.account_number}</Heading>
                <Heading fontSize='15px' className=''>Bank: {tip.bank}</Heading>
                
         
                </div>
                
                <br/>
                  <Button  colorScheme='blue' variant='outline' onClick={creat} >Get Sales Tips</Button>
                  
         </div> ): null} 
        <div className=" ">{message ? <p>{message}</p> : null}</div>
              <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
          <ModalOverlay />
          <ModalContent>
          
            <ModalHeader>Add Items Sold</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <h3 className='h4'></h3>
              <form >
             
        <Select
          className="pne"
          placeholder="Enter product name"
          options={options}
          isSearchable={true}
          onChange={handleInputchan}
          value={inputVa}
          onCreateOption={handleAddProduct} // Handle adding a new option
          isClearable={true} 
          
        /><br/>
               <Select
        onChange={handleInputCha}
        className="pne"
        placeholder="Quantity Type"
        options={opt}
        value={inputV} /><br/>
              <Input placeholder='Price of a single item' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
              <Input placeholder='Quantity' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
             
        {inputV.label !== 'item' || inputVa.label === options ? (
          <div>
          <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
          <br/></div>): null}  
          
                <img src={Logo} alt="logo" className="frame2"/>
                <div className=" ">{mess ? <p>{mess}</p> : null}</div>
            
          {inputVa.mony !== 0 || inputVa.team !== 0  || options.length !== 0 ? (
      <Button colorScheme='blue' onClick={summit} >Add</Button>
    ) : (
      <div ><p className="message">{messag}</p>
      
      <Button colorScheme='blue' onClick={beef}>Restock</Button></div>
    )}                    
              </form>
              </ModalBody>
              </ModalContent>
        </Modal>
        <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
         <ModalOverlay />
          <ModalContent>
          
            <ModalHeader>Add Service rendered</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <h3 className='h4'></h3>
              <form >
                  <CreatableSelect
          className="pne"
          placeholder="Enter service Name"
          options={opto}
          isSearchable={true}
          onChange={handleInputchan}
          value={inputVa}
          onCreateOption={handleAddProduct} // Handle adding a new option
          isClearable={true} 
          
        /><br/>
              
              <Input placeholder='Price of service for one customer' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
              <Input placeholder='Number of customers' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/>
              
                <img src={Logo} alt="logo" className="frame2"/>
                
           <Button colorScheme='blue' onClick={sum} >Add</Button>
     <p className="message">{mess}</p>
      
                          
              </form>
              </ModalBody>
              </ModalContent>

        </Modal>
        <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={modal3.onClose}
        isOpen={modal3.isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Confirm Payment</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
          Has the customer transferred the sum of ₦{total} from their account? 
          </AlertDialogBody>
          <Stack m={5}  spacing={9} direction='row' justify='center'>
          <Button ref={cancelRef} colorScheme='blue' onClick={spod}>
              No
            </Button>
            <Button colorScheme='green' ml={3} onClick={sprod}>
              Yes
            </Button>
            </Stack>
        </AlertDialogContent>
      </AlertDialog>
        </ChakraProvider></div>):<ChakraProvider> <div><Button colorScheme='black' variant='outline'>{toSentenceCase(list[0].business_name)}</Button><br/>
         <Button colorScheme='blue'  variant='solid' mt='10px' onClick={beef} >Restock</Button></div></ChakraProvider>}
         
        
        </div>
      )
}
export default Tinvoice