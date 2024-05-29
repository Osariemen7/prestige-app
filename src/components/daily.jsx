import React, { useState, useRef, useEffect } from 'react';
import { ChakraProvider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const DailyRep = () => {
  const [info, setInfo] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const cancelRef = useRef();
  const modal2 = useDisclosure();
  const modal3 = useDisclosure();

  useEffect(() => {
    const storageKey = 'lastOnOpenTimestamp';
    const lastTimestamp = parseInt(localStorage.getItem(storageKey), 10);
    const shouldCallOnOpen = isNaN(lastTimestamp) || (Date.now() - lastTimestamp) > 20 * 60 * 60 * 1000; 
  
    console.log('shouldCallOnOpen:', shouldCallOnOpen); // Debugging
    if (shouldCallOnOpen) {
      console.log('Opening modal3'); // Debugging
      modal3.onOpen();
      localStorage.setItem(storageKey, Date.now().toString());
    }
  }, [modal3]);

  const fetchDailyReport = async () => {
    const tokenInfo = JSON.parse(localStorage.getItem('user-info'));
    const refreshToken = tokenInfo ? tokenInfo.refresh_token : null;

    if (!refreshToken) {
      navigate('/components/login');
      return;
    }

    try {
      const tokenResponse = await fetch('https://api.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const response = await fetch('https://api.prestigedelta.com/dailyreport/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (response.status === 401) {
        navigate('/components/login');
        return;
      }

      const data = await response.json();
      setInfo(data);
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch daily report:', error);
    }
  };

  const openModal2 = () => {
    fetchDailyReport();
    modal3.onClose();
    modal2.onOpen();
    
   
  };

  return (
    <ChakraProvider>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {loading ? <p>loading....</p>:   
                  <p>{info.report}</p> }

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
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Get Daily Report</AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody />
            <Stack m={5} spacing={9} direction='row' justify='center'>
              <Button colorScheme='green' ml={3} onClick={openModal2}>
                Daily Report
              </Button>
            </Stack>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </ChakraProvider>
  );
};

export const Report = () => {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();
  const modal2 = useDisclosure();

  const fetchDailyReport = async () => {
    const tokenInfo = JSON.parse(localStorage.getItem('user-info'));
    const refreshToken = tokenInfo ? tokenInfo.refresh_token : null;

    if (!refreshToken) {
      navigate('/components/login');
      return;
    }

    try {
      const tokenResponse = await fetch('https://api.prestigedelta.com/refreshtoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      const response = await fetch('https://api.prestigedelta.com/dailyreport/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      if (response.status === 401) {
        navigate('/components/login');
        return;
      }

      const data = await response.json();
      setLoading(false)
      setInfo(data);
    } catch (error) {
      console.error('Failed to fetch daily report:', error);
    }
  };

  const openModal2 = () => {
    modal2.onOpen() 
    fetchDailyReport();
  };
  
  return(
    <div>
      <ChakraProvider>
      <Button colorScheme='green' variant='solid' onClick={openModal2}>Daily Report</Button>
      <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
        <ModalOverlay />
        <ModalContent> 
          <ModalHeader>Daily Report</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {loading ? <p>loading....</p>:   
                  <p>{info.report}</p> }

          </ModalBody>
        </ModalContent>
      </Modal>
  </ChakraProvider>
    </div>
  )
}