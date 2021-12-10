import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';

interface InputsProps {
    Value: number
    label: string
    adornment: string
    handleUSD: (arg0: string) => {}
}

export const InputsDash = (props: InputsProps) => {
    return (
      <TextField 
        id="outlined-basic" 
        label={props.label}
        variant="outlined" 
        type='number' 
        value={props.Value}
        style={{padding: 10}}
        onChange={(value) => props.handleUSD(value.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {props.adornment}
            </InputAdornment>
          ),
        }}
      />
    )
}