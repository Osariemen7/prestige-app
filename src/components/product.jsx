import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { Card, CardHeader, Stack, CardBody, Button, Heading, Text } from '@chakra-ui/react'
import { useDisclosure, Input,  Spinner  } from "@chakra-ui/react"
import good from './images/good.svg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Box, SimpleGrid,  StackDivider} from '@chakra-ui/react'


const Product = () => {
  const [sidebar, setSidebar] = useState('')
  const [finfo, setFinfo]  = useState([])
  const [message, setMessage] = useState('')
  const [messag, setMessag] = useState('')
    const [info, setInfo] = useState('');
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState('');
    const [cost, setCost] = useState('');
    const [selectedOption, setSelectedOption] = useState(null)
    const [quantity, setQuantity] = useState('')
    const [pack_size, setPacksize] = useState(0)
    const [fun, setFun] = useState('')
    const navigate = useNavigate()
    const [buttonVisible, setButtonVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');
    const { isOpen, onOpen,  onClose } = useDisclosure()
    const [fin, setFin] = useState('');
    const [select, setSelect] = useState('');

    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const optio = ['item', 'pack'];
    const opt = optio.map((p) => ({
      label: p,
      value: p,
    }));
    const menu = ['Product', 'Service'];
    const op = menu.map((p) => ({
      label: p,
      value: p,
    }));
    const closeModal = () => {
      modal2.onClose() 
    };
    const showSidebar = () => setSidebar(!sidebar)    
  const handleCost = (event)=> {
    setCost(event.target.value)
  }
  const handleQuantity =(e)=>{
    setQuantity(e.target.value)
  }
  const handleType = (selectedValue) => {
      setSelectedValue(selectedValue);
    }; 
    const selectType = (select) => {
      setSelect(select);
    };
    const handlePack =(e)=>{
      setPacksize(e.target.value)
    }
    const closeModals = () => {
       modal1.onClose()
      fetchData() 
      setFun('')
    };
    const show=(index)=>{
      const mata = info[0].products[index]
      const data = {info, mata}
       navigate('/components/prodet', {state:{data}})
    }
    const handleClick = () => {
      // When the button is clicked, setButtonVisible to false
      setButtonVisible(false);
      setTimeout(() => {
        setButtonVisible(true);
      }, 20000);
    };
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
    let refresh = terms(tok)
    async function aprod(e) {
      
      e.preventDefault();
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
        let product_type = 'PRODUCT'
        let quantity_type = selectedValue.value
        let name = selectedOption.value
        console.warn(name, cost, quantity, quantity_type, pack_size)
        let item = [{name, cost, quantity,  product_type , quantity_type, pack_size}];
      
      try {
        let result = await fetch('https://api.prestigedelta.com/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
              if (result.status !== 200) {
          const errorResult = await result.json();
          setMessag('All fields must be filled');
        } else {
           result =await result.json();
           setFun(result)
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
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
    let response = await fetch("https://api.prestigedelta.com/products/",{
    method: "GET",
    headers:{'Authorization': `Bearer ${bab}`},
    })
    //localStorage.setItem('user-info', JSON.stringify(tok))
    
    if (response.status === 401) {
      navigate('/components/login');
    } else { 
     
    response = await response.json();
   
    setFinfo(response)
      }}
  
      useEffect(() => {
        fetchDat()
      }, [])
    async function sprod(e) {
      
      e.preventDefault();
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
        let product_type = 'PRODUCT'
        let quantity_type = selectedValue.value
        let name = selectedOption.value
        let price = cost
        console.warn(name, price, quantity, quantity_type, pack_size)
        let item = [{name, price, quantity,  product_type , quantity_type, pack_size}];
      
      try {
        let result = await fetch('https://api.prestigedelta.com/sellproducts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': `Bearer ${bab}`
          },
          body: JSON.stringify(item)
        });
              if (result.status !== 200) {
          const errorResult = await result.json();
          setMessage('All fields must be filled');
        } else {
           result =await result.json();
           setFin(result)
        } 
      } catch (error) {
        // Handle fetch error
        console.error(error);
      };
    }
    
 let total =parseFloat( cost) * parseFloat(quantity)
  
 let sub_account = tok.user.has_default_sub_accounts
const subAccount = () => {
  const redirectTo = sub_account ? '/components/savings' : '/components/reboard';
  navigate(redirectTo);
};
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
console.log(info)
console.log(selectedOption)
 
    const options = [
      ...product.map((item) => ({
        label: item.name,
        value: item.name,
        team:  item.pack_size,
        mony: item.pack_cost,
      }))
    ];
    const handleOptionSelect = (selectedOption) => {
      // Handle option selection
      setSelectedOption(selectedOption);
     
    };
    const transfers= ()=>{
    
      navigate('/components/invoice')
 }
    const handleAddProduct = (newValue) => {
    if (newValue && newValue.trim() !== '') {
      const newProduct = { label: newValue, value: newValue };
      setSelectedOption(newProduct);
    }
  };
  const transfer= ()=>{
    
       navigate('/components/before')
  }
    if(loading) {
        return(
        <p>Loading...</p>)} 
    
    return(
        <ChakraProvider>
        <div>
        <i onClick={showSidebar} class="fa-solid fa-bars ac"></i>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-item'>
                    <li className='nav-close'>
                    <i onClick={showSidebar} class="fa-solid fa-x"></i>
                    </li>
                    
                    <li className='nav-list'>
                    <Link to='/components/inventory' className='nav-text'><i class="fa-solid fa-house"></i>
                      <p className='dfp'>Home</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/accounts' className='nav-text'><i class="fa-solid fa-wallet home"></i>
                      <p className='dfp'>Account</p></Link>
                    </li>
                    <li className='nav-list'>
                    <div onClick={subAccount} className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></div>
                    </li>  
                    <li className='nav-list'>
                    <Link to='/components/product' className='nav-text'><i class="fa-solid fa-cart-flatbed"></i>
                      <p className='dfp'>Inventory</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/customer' className='nav-text'><i class="fa-solid fa-people-roof"></i>
                      <p className='dfp'>Customers</p></Link>
                    </li>
                    <li className='nav-list'>
                    <Link to='/components/dash' className='nav-text'><i class="fa-solid fa-chart-line"></i>
                    <p className='dfp'>Analytics</p></Link>
                    </li>
                   
                    <li className='nav-list'>
                    <Link to='/components/chat' className='nav-text'><i class="fa-solid fa-user-tie"></i>
                  <p className='dfp'>Assistant</p></Link>
                    </li>

                    <li className='nav-list'>
                    
                    <Link to='/components/login' className='nav-text'><i class="fa-solid fa-share"></i>
                      <p className='dfp'>Log Out</p></Link>
                    </li>    
                </ul>
            </nav>
           
           
            <Heading size='sm' ml={6} textAlign='left'>Products</Heading>
            { finfo.length > 0 && typeof finfo[0].products[0] === 'object' ? (
            <Card m={5}>
            <Card m={2} p='2px' >

  <CardBody p='2px'>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box p='2px'>
        <Heading size='xs' textTransform='uppercase'>
          Number of Products
        </Heading>
        <Text pt='2' fontSize='sm'>
          {finfo[0].product_count}
        </Text>
      </Box>
      
    </Stack>
  </CardBody>
</Card>
<SimpleGrid m={3} mt={1} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'>Sales Value</Heading>
    </CardHeader>
      <Text>₦{(finfo[0].stock_value).toLocaleString('en-Us')}</Text>
  </Card>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'>Purchase Value</Heading>
    </CardHeader>
      <Text>₦{(finfo[0].input_value).toLocaleString('en-US')}</Text>
  </Card> 
</SimpleGrid>
<Stack direction='row' mt={1}  align='center' justify='center'>
<Button colorScheme='blue' variant='solid' onClick={transfer}>
    Add Products to Inventory
  </Button></Stack>

</Card>): (<Card m={5}  >
            <Card m={2} >

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box p='2px'>
        <Heading size='xs' textTransform='uppercase'>
          Number of Products
        </Heading>
        <Text pt='2' fontSize='sm'>
          0
        </Text>
     </Box>
      </Stack>
  </CardBody>
</Card>
<SimpleGrid m={3} mt={1} spacing={4} templateColumns='repeat(auto-fill, minmax(100px, 1fr))'>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase'> Stock Value</Heading>
    </CardHeader>
      <Text> 0</Text>
  </Card>
  <Card height={90} justify='center'>
    <CardHeader p={1}>
      <Heading size='xs' textTransform='uppercase' > Sales Value</Heading>
    </CardHeader>
      <Text>₦0</Text>
    
  </Card> 
</SimpleGrid>
<Stack direction='row' mt={2}  align='center' justify='center'>
<Button colorScheme='blue' variant='solid' onClick={transfer}>
    Add Products to Inventory
  </Button>
</Stack>

</Card>)}

<Stack direction='row' spacing={1} align='center' justify='center'>
  
</Stack>
<Heading size='md' m={5} mb={0}>Product List</Heading>
        { info.length > 0 && typeof info[0].products[0] === 'object' ? (
      <div>
      {info[0].products.map((obj, index) =>

        <Card key={index} onClick={() => show(index)} m={3} >
  <CardBody padding={2}>
   <Heading size='xs'>{obj.name}</Heading>
    <Text>Total Sales: {obj.total_sales}</Text>
    <i class="fa-solid fa-arrow-right"></i>
  </CardBody>
</Card> )}</div> ): null }
<Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fun === '' ? (
  <div>

          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={selectType}
      className="pne"
      placeholder="Product/Service"
      options={op}
      isSearchable={true}
      value={select} /><br/>
{select.label ==='Service' ? (
  <div>
  <CreatableSelect
        className="pne"
        placeholder="Enter Service name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='No of persons rendered service' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single person' size='md' onChange={handleCost} width={273} ml={9} />
      </div>):(<div><CreatableSelect
        className="pne"
        placeholder="Enter product name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      isSearchable={true}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='Quantity' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single item/pack' size='md' onChange={handleCost} width={273} ml={9} /></div>)} </ModalBody>
         {total? <Text ml={5}>Total cost is ₦{(total).toLocaleString('en-US')}</Text>: null}
          <ModalFooter>
          <div className="message">{messag ? <p>{messag}</p> : null}</div>
          {buttonVisible && ( <Button colorScheme='blue' mr={3} onClick={aprod}>
              Add
            </Button>
            )}
      {!buttonVisible && <Spinner />}
          </ModalFooter>
          </div>): 
        <ModalBody>
        <div>
          <i class="fa-solid fa-x tx" onClick={closeModals}></i>
          <img src={good} alt="" className='nig'/>
          <h4 className="nig">Product Added!</h4>  
      </div></ModalBody>}
        </ModalContent> 
      </Modal>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
        {fin === '' ? (
  <div>
          <ModalHeader>Update Inventory</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Select
      onChange={selectType}
      className="pne"
      placeholder="Product/Service"
      options={op}
      isSearchable={true}
      value={select} /><br/>
{select.label ==='Service' ? (
  <div>
  <CreatableSelect
        className="pne"
        placeholder="Enter Service name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='No of persons rendered service' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Cost for a single person' size='md' onChange={handleCost} width={273} ml={9} />
      </div>):(<div><CreatableSelect
        className="pne"
        placeholder="Enter product name"
        options={options}
        isSearchable={true}
        onChange={handleOptionSelect}
        value={selectedOption}
        onCreateOption={handleAddProduct} // Handle adding a new option
        isClearable={true} 

      /><br/>
      <Select
      onChange={handleType}
      className="pne"
      placeholder="Quantity Type"
      options={opt}
      isSearchable={true}
      value={selectedValue} /><br/>
      {selectedValue.label !== 'item' ? (
        <div>
        <Input placeholder='No of items in pack/carton'  size='md' onChange={handlePack} width={273} ml={9} /><br/>
        <br/></div>): null}

      <Input placeholder='Quantity' size='md' onChange={handleQuantity} width={273} ml={9}/><br/><br/>
      <Input placeholder='Price for a single item/pack' size='md' onChange={handleCost} width={273} ml={9} /></div>)} </ModalBody>
      {total? <Text ml={5}>Total Sales is ₦{(total).toLocaleString('en-US')}</Text>: null}
          <ModalFooter>
          <div className="message">{message ? <p>{message}</p> : null}</div>
          {buttonVisible && ( <Button colorScheme='blue' mr={3} onClick={sprod}>
              Update
            </Button>
            )}
      {!buttonVisible && <Spinner />}
          </ModalFooter>
          </div>): 
        <div>
          <i class="fa-solid fa-x tx" onClick={closeModal}></i>
          <img src={good} alt="" className='nig'/>
          <h4 className="nig">Product Updated!</h4>  
      </div>}
        </ModalContent> 
      </Modal>
        </div>
        </ChakraProvider>
    )
}
export default Product