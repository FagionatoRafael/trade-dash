import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBarContent from '../../Components/AppBar/AppBarContent';
import InputsLogin from '../../Components/InputsLogin/InputsLogin';
import { api } from '../../service/api';
import useWebSocket from 'react-use-websocket';

const Signin = () => {

  const [nameSignin, setNameSignin] = useState('')
  const [passwordSignin, setPasswordSignin] = useState('')
  
  const history = useHistory()

  // const { lastJsonMessage, sendMessage } =  useWebSocket('wss://ws.bitstamp.net', {
  //   onOpen: () => console.log(`Connected to App WS`),
  //   onMessage: () => {
  //     if (lastJsonMessage) {
  //       console.log(lastJsonMessage)
  //     }
  //   },
  //   onError: (event) => { console.error(event); },
  //   shouldReconnect: (closeEvent) => true,
  //   reconnectInterval: 3000
  // });

  
  
  const handleNameSignin = (value: string) => {
      setNameSignin(value)
  }
  const handlePasswordSignin = (value: string) => {
    setPasswordSignin(value)
  }
  const handleClickSignin = () => {
    if(nameSignin !== '' && passwordSignin !== '') {
      api.post('/user', {
        name: nameSignin,
        password: passwordSignin,
        valueUSD: 1000.00,
        ValueGBP: 1000.00,
        pastTrades: []
      })
      .then((result) => {
        console.log(result.data.insertedId)
        history.push(`/dash/${result.data.insertedId}`)
      })   
    }
  }
  const handleClickBack = () => {
    history.push('/')
  }
  return (
  <>
    <AppBarContent title={'Signin'}/>
    <Toolbar id="back-to-top-anchor" />
    <Container>
      <Box sx={{ my: 5 }}>
        <InputsLogin label='Name' type='text' handle={async (value) => handleNameSignin(value)}/>
        <InputsLogin label='Password' type='password' handle={async (value) => handlePasswordSignin(value)}/>
          
        <Button 
            variant="contained" 
            fullWidth 
            onClick={handleClickSignin}
        >
            Sign in
        </Button>
        <Button 
          fullWidth 
          variant="outlined"
          onClick={handleClickBack}
        >
          Back
        </Button>
      </Box>
    </Container>  
  </>
  );
}

export default Signin;