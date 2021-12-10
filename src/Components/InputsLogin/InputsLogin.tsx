import TextField from '@mui/material/TextField';
import React from 'react';

interface InputsProps {
    type: string
    label: string
    handle: (arg0: string) => {}
}

export const InputsLogin = (props: InputsProps) => {
    return (
      <TextField 
        id="outlined-basic" 
        label={props.label}
        variant="outlined" 
        type={props.type}
        style={{marginBottom: 10}}
        onChange={(value) => props.handle(value.target.value)}
        fullWidth
      />
    )
}