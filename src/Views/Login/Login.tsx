import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBarContent from '../../Components/AppBar/AppBarContent';
import InputsLogin from '../../Components/InputsLogin/InputsLogin';
import { api } from '../../service/api';


const Login = () => {

  const [nameLogin, setNamelogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const history = useHistory()

  const handleNameLogin = (value: string) => {
    setNamelogin(value)
  }

  const handlePasswordLogin = (value: string) => {
    setPasswordLogin(value)
  }

  const handleClickLogin = () => {
    api.get('/user', {
      params: {
        name: nameLogin,
        password: passwordLogin
    }})
    .then((result) => {
      if(nameLogin !== '' && passwordLogin !== '') {
        history.push(`/dash/${result.data._id}`)
      }
    })
    
  }

  const handleClickSignIn = () => {
    history.push('/signin')
  }

    return (
        <>
          <AppBarContent title={'Login'}/>
          <Toolbar id="back-to-top-anchor" />
          <Container>
            <Box sx={{ my: 5 }}>
              <InputsLogin label='Name' type='text' handle={async (value) => handleNameLogin(value)}/>
              <InputsLogin label='Password' type='password' handle={async (value) => handlePasswordLogin(value)}/>
                
              <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleClickLogin}
              >
                  Login
              </Button>
              <Button 
                fullWidth 
                variant="outlined"
                onClick={handleClickSignIn}
              >
                Sign In
              </Button>
            </Box>
          </Container>  
        </>
      );
}

export default Login;