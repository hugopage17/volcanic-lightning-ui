import React from 'react';
import { ErrorOutline } from '@mui/icons-material';
import { Card, CardActions, CardContent, Button, Typography, Divider } from '@mui/material';
import AppContext from '../../AppContext';


const ErrorComponent = (): JSX.Element => {
    const { reload } = React.useContext(AppContext);
    return (
        <Card sx={{ textAlign: 'center', width: '35%', position: 'fixed', top: '25%', left: '35%' }}>
            <CardContent>
                <Typography variant="h5">
                    Error
                </Typography>
                <Typography variant="subtitle1">
                    Failed to fetch lightning data
                </Typography>
                <ErrorOutline fontSize="large"/>
            </CardContent>
            <Divider />
            <CardActions>
                <Button color="error" onClick={reload}>Retry</Button>
            </CardActions>
        </Card>
    ) 
};

export default ErrorComponent;
