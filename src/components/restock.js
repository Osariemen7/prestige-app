import React, { useState, useEffect } from 'react';
import { Stack, Heading, ChakraProvider, Input, Button, useDisclosure } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import  Select  from 'react-select';
import html2canvas from 'html2canvas';
import Logo from './images/Logo.png';
import jsPDF from 'jspdf';

const ListItem = ({ item, onDelete, onQuantityChange, customer, onPriceChange }) => {
  const handleQuantityChange = (event) => {
    onQuantityChange(item, event.target.value);
  };

  const handlePriceChange = (event) => {
    onPriceChange(item, event.target.value);
  };

  return (
    <Stack direction='row' mb={2} gap='10px' mt={3} spacing={2} align='center' justify='center'>
      <div>
        <Heading m={3} size='xs'>{item.name}</Heading>
      </div>
      <div style={{padding: '1%', width:'100px', alignItems: 'center', justifyContent: 'center'}}>
        <Input type="number" width='50%' p={1} value={item.quantity} onChange={handleQuantityChange} />
      </div>
      <div style={{padding:'0', width: '100px'}}>
        <Input type="number" width='60%'  p={1} value={item.price} onChange={handlePriceChange} />
      </div>
      {customer ? null: <div><span className="deleteButton" onClick={() => onDelete(item)}>
                      <i  class="fa-solid fa-x"></i>
      </span></div>}
      
      
    </Stack>
  );
};

const ListIte = ({ item, onDelete, onQuantityChange,customer, onPriceChange }) => {
  const handleQuantityChange = (event) => {
    onQuantityChange(item, event.target.value);
  };

  const handlePriceChange = (event) => {
    onPriceChange(item, event.target.value);
  };

  return (
    <Stack direction='row' mb={2} gap='10px' mt={3} spacing={2} align='center' justify='center'>
      <div>
        <Heading m={3} size='xs'>{item.name}</Heading>
      </div>
      <div style={{padding: '1%', width:'100px', alignItems: 'center', justifyContent: 'center'}}>
        <Input type="number" width='50%' p={1} value={item.team} onChange={handleQuantityChange} />
      </div>
      <div style={{padding:'0', width: '100px'}}>
        <Input type="number" width='60%'  p={1} value={item.code} onChange={handlePriceChange} />
      </div>
      {customer ? null: <div><span className="deleteButton" onClick={() => onDelete(item)}>
                      <i  class="fa-solid fa-x"></i>
      </span></div>}
      
      
    </Stack>
  );
};

const ItemList = ({ items, onDelete, onQuantityChange,customer, onPriceChange, selectedValue }) => {
  
  return (
    <ChakraProvider>
      {/* Render headings only once */}
      
      <Stack direction='row' mb={2} gap='10px' mt={3} spacing={2} align='center' justify='center'>
        <div>
          <Heading size='xs' p={2}>Item</Heading>
        </div>
        <div style={{ padding: '1%', width: '100px', alignItems: 'center', justifyContent: 'center' }}>
          <Heading size='xs' p={2}>Quantity</Heading>
        </div>
        <div style={{ padding: '0', width: '100px' }}>
          <Heading size='xs'>Amount</Heading>
        </div>
      </Stack>

      {/* Render each item */}
      {selectedValue.value === 'ITEM'? (<div> {items.map((item, index) => (
        <ListItem key={index} item={item} onDelete={onDelete} onQuantityChange={onQuantityChange} onPriceChange={onPriceChange} customer={customer} />
      ))}</div>):
       <div>
       {items.map((item, index) => (
        <ListIte key={index} item={item} onDelete={onDelete} onQuantityChange={onQuantityChange} onPriceChange={onPriceChange} customer={customer}/>
      ))}
       </div>}    
       
      
      
      
    </ChakraProvider>
  );
};

const Restock = () => {
  const [info, setInfo] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState('');
  const [business, setBusiness] = useState([])
    const [inpu, setInpu] = useState('');
    const [number, setNumber] = useState('')
    const [address, setAdd] = useState('')
    const [put, setPut] = useState('')
    const [val, setVal] = useState('')
    const modal1 = useDisclosure();
    const modal2 = useDisclosure()
    
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleNewItemSubmit = () => {
    // Create a new item object
    const newItem = {
      name: newItemName,
      quantity: parseInt(newItemQuantity),
      price: parseInt(newItemPrice),
    };

    // Add the new item to the existing items list
    setItems([...items, newItem]);

    // Clear input fields
    setNewItemName('');
    setNewItemQuantity('');
    setNewItemPrice('');

    // Close the modal
    modal2.onClose();
  };

  const [total, setTotal] = useState(0);

  const handleCust = (event) =>{
    setInpu(event.target.value)
  }
  const handleAdd = (event) =>{
    setPut(event.target.value)
  }
   const handlePhone =(event) => {
    setVal(event.target.value)
   }

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
  let refresh = terms(tok)

  useEffect(() => {
    fetchData()
    
    }, [])
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
    let response = await fetch("https://api.prestigedelta.com/businessprofile/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
    setBusiness(response)
    
      }}
      useEffect(() => {
        fetchDa()
      }, [])
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
  let response = await fetch("https://api.prestigedelta.com/procureproducts/",{
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
  setItems(response[0].products.map((item) => ({
    name: item.name,
    quantity: item.item_restock_quantity,
    team:   item.pack_restock_quantity,
    price: item.item_restock_amount,
    code: item.pack_restock_amount
  })));
    }}
console.log(info)

const mont = ['ITEM', 'PACK'];
  const opt = mont.map((p) => ({
    label: p,
    value: p,
  }))
  const defaultSelectedValue = opt.find(option => option.value === 'ITEM');
 const [selectedValue, setSelectedValue] = useState(defaultSelectedValue);
 const handleType = (selectedValue) => {
  setSelectedValue(selectedValue);
  
};

console.log(selectedValue.value)
  const onDelete = (itemToDelete) => {
    setItems(items.filter(item => item !== itemToDelete));
  };

  const onQuantityChange = (item, newQuantity) => {
    const updatedItems = items.map(existingItem => {
      if (existingItem === item) {
        return { ...existingItem, quantity: newQuantity };
      }
      return existingItem;
    });
    setItems(updatedItems);
  };

  const onPriceChange = (item, newPrice) => {
    const updatedItems = items.map(existingItem => {
      if (existingItem === item) {
        return { ...existingItem, price: newPrice };
      }
      return existingItem;
    });
    setItems(updatedItems);
  };
 

  useEffect(() => {
    let sum = items.reduce((total, item) => total + (item.quantity * item.price), 0);
    setTotal(sum);
  }, [items]);
  const handleFormSubmit = () => {
    
    const newCustomer = customer || inpu;
    const newNumber = number || val
    setCustomer(newCustomer)
    setInpu('')
    setNumber(newNumber)
    setAdd(put)
    setPut('')
    setVal('')
    modal1.onClose()
  }
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
pdf.save('download.pdf');
}
  if(loading){
    return(
      <div>Loading...</div>
    )
  }
  
  
  return (
    <div style={{backgroundColor:'#F0F8FF', maxHeight:'100%', height: '100vh', paddingTop:'3%', zIndex:'0', alignItems: 'center', justifyContent: 'center'}}>
    <ChakraProvider>
      <div style={{ padding:'5%' }}>
        <Link to='/components/product'>
          <i className="fa-solid fa-chevron-left bac"></i>
        </Link> 
        <Select 
      onChange={handleType}
      className="pne"
      placeholder="Select Duration"
      options={opt}
      isSearchable={true}
      value={selectedValue} /> <br/>
       <main id="main-element" style={{ padding:'3%', maxHeight:'100%' }}>
        <div >   
        
        <img src={Logo} alt="logo" className="frame1"/>     
          <Heading fontSize='18px' mb={2}>Restock List</Heading>
          <p className='ld'>{(new Date()).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true})}</p>
          <ItemList items={items} onDelete={onDelete} onQuantityChange={onQuantityChange} customer={customer} onPriceChange={onPriceChange} selectedValue={selectedValue} />
          <p>Quantity Type: {selectedValue.value}</p>
          <div>Total: ₦{total}</div>
          {customer? (<h5>Order from {business[0].business_name} to {customer}</h5>):null}
          <h6 className='saed'> {address} -<span> {number}</span></h6>
        </div>
        </main>
        <br></br>
      
      {customer? (<Button colorScheme='blue' variant='solid' onClick={handleCaptureClick}>Share List</Button>):<Stack direction='row' mt={1} gap={3} align='center' justify='center'><Button colorScheme='blue' variant='solid' onClick={modal2.onOpen}>Add Items</Button><Button colorScheme='blue' variant='outline' onClick={modal1.onOpen}>Add Seller's Details</Button></Stack>}  
      </div>
      <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
          <ModalOverlay />
          <ModalContent>
          
            <ModalHeader>Add Seller's Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
          <Input placeholder='Who are you buying from?' size='md' onChange={handleCust} width={273} ml={9}/>
          <br/> <br/>
              <Input placeholder='Account No ' size='md' onChange={handlePhone} width={273} ml={9}/><br/><br/>
              <Input placeholder='Bank Name' size='md' onChange={handleAdd} width={273} ml={9}/><br/><br/>
             
             <Button colorScheme='blue' onClick={handleFormSubmit}>Add</Button>                   
              
              </ModalBody>
              </ModalContent>
        </Modal>
        <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Name"
                size="md"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                width={273}
              />
              <br /> <br />
              <Input
                placeholder="Quantity"
                size="md"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(e.target.value)}
                width={273}
              />
              <br /> <br />
              <Input
                placeholder="Price"
                size="md"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(e.target.value)}
                width={273}
              />
              <br /> <br />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleNewItemSubmit}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

    </ChakraProvider></div>
  );
};

export default Restock;
