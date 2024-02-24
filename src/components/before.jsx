import { useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Button, Stack, Input, Heading, useDisclosure,Card, Spinner, CardBody  } from "@chakra-ui/react"
import CreatableSelect from 'react-select/creatable';
import Logo from './images/Logo.png';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
  
const BuyP =()=>{
  const { isOpen, onOpen,  onClose } = useDisclosure()
  const [messag, setMessag] = useState([])
  const [loading, setLoading] = useState(true);
  const [quatity, setQuatity] = useState([]);
  const [price, setPrice] = useState([]);
  const [type, setType] = useState([]);
  const [item, setItem] = useState([])
  const [inputp, setInputp] = useState(0)
  const [inputVal, setInputVal] = useState("");
  const [fun, setFun] = useState('')
  const [inputValue, setInputValue] = useState("");
  const [inputVa, setInputVa] = useState('')
  const [inputV, setInputV] = useState('')
  const [outline, setOutline] = useState('');
  const [buttonVisible, setButtonVisible] = useState(true);
  const [pack_size1, setPacksize] = useState([])
  const [product_ty, setProductType] = useState([])
  const [mess, setMess] = useState('')
  const [product, setProduct] = useState([])
  const [payment_meth, setPayment] = useState('')
  const [info, setInfo] = useState([])
  const [product_type, setProd] = useState('Service')
  const modal1 = useDisclosure()
  const modal2 = useDisclosure()

    
 const location = useLocation()
  const navigate = useNavigate()
  const data = location.state && location.state.data;
  useEffect(() => {
    setInputVa(data ? { label: data.inputVa.value, value: data.inputVa.value } : '');
    setInputValue(data ? (data.inputValue !== '' ? data.inputValue : '') : '');
  }, []);

  const summit = ()=>{
    if(inputV === '' || inputVa === '' || inputValue === '' || inputVal=== '' ){
   setMess('Please fill all the necessary fields')}
   else {
    handleFormSubmit()
    setProd('Product')
   }
  }
  
  const sum = ()=>{
    if(inputV === '' || inputVa === ''  || inputVal=== '' ){
   setMess('Please fill all the necessary fields')}
   else {
    handleFormSubmit()
    
         }
  }
  const optn= ['item'];
  const op = optn.map((p) => ({
    label: p,
    value: p,
  }));
   console.log(data)
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
let response = await fetch("https://api.prestigedelta.com/products/",{
method: "GET",
headers:{'Authorization': `Bearer ${bab}`},
})
//localStorage.setItem('user-info', JSON.stringify(tok))

if (response.status === 401) {
  navigate('/components/login');
} else { 
 
response = await response.json();
setLoading(false)
setInfo(response)

  }}
  useEffect(() => {
    fetchData()
  }, [])
  

const optio = ['item', 'pack'];
  const opt = optio.map((p) => ({
    label: p,
    value: p,
  }));
const handleFormSubmit = () => {
  setQuatity([...quatity, inputValue]);
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
  modal2.onClose()
}
const handleClick = () => {
  // When the button is clicked, setButtonVisible to false
  setButtonVisible(false);
  setTimeout(() => {
    setButtonVisible(true);
  }, 5000);
};
const handleProduct =(product_ty) =>{
   setProductType(product_ty)
}

const options = product.map((item) => ({
  label: item.name,
    value: item.name,
    team:  item.pack_size,
    mony: item.pack_cost,
}));

const tota = quatity.reduce((total, q, index) => {
  const quantityValue = parseFloat(q) || 1; // Replace missing quantity with 1
  const itemAmount = quantityValue * parseFloat(price[index]);
  return total + itemAmount;
}, 0);
    let total = (tota).toLocaleString('en-US')
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
    const handlePay = (payment_meth) =>{
      setPayment(payment_meth)
    }
  const handleAddProduct = (newValue) => {
      if (newValue && newValue.trim() !== '') {
        const newProduct = { label: newValue, value: newValue };
        setInputVa(newProduct);
      }
    };
  
  let refresh = terms(tok)
  console.log(data)
  
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
    let response = await fetch("https://api.prestigedelta.com/productcatalogue/",{
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
        fetchDa()
      }, [])

      async function aprod() {
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
        let payment_method = payment_meth.value
        let quantity = quatity || 1
      
        let quantity_type = type.map(tod => tod.value)
        let name = item.map(todo => todo.value)
        console.log(name, price, quantity, quantity_type, pack_size)
        let itemd = {name, price, quantity, quantity_type, pack_size};
        
        const separatedData = itemd.name.map((_, index) => ({
          name: itemd.name[index],
          cost:parseInt( itemd.price[index]),
          quantity:itemd.quantity[index],
          quantity_type:itemd.quantity_type[index],
          pack_size:itemd.pack_size[index],
          product_type: product_type,
          amount:amount,
          payment_method: payment_method
        }));
        let products = separatedData
        let ite = products
        try {
          let result = await fetch('https://api.prestigedelta.com/products/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'accept': 'application/json',
              'Authorization': `Bearer ${bab}`
            },
            body: JSON.stringify(ite)
          });
                if (result.status !== 200) {
            const errorResult = await result.json();
            setMessag(JSON.stringify(errorResult));
          } else {
             result =await result.json();
            setMessag(JSON.stringify(result.message))
            setFun(result)
          } 
        } catch (error) {
          // Handle fetch error
          console.error(error);
        };
      }
      const openModal = (button) => {
        setPayment('CASH')
        setOutline(button)
        
        };
       
      
      const conti = () => {
        aprod()
        const mata = info[0].sub_account
        navigate('/components/getgroup', {state:{mata}})
      }
      const back = () => {
        navigate('/components/products')
      }
      const payment = ['CASH', 'POS', 'TRANSFER']
const pay = payment.map((p) => ({
  label: p,
  value: p
}))
      console.log(payment_meth)
      if(loading) {
        return(
        <p>Loading...</p>)} 
    
  return(
    <div>
    <Link to='/components/product'>
                 <i className="fa-solid fa-chevron-left bac"></i>
             </Link>
    <ChakraProvider>
    <Heading size='md' mb={2}>Buy Product</Heading>
                 
      <Card m={2} backgroundColor='gainsboro'>
      
      <Stack direction='row'mb={2} gap='30px' mt={3} spacing={4} align='center' justify='center'>
                <Heading size='xs'>Item</Heading>
                <Heading size='xs'>Quantity</Heading>
                <Heading size='xs'>Amount</Heading>
                <Heading size='xs'>Quantity Type</Heading>
      </Stack>
      <CardBody>
      <div className='culb'>
                 <ul className="au">
                    {(item).map((todo, index) => (
                     <p key={index}>{todo.value}</p>))}
                 </ul>
                 <ul className="aul">
                     {quatity.map((to, index1) => (
                    <p key={index1}>{to}</p>
                  ))}
                 </ul>
                 <ul className="aul">
                     {price.map((t, index1) => (
                    <p key={index1}>₦{parseFloat(t).toLocaleString('en-US')}</p>
                  ))}
                 </ul>
                 <ul className="aul">
                     {type.map((tod, index1) => (
                    <p key={index1}>{tod.value}</p>
                  ))}
                 </ul></div>
                 </CardBody>
                 <p >Total Amount: ₦{total}</p>

                 </Card>  
                 <div className="">{messag ? <p>{messag}</p> : null}</div>
                 <br></br>
                 <Stack direction='row' mt={2} spacing={2} align='center' justify='center'>
                 {total !== '0'  ? (<Stack direction='row' spacing={2} align='center' justify='center'>  

<Button colorScheme='blue' variant='solid' onClick={modal1.onOpen}>Add Product</Button> 

 </Stack>) : <Stack direction='row' spacing={2} align='center' justify='center'>  

<Button colorScheme='blue' variant='solid' onClick={modal1.onOpen}>Add Product</Button> 


 </Stack>} <br/>
                 { item.length !== 0 ? (   <div>    {payment_meth !== 'TRANSFER' ? ( <div>{buttonVisible && (<div>{fun === ''?<Button colorScheme='blue' variant='solid' onClick={aprod}>Save</Button>:<Button colorScheme='blue' variant='solid' onClick={back}>Back</Button>}</div> )}
      {!buttonVisible && <Spinner />}</div>) : <Button colorScheme='blue' variant='solid' onClick={conti}>Continue</Button>}
      </div> ): null  } </Stack>
                 <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
        
          <ModalHeader>Add Items Purchased</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <h3 className='h4'></h3>
            <form >
{data ?(<div>
  
<Input placeholder="Enter product Name" ml={9}
onChange={handleInputchan} width={273}
value={data.inputVa.value} /><br/><br/>
{data.inputValue === ''? <div>
<Input placeholder='Quantity Bought' size='md'
onChange={ handleInputChange}
width={273} ml={9}/><br/><br/></div>
: <div>
<Input placeholder='Quantity Bought' size='md'
onChange={ handleInputChange}
  value={data.inputValue} width={273} ml={9}/><br/><br/></div>}
            
</div>):( <div>   
 
  <CreatableSelect
        className="pne"
        placeholder="Enter product Name"
        options={options}
        isSearchable={true}
        onChange={handleInputchan}
        value={inputVa}
        onCreateOption={handleAddProduct} 
        isClearable={true} 

      /><br/>

            
            <Input placeholder='Quantity Bought' size='md' onChange={handleInputChange} width={273} ml={9}/><br/><br/></div>)}
            <Input placeholder='Price of a single item' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
            <Select
        onChange={handlePay}
        className="pne"
        placeholder="Payment Method"
        options={pay}
        value={payment_meth} /><br/>          
            <Select
      onChange={handleInputCha}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={inputV} /><br/>
      {inputV.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}   
                                   
                <Button colorScheme='blue' onClick={summit}>Add</Button>
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
          options={options}
          isSearchable={true}
          onChange={handleInputchan}
          value={inputVa}
          onCreateOption={handleAddProduct} // Handle adding a new option
          isClearable={true} 
          
        /><br/>
        <Select
        onChange={handlePay}
        className="pne"
        placeholder="Payment Method"
        options={pay}
        value={payment_meth} /><br/>          
            
              
              <Input placeholder='Price of service for one customer' size='md' onChange={handleInputChang} width={273} ml={9}/><br/><br/>
              
              <Select
        onChange={handleInputCha}
        className="pne"
        placeholder="Quantity Type"
        options={op}
        value={inputV} /><br/>
          
                <img src={Logo} alt="logo" className="frame2"/>
                
           <Button colorScheme='blue' onClick={sum} >Add</Button>
     <p className="message">{mess}</p>
      
                          
              </form>
              </ModalBody>
              </ModalContent>

        </Modal>
  
    </ChakraProvider>
       
    </div>
  )    
}
export default BuyP
