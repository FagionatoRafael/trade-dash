import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

interface CardValuesProps {
  title: string
  value: number
  valueChange: number
  label: string
  handle: (arg0: string) => {}
  adornment: string
  adornmentSecond: string
  handleClickBuy: () => void
  handleClickSell: () => void
}

const CardValues = (props: CardValuesProps) => {

    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.title}
              </Typography>
              <Typography variant="h5" component="div">
                {props.value}
              </Typography>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <TextField 
                id="outlined-basic" 
                label={props.label}
                variant="outlined" 
                type='number' 
                style={{margin: 10}}
                onChange={(value) => props.handle(value.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {props.adornment}
                    </InputAdornment>
                  ),
                }}
              />
                <Button color='success'>{props.adornmentSecond} {props.valueChange}</Button>
                <Button onClick={() => props.handleClickBuy()}>Buy</Button>
                <Button onClick={() => props.handleClickSell()}>Sell</Button>
              </ButtonGroup>
            </CardContent>
        </Card>
      );
}

export default CardValues;