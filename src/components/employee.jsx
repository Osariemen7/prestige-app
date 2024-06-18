import {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet"
import { ChakraProvider } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, SimpleGrid, Box, Button, Heading, Stack,  Text } from '@chakra-ui/react'
import add from './images/bud.svg'
import pic from './images/v.svg';
import { useDisclosure, Input, Spinner  } from "@chakra-ui/react"
import { Nav } from './nav.jsx'



const Employee = () => {
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const modal3 = useDisclosure()
    return(
        <div>
        <Nav/>
        <ChakraProvider>
        <Heading fontSize='20px'>Employee Management</Heading>
        <br/>
           <Stack direction='column' m={0} spacing='1px' justifyContent='center' alignItems='center'>
           <p>Add New Employee</p>
  <img className='emp' src={pic} alt='' onClick={modal1.open} />
</Stack>

</ChakraProvider>
        </div>
    )
}
export default Employee