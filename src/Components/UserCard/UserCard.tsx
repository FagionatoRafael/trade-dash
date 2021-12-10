import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface UserCardProps {
    nameUser: string
    valueUSDUser: number
    valueGBPUser: number
}


const UserCard = (props: UserCardProps) => {

    return (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              <AccountBoxIcon style={{width: 100, height: 100}}/>
            </Typography>
            <Typography variant="h5" component="div">
              {props.nameUser} - $ {props.valueUSDUser} | £ {props.valueGBPUser}
            </Typography>
          </CardContent>
        </Card>
      );
}

export default UserCard;