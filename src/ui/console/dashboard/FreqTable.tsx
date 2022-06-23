import * as React from 'react';
import { IconButton, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Feature } from '@global-volcanic-lightning/types';
import MapIcon from '@mui/icons-material/Map';

import StrikeDialog from '../dialogs/StikeDialog';

interface Props {
    lightning: Feature[];
}


const TableFreqComponent: React.FC<Props> = ({ lightning }) => {

    const [openMap, toggleMap] = React.useState(false);
    const [strike, setStrike] = React.useState<Feature | null>(null);

    const openMapDialog = (strike: Feature) => {
      toggleMap(true)
      setStrike(strike)
    };


    const highestStrikes = lightning.map((strike) => {
        return (
            {
                twentyKmStrikes: strike.properties.twentyKmStrikes,
                hundredKmStrikes: strike.properties.hundredKmStrikes,
                totalStrikes: Number(strike.properties.twentyKmStrikes + strike.properties.hundredKmStrikes),
                severity: strike.properties.severity,
                name: strike.properties.name
            }
        )
    }).sort((arrayItemA: any, arrayItemB: any) => {
        if (arrayItemA.totalStrikes > arrayItemB.totalStrikes) {
            return -1
        }
    
        if (arrayItemA.totalStrikes < arrayItemB.totalStrikes) {
            return 1
        }

        return 0
    }).splice(0, 10)

  return (
    <>
        <TableContainer component={Paper} sx={{ height: '50vh' }}>
        <Table aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell  align="left">Name</TableCell>
                <TableCell align="left">20km Strikes</TableCell>
                <TableCell align="left">100km Strikes</TableCell>
                <TableCell align="left">Total Strikes</TableCell>
                <TableCell align="left">Severity</TableCell>
                <TableCell align="left"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {highestStrikes.map((strike: any) =>
                    <TableRow
                        key={strike.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell align="left">{strike.name}</TableCell>
                        <TableCell align="left">{strike.twentyKmStrikes}</TableCell>
                        <TableCell align="left">{strike.hundredKmStrikes}</TableCell>
                        <TableCell align="left">{strike.totalStrikes}</TableCell>
                        <TableCell align="left">
                            <Chip
                                color={strike.severity}
                                label={strike.severity === 'error' ? 'High' : 'Medium'}
                            />        
                        </TableCell>
                        <TableCell align="left">
                        <IconButton onClick={() => openMapDialog(lightning.find((feature) => feature.properties.name === strike.name) as Feature)}>
                            <MapIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>      
        </TableContainer>
        <StrikeDialog
            strike={strike as Feature}
            open={openMap}
            handleClose={() => toggleMap(false)}
        />
    </>
  );
}

export default TableFreqComponent;
