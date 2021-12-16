import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import React from 'react';

interface InputsProps {
    label: string
    adornment: string
    handleUSD: (arg0: string) => {}
    helper: string
}

const InputsDash = (props: InputsProps) => {
    return (
      <TextField 
        id="outlined-basic" 
        label={props.label}
        variant="outlined" 
        type='number' 
        style={{margin: 10}}
        onChange={(value) => props.handleUSD(value.target.value)}
        fullWidth
        helperText={props.helper}
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

export default InputsDash;