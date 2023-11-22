import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, Box, Button, Heading, Stack, SimpleGrid,  Input, Text } from '@chakra-ui/react'
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


const Chat = () => {
  const [info, setInfo] = useState()
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true)
  const [isload, setIsLoad] =useState(false)
  const [sidebar, setSidebar] = useState('')
  const [rightbar, setRightbar] = useState('')
  const [list, setList] = useState('')
  const [con, setCon] =useState([])
  const [thread, setThread] = useState('')
  const [selectedMessage, setSelectedMessage] = useState('');
  const navigate = useNavigate()
  const location = useLocation()

  let tok= JSON.parse(localStorage.getItem("user-info"));
  let refresh = tok.refresh_token
  const data = location.state && location.state.data;
useEffect(()=>{
  setThread(data ? data.thread_id  : '');
},[])
  

  const showSidebar = () => setSidebar(!sidebar && !rightbar)

  const showRighbar = ()=> setRightbar(!rightbar)
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
  setInfo(response)
    }}
    useEffect(() => {
      fetchData()
    }, [])
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
      let response = await fetch("https://api.prestigedelta.com/getgptmessages/",{
      method: "GET",
      headers:{'Authorization': `Bearer ${bab}`},
      })
      response = await response.json()
    
    //   if (data.code === 'token_not_valid'){
    //     navigate('/components/token')
    //   } else {
      let  lastThread = response[0];
    
     setCon(response)
     
      }
      useEffect(() => {
        fetchDat()
      }, [])
    
    const creat = async() => {
     setIsLoad(true)   
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
    
    
      console.warn(newMessage)
      let thread_id = thread
      let message = newMessage
      let item = {message, thread_id};
      let result = await fetch ('https://api.prestigedelta.com/sendgptmessage/',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'accept' : 'application/json',
            'Authorization': `Bearer ${bab}`
       },
       body:JSON.stringify(item)
      });
    
      if (result.status !== 200) {
    
      } else {
        result = await result.json();
        setList(result)
    
      }   
    }
    
    console.log(thread)
    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;
        const newMessages = [...messages, { text: newMessage, sender: 'user' }];
        setMessages(newMessages);
        setNewMessage('');

       
        // Simulate a response from the assistant after posting the user's message
        setTimeout(async () => {
          try {
            // Fetch the updated messages from the API
            let item = { refresh };
            let rep = await fetch('https://api.prestigedelta.com/refreshtoken/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
              body: JSON.stringify(item),
            });
            rep = await rep.json();
            let bab = rep.access_token;
            const response = await fetch(
              'https://api.prestigedelta.com/getgptmessages/',
              {
                method: 'GET',
                headers: { Authorization: `Bearer ${bab}` },
              }
            );
            const result = await response.json();
        
            setIsLoad(false);
        
            // Find the latest assistant message
            const latestAssistantMessage = result.find(
              (result) =>
                result.conversation.length > 0 &&
                result.conversation[0].role === 'assistant'
            );
        
            // Define matchingThread outside the setTimeout block
            let matchingThread;
        
            // If a specific thread is specified, find it
            if (thread) {
              matchingThread = result.find((threads) => threads.thread_id === thread);
            }
        
            // Extract the latest message_value if the matchingThread is found
            const responseMessage = {
              text: matchingThread
                ? matchingThread?.conversation[0]?.message_value || 'No messages found'
                : latestAssistantMessage?.conversation[0]?.message_value || 'No response',
              sender: 'assistant',
            };
        
            // Update the messages state with the user's and assistant's messages
            setMessages((prevMessages) => [...prevMessages, responseMessage]);
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        }, 10000);
         }
   const send=()=>{

    creat()
    handleSendMessage()
   }
   const mappedMessages = con.map(thread => {
    const lastConversation = thread;
    return lastConversation ? lastConversation : null;
  });

  
   console.log(list)
console.log(messages)
console.log(selectedMessage)
  if(loading) {
    return(
    <p>Loading...</p>)}   
          
  
  return (
    <ChakraProvider>
    <div className='fl'>
    <i onClick={showSidebar} class="fa-solid fa-bars cc"></i>
    <div className='right'>
            <i  onClick={showRighbar} class="fa-solid fa-square-caret-down"></i>
            <Heading fontSize='14px'>Previous Chat</Heading></div>
            </div>
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
                    <Link to='/components/savings' className='nav-text'><i class="fa-solid fa-money-bill"></i>
                      <p className='dfp'>Sub-Account</p></Link>
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
            
<nav className={rightbar ? 'nav-menu active2' : 'nav-menutwo'} >
<ul className='nav-menu-item'>
<Heading fontSize='15px' color="white" mt={3}>Previous Chat</Heading>
{mappedMessages.map((message, index) => (
        <div key={index}>
          <li
            className='nav-list2'
            onClick={() => {
        setSelectedMessage(message.conversation.slice().reverse());
        setThread(message.thread_id); showRighbar(); setMessages([])
      }}
            style={{ cursor: 'pointer' }}
          >
            <p>{message.conversation[message.conversation.length - 1].message_value}</p>
          </li>
        </div>
      ))}</ul>
</nav>
    <div className="App">
      <div className="chat-container">
      
      <Heading fontSize='18px'>Business Assistant for {info[0].business_name}</Heading>
      <Text fontSize='14px' p={3}>Hi {info[0].owner_name}, I am your business assistant!<br/> Ask me any question about your business</Text>
      <Card m='19px' backgroundColor='white' p={3}>
      {selectedMessage && (
        <div>
          {selectedMessage.map((message, index) => (
            <div
              key={index}
              style={{
                justifyContent: message.role === 'user' ? 'right' : 'left',
              }}
            >
              <div
                className={`message ${message.role}`}
                style={{ textAlign: message.role === 'user' ? 'right' : 'left',
                  backgroundColor: message.role === 'user' ? '#5cb85c' : '#337ab7',
                  color: 'white',
                  maxWidth: 'fit-content',
                  borderRadius: '5px',
                  padding: '5px',
                  margin: '8px',
                  marginLeft: message.role === 'user' ? 'auto' : '0',
                  marginRight: message.role === 'user' ? '0' : 'auto',
                  justifySelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <Text className="message-content">{message.message_value}</Text>
              </div>
            </div>
          ))}
        </div>
      )}
    
        <div   >
        
        {messages.map((message, index) => (
  <div
    key={index}
    style={{
      justifyContent: message.sender === 'user' ? 'right' : 'left',
    }}
  >
   
      <div
        className={`message ${message.sender}`}
        style={{
          textAlign: message.sender === 'user' ? 'right' : 'left',
          backgroundColor: message.sender === 'user' ? '#5cb85c' : '#337ab7',
          color: 'white',
          maxWidth: 'fit-content',
          borderRadius: '5px',
          padding: '5px',
          margin: '8px',
          marginLeft: message.sender === 'user' ? 'auto' : '0',
          marginRight: message.sender === 'user' ? '0' : 'auto',
          justifySelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
        }}
      >
        <Text className="message-content">{message.text}</Text>
      </div>

  </div>
))}
{isload && (
      // Show 'loading...' only for incoming assistant messages
      <Skeleton  height="15px" mb="2" />
    ) }
        </div>   
    </Card>
        
    <div className="">
        <Input
          mt='12px'
          ml='5px'
           w='220px'
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button mb='6px' onClick={send}  colorScheme='blue' variant='solid' >Send</Button>
       
          </div>
      </div>
    </div>
    </ChakraProvider>
  );
}
 
export default Chat;
