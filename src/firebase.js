import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";
import { AlertDialogBody, AlertDialog, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogHeader, PopoverCloseButton, AlertDialogContent, AlertDialogFooter, Box, Button, ButtonGroup, ChakraProvider } from '@chakra-ui/react';
import React, {useState, useRef, useEffect} from 'react';
import { useDisclosure } from '@chakra-ui/react';

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
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzI_pYNOig5crDJA2SkyglGFC0yi0nm3s",
    authDomain: "firstproject-fbc73.firebaseapp.com",
    projectId: "firstproject-fbc73",
    storageBucket: "firstproject-fbc73.appspot.com",
    messagingSenderId: "410151713751",
    appId: "1:410151713751:web:94e3e1883922caaac3a992",
    measurementId: "G-MPPWGV4EQ3"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const generateToken = async () => {
  
  const permission = await Notification.requestPermission()
  console.log(permission)
  if(permission === 'granted') {
    const token = await getToken(messaging, {vapidKey: "BAaDZ3bg6-ZlA-j488Mno_o5RNLKbxE6T9zngPfof2lu2kmxvBM7dZVms6ECwsa7j6aaqLbsmMcIoIF0lBPmRJw"
    });
    console.log(token)


     let ite={refresh}
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
    let is_customer = tok.user.is_customer
    const item = { token, is_customer };

    const response = await fetch('https://api.prestigedelta.com/updateuser/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${bab}`
      },
      body: JSON.stringify(item)
    });

    if (!response.ok) {
      console.error('Failed to update user:', response);
    } else {
      const result = await response.json();
      // Handle the result as needed
    }

  }
  
}
export const NotifyPop = () => {
  
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [showPopover, setShowPopover] = useState(false);
  
    const handlePermissionDenied = () => {
      const storageKey = 'lastOnOpenTimestamp';
    
      // Get the timestamp from localStorage
      const lastTimestamp = localStorage.getItem(storageKey);
    
      // If lastTimestamp is not available or more than 35 hours have passed
      const shouldCallOnOpen = !lastTimestamp || Date.now() - lastTimestamp > 35 * 60 * 60 * 1000;
    
      if (shouldCallOnOpen) {
        onOpen();
        // Update the timestamp in localStorage
        localStorage.setItem(storageKey, Date.now());
        console.log('hi');
      }
    };
    
  
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
  
        if (permission === 'denied') {
          handlePermissionDenied();
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };
  
    const trig = () => {
      generateToken()
      onClose()
     
    };
  
    useEffect(() => {
      const checkNotificationPermission = async () => {
        if (Notification.permission !== 'granted') {
          handlePermissionDenied();
        }
      };
  
      checkNotificationPermission();
    }, []);
  
    return (
      <div>
        <ChakraProvider>
          
            <AlertDialog
              motionPreset='slideInBottom'
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />
  
              <AlertDialogContent>
                <AlertDialogHeader>Get Informed</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Access details about your cash flow, and stay informed about the latest features. Allow Prestige Finance to keep you informed.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme='green' onClick={trig} ml={3}>
                    Allow
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          
        </ChakraProvider>
      </div>
    );
  };
  
  
  

