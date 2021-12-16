import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import InputsDash from '../inputsDash/InputsDash';

interface CardValuesProps {
  title: string
  value: number
  valueChange: number
  label: string
  handle: (arg0: string) => {}
  adornment: string
  adornmentSecond: string
  handleClick: () => void
  helper: string
  disabled: boolean
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
          <InputsDash 
            label={props.label} 
            handleUSD={(value) => props.handle(value)} 
            adornment={props.adornment} 
            helper={props.helper}
          />
          <Button color='success'>{props.adornmentSecond} {props.valueChange}</Button>
          <Button onClick={() => props.handleClick()} disabled={props.disabled}>trade</Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
}

export default CardValues;