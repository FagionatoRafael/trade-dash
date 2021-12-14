import React, {useEffect, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Stack from '@mui/material/Stack';
import { api } from '../../service/api';
import { AppBarContent } from '../../Components/AppBar/AppBarContent';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import CardValues from '../../Components/CardValues/CardValues';
import AccordionPastTrades from '../../Components/AccordionPastTrades/AccordionPastTrades';

Chart.register(...registerables, zoomPlugin);

interface RouteParams {
  id: string
}

interface pastTradesParams {
  FromTo: string
	valueUSD: number,
  valueGBP:	number
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

  const [pasTrades, setPastTrades] = useState<Array<pastTradesParams>>([])

  const handleClickBuyUSDGBP = () => {
    setValueUSDUser(parseFloat(valueUSDUser.toString()) + parseFloat(USDValue.toString()))
    setValueGBPUser(valueGBPUser - GBPValue)
    updateUser(parseFloat(valueUSDUser.toString()), 
      parseFloat(valueGBPUser.toString()), 
      parseFloat(USDValue.toString()), 
      parseFloat(GBPValue.toString()))
  }

  const handleClickSellUSDGBP = () => {
    setValueUSDUser(parseFloat(valueGBPUser.toString()) + parseFloat(GBPValue.toString()))
    setValueGBPUser(valueUSDUser - USDValue)
    updateUser(parseFloat(valueUSDUser.toString()), 
      parseFloat(valueGBPUser.toString()), 
      parseFloat(USDValue.toString()), 
      parseFloat(GBPValue.toString()))
  }

  const handleClickBuyGBPUSD = () => {
    setValueUSDUser(parseFloat(valueGBPUser.toString()) + parseFloat(GBPValue.toString()))
    setValueGBPUser(valueUSDUser - USDValue)
    updateUser(parseFloat(valueUSDUser.toString()), 
      parseFloat(valueGBPUser.toString()), 
      parseFloat(USDValue.toString()), 
      parseFloat(GBPValue.toString()))
  }

  const handleClickSellGBPUSD = () => {
    setValueUSDUser(parseFloat(valueUSDUser.toString()) + parseFloat(USDValue.toString()))
    setValueGBPUser(valueGBPUser - GBPValue)
    updateUser(parseFloat(valueUSDUser.toString()), 
      parseFloat(valueGBPUser.toString()), 
      parseFloat(USDValue.toString()), 
      parseFloat(GBPValue.toString()))
  }

  const updateUser = (USDUser: number, GBPUser: number, USDValue: number, GBPValue: number) => {
    api.patch(`/user/${id}`, {
      valueUSD: USDUser,
      ValueGBP: GBPUser,
      pastTrades: [{
        "FromTo": `${CONVERTFROM}/${CONVERTTO}`,
        "valueUSD": USDValue,
        "valueGBP":	GBPValue
      }]
    }).then((result) => {
      console.log(result)
    })
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
      if(result.data[0].pastTrades.length !== 0) {
        pasTrades.push(result.data[0].pastTrades)
      }
    })
  }, [id, nameUser, valueUSDUser, valueGBPUser, pasTrades])

  useEffect(() => {
    api.get('/').then((result) => {
      if(result.data.GBPUSD.firstValue !== '' && result.data.USDGBP.firstValue !== '') {
        setValueGBPUSD(parseFloat(result.data.GBPUSD.firstValue))
        setSecondValueGBPUSD(parseFloat(result.data.GBPUSD.secondValue))
        setTimeGBPUSD(result.data.time)
        setValueUSDGBP(parseFloat(result.data.USDGBP.firstValue))
        setSecondValueUSDGBP(parseFloat(result.data.USDGBP.secondValue))                
      }
    }) 
    .catch((err) => console.log(err))
  })

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
          <AccordionPastTrades rowsPast={pasTrades}/>
          {/* <InputsDash label={"USD"} adornment={'$'} Value={USDValue} handleUSD={async (value) => handleUSD(value)}/> */}
          {/* <InputsDash label={"GBP"} adornment={'£'} Value={GBPValue} handleUSD={async (value) => handleGBP(value)}/>    */}
        </Box>
        <Box sx={{ my: 2 }}>

        <Stack direction="row" spacing={2}>
          <CardValues 
            title='USD/GBP' 
            value={valueGBPUSD} 
            label='GBP' 
            adornment={'£'} 
            handle={async (value) => handleGBP(value)}
            handleClickBuy={handleClickBuyUSDGBP}
            handleClickSell={handleClickSellUSDGBP}
            valueChange={USDValue}
            adornmentSecond={'$'}
          />
          <CardValues 
            title='GBP/USD' 
            value={valueUSDGBP} 
            label='USD' 
            adornment={'$'} 
            handle={async (value) => handleUSD(value)} 
            handleClickBuy={handleClickBuyGBPUSD}
            handleClickSell={handleClickSellGBPUSD}
            valueChange={GBPValue}
            adornmentSecond={'£'}
          />
          </Stack>
          {/* <ChartLine timeUSDGBP={arrTimeUSDGBP} valueUSDGBP={arrValueUSDGBP} valueGBPUSD={arrValueGBPUSD}/> */}
        </Box>
      </Container>  
    </>
  );
}