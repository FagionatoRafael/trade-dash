import React, {useEffect, useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom';
import { api } from '../../service/api';
import AppBarContent from '../../Components/AppBar/AppBarContent';
import { useParams } from 'react-router-dom';
import UserCard from '../../Components/UserCard/UserCard';
import CardValues from '../../Components/CardValues/CardValues';
import AccordionPastTrades from '../../Components/AccordionPastTrades/AccordionPastTrades';
import useWebSocket from 'react-use-websocket';


interface RouteParams {
  id: string
}

interface pastTradesParams {
  FromTo: string
	valueUSD: number,
  valueGBP:	number
}

export default function App() {

  const {id} = useParams<RouteParams>();
  const currencyPairgbpusd = 'gbpusd';
  // const currencyPairusdgbp = 'usdgbp';

  const history = useHistory()

  const [nameUser, setNameUser] = useState('')
  const [valueUSDUser, setValueUSDUser] = useState(0.0)
  const [valueGBPUser, setValueGBPUser] = useState(0.0)

  const [USDValue, setUSDValue] = useState(0.0)
  const [GBPValue, setGBPValue] = useState(0.0)
  const [CONVERTFROM, setCONVERTFROM] = useState('')
  const [CONVERTTO, setCONVERTTO] = useState('')
  const [CONVERTVALUE, setCONVERTVALUE] = useState('')

  const [valueGBPUSD, setValueGBPUSD] = useState(0)
  const [valueUSDGBP, setValueUSDGBP] = useState(0)

  const [pasTrades, setPastTrades] = useState<Array<pastTradesParams>>([])

  const [textHelper, setTextHelper] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)


  useEffect(() => {
    const subscribe = {
      event: 'bts:subscribe',
      data: {
        channel: `order_book_${currencyPairgbpusd}`
      }
    };
    const ws = new WebSocket('wss://ws.bitstamp.net');

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if(response.data.bids !== undefined) {
        setValueGBPUSD(response.data.bids[0][0])
      }
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [currencyPairgbpusd]);


  const handleClickBuyUSDGBP = () => {
    if((!(valueUSDUser < USDValue) || !(valueGBPUser < GBPValue)) && (USDValue !== 0 || GBPValue !== 0)) {
      updateUser(parseFloat(valueUSDUser.toString()) + parseFloat(USDValue.toString()), 
        valueGBPUser - GBPValue, 
        parseFloat(USDValue.toString()), 
        parseFloat(GBPValue.toString()))
      
      setValueUSDUser(parseFloat(valueUSDUser.toString()) + parseFloat(USDValue.toString()))
      setValueGBPUser(valueGBPUser - GBPValue)
    } else {
      setTextHelper('Do you need put some value!')
      setTimeout(() => {
        setTextHelper('')
      }, 2000)
    }
  }

  const handleClickBuyGBPUSD = () => {
    if((!(valueUSDUser < USDValue) || !(valueGBPUser < GBPValue)) && (USDValue !== 0 || GBPValue !== 0)) {
      updateUser(valueUSDUser - USDValue, 
        parseFloat(valueGBPUser.toString()) + parseFloat(GBPValue.toString()),
        parseFloat(USDValue.toString()), 
        parseFloat(GBPValue.toString()))

      setValueUSDUser(parseFloat(valueGBPUser.toString()) + parseFloat(GBPValue.toString()))
      setValueGBPUser(valueUSDUser - USDValue)
    } else {
      setTextHelper('Do you need put some value!')
      setTimeout(() => {
        setTextHelper('')
      }, 2000)
    }
  }

  const updateUser = (USDUser: number, GBPUser: number, USDValue: number, GBPValue: number) => {
    api.patch(`/user/${id}`, {
      valueUSD: USDUser,
      ValueGBP: GBPUser,
      pastTrades: {
        FromTo: `${CONVERTFROM}/${CONVERTTO}`,
        valueUSD: USDValue,
        valueGBP:	GBPValue
      }
    }).then((result) => {
      console.log(result)
    })
  }

  const handleUSD = (value: string) => {
    if(!(valueUSDUser < parseFloat(value))) {
      if(!isNaN(parseFloat(value))) {
        setUSDValue(parseFloat(value))
      }
      setCONVERTVALUE(value)
      setCONVERTFROM('USD')
      setCONVERTTO('GBP')
      setTextHelper('')
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
      setTextHelper('Your input value need to be less then what you have in you account!')
    }
  }

  const handleGBP = (value: string) => {
    if(!(valueGBPUser < parseFloat(value))) {
      if(!isNaN(parseFloat(value))) {
        setGBPValue(parseFloat(value))
      }
      setCONVERTVALUE(value)
      setCONVERTFROM('GBP')
      setCONVERTTO('USD')
      setTextHelper('')
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
      setTextHelper('Your input value need to be less then what you have in you account!')
    }
  }

  const Logout = () => {
    setNameUser('')
    setValueUSDUser(0)
    setValueGBPUser(0)
    setPastTrades([])
    history.push('/')
  }

  useEffect(() => {
    api.get(`/user/${id}`).then((result) => {
      setNameUser(result.data[0].name)
      setValueUSDUser(parseFloat(result.data[0].valueUSD))
      setValueGBPUser(parseFloat(result.data[0].ValueGBP))
      if(result.data[0].pastTrades.length !== 0) {
        setPastTrades(result.data[0].pastTrades)
      }
    })
  }, [id, nameUser, valueUSDUser, valueGBPUser, pasTrades])

  useEffect(() => {
    api.get('/').then((result) => {
      if(result.data.GBPUSD.firstValue !== '' && result.data.USDGBP.firstValue !== '') {
        // setValueGBPUSD(parseFloat(result.data.GBPUSD.firstValue))
        setValueUSDGBP(parseFloat(result.data.USDGBP.firstValue))             
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
        <UserCard nameUser={nameUser} valueGBPUser={valueGBPUser} valueUSDUser={valueUSDUser} exit={Logout}/>
        <Box sx={{ my: 2 }}>

        <Stack direction="row" spacing={2}>
          <CardValues 
            title='POUND - DOLLAR' 
            value={valueGBPUSD} 
            label='POUND' 
            adornment={'£'} 
            handle={async (value) => handleGBP(value)}
            handleClick={handleClickBuyUSDGBP}
            valueChange={USDValue}
            adornmentSecond={'$'}
            helper={textHelper}
            disabled={isDisabled}
          />
          <CardValues 
            title='DOLLAR - POUND' 
            value={valueUSDGBP} 
            label='DOLLAR' 
            adornment={'$'} 
            handle={async (value) => handleUSD(value)} 
            handleClick={handleClickBuyGBPUSD}
            valueChange={GBPValue}
            adornmentSecond={'£'}
            helper={textHelper}
            disabled={isDisabled}
          />
        </Stack>
        </Box>
        <Box sx={{ my: 2 }}>
          <AccordionPastTrades rowsPast={pasTrades}/>
        </Box>
        
      </Container>  
    </>
  );
}