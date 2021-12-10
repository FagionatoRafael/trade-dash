import React, {useEffect, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import { InputsDash } from '../../Components/inputsDash/Inputs';
import { api } from '../../service/api';
import { AppBarContent } from '../../Components/AppBar/AppBarContent';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import CardValues from '../../Components/CardValues/CardValues';

Chart.register(...registerables, zoomPlugin);

interface RouteParams {
  id: string
}

export default function App() {

  let {id} = useParams<RouteParams>();

  const [nameUser, setNameUser] = useState('')
  const [valueUSDUser, setValueUSDUser] = useState(0.0)
  const [valueGBPUser, setValueGBPUser] = useState(0.0)

  const [USDValue, setUSDValue] = useState(0.0)
  const [GBPValue, setGBPValue] = useState(0.0)
  const [CONVERTFROM, setCONVERTFROM] = useState('')
  const [CONVERTTO, setCONVERTTO] = useState('')
  const [CONVERTVALUE, setCONVERTVALUE] = useState('')

  const [valueGBPUSD, setValueGBPUSD] = useState(0)
  const [secondValueGBPUSD, setSecondValueGBPUSD] = useState(0)
  const [timeGBPUSD, setTimeGBPUSD] = useState('')

  const [valueUSDGBP, setValueUSDGBP] = useState(0)
  const [secondValueUSDGBP, setSecondValueUSDGBP] = useState(0)

  const handleClick = () => {
    setValueUSDUser(valueUSDUser + USDValue)
    setValueGBPUser(valueGBPUser - GBPValue)
  }

  const handleUSD = (value: string) => {
    if(!isNaN(parseFloat(value))) {
      setUSDValue(parseFloat(value))
    }
    setCONVERTVALUE(value)
    setCONVERTFROM('USD')
    setCONVERTTO('GBP')
  }

  const handleGBP = (value: string) => {
    if(!isNaN(parseFloat(value))) {
      setGBPValue(parseFloat(value))
    }
    setCONVERTVALUE(value)
    setCONVERTFROM('GBP')
    setCONVERTTO('USD')
  }

  useEffect(() => {
    api.get(`/user/${id}`).then((result) => {
      setNameUser(result.data[0].name)
      setValueUSDUser(parseFloat(result.data[0].valueUSD))
      setValueGBPUser(parseFloat(result.data[0].ValueGBP))
    })
  }, [id, nameUser, valueUSDUser, valueGBPUser])

  useEffect(() => {
  
    api.get('/').then((result) => {
      setValueGBPUSD(parseFloat(result.data.GBPUSD.firstValue))
      setSecondValueGBPUSD(parseFloat(result.data.GBPUSD.secondValue))
      setTimeGBPUSD(result.data.time)
      setValueUSDGBP(parseFloat(result.data.USDGBP.firstValue))
      setSecondValueUSDGBP(parseFloat(result.data.USDGBP.secondValue))
    }) 
  }, [secondValueGBPUSD, secondValueUSDGBP, timeGBPUSD, valueGBPUSD, valueUSDGBP])

  useEffect(() => {
    api.post('/', {
      "CONVERT_VALUE": CONVERTVALUE,
      "CONVERT_FROM": CONVERTFROM,
      "CONVERT_TO": CONVERTTO
    }).then((result) => {
      CONVERTFROM === 'GBP' ? setUSDValue(result.data.CONVERTED_VALUE) : setGBPValue(result.data.CONVERTED_VALUE)

    })
  }, [USDValue, GBPValue, CONVERTVALUE, CONVERTFROM, CONVERTTO])

  
  return (
    <>
      <AppBarContent title={'Trade Aplication'}/>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <UserCard nameUser={nameUser} valueGBPUser={valueGBPUser} valueUSDUser={valueUSDUser}/>
        <Box sx={{ my: 2 }}>
          <InputsDash label={"USD"} adornment={'$'} Value={USDValue} handleUSD={async (value) => handleUSD(value)}/>
          <InputsDash label={"GBP"} adornment={'£'} Value={GBPValue} handleUSD={async (value) => handleGBP(value)}/>   
        </Box>
        <Box sx={{ my: 2 }}>
          <CardValues 
            title='USD/GBP' 
            value={valueGBPUSD} 
            label='GBP' 
            adornment={'£'} 
            handle={async (value) => handleGBP(value)}
            handleClick={handleClick}
            valueChange={USDValue}
            adornmentSecond={'$'}
          />
          <CardValues 
            title='GBP/USD' 
            value={valueUSDGBP} 
            label='USD' 
            adornment={'$'} 
            handle={async (value) => handleUSD(value)} 
            handleClick={handleClick}
            valueChange={GBPValue}
            adornmentSecond={'£'}
          />
          {/* <ChartLine timeUSDGBP={arrTimeUSDGBP} valueUSDGBP={arrValueUSDGBP} valueGBPUSD={arrValueGBPUSD}/> */}
        </Box>
      </Container>  
    </>
  );
}