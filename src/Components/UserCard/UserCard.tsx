import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface UserCardProps {
    nameUser: string
    valueUSDUser: number
    valueGBPUser: number
    exit: () => void
}


const UserCard = (props: UserCardProps) => {

    return (
        <Card sx={{ minWidth: 275 }}>
          <Stack direction="row" spacing={2}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <AccountBoxIcon style={{width: 100, height: 100}}/>
            </Typography>
            <Typography variant="h5" component="div">
              {props.nameUser} - $ {props.valueUSDUser.toFixed(2)} | £ {props.valueGBPUser.toFixed(2)}
            </Typography>
          </CardContent>
          <CardContent>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button onClick={props.exit}>
                <LogoutIcon/>
              </Button>
            </ButtonGroup>
          </CardContent>
          </Stack>
        </Card>
      );
}

export default UserCard;