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

import StrikeDialog from '../../dialogs/strike';
import { highestStrikes } from '../../../api/sortedStrikeData';

interface Props {
    lightning: Feature[];
}


const TableFreqComponent: React.FC<Props> = ({ lightning }) => {

    const [openMap, toggleMap] = React.useState(false);
    const [strike, setStrike] = React.useState<Feature | null>(null);
    const [index, setIndex] = React.useState<number>(0);

    const openMapDialog = (strike: Feature, index: number) => {
        setIndex(index)
      toggleMap(true)
      setStrike(strike)
    };

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
                {highestStrikes(lightning).map((strike, index) =>
                    <TableRow
                        key={strike.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell 
                            align="left"
                            aria-label={`highest-strikes-table-cell-${index}-name`}
                        >
                            {strike.name}
                        </TableCell>
                        <TableCell
                            align="left"
                            aria-label={`highest-strikes-table-cell-${index}-20km-strikes`}
                        >
                                {strike.twentyKmStrikes}
                            </TableCell>
                        <TableCell align="left" aria-label={`highest-strikes-table-cell-${index}-100km-strikes`}>
                            {strike.hundredKmStrikes}
                        </TableCell>
                        <TableCell align="left" aria-label={`highest-strikes-table-cell-${index}-total-strikes`}>{strike.totalStrikes}</TableCell>
                        <TableCell align="left">
                            <Chip
                                color={strike.severity as any}
                                label={strike.severity === 'error' ? 'High' : 'Medium'}
                            />        
                        </TableCell>
                        <TableCell align="left">
                        <IconButton
                            aria-label={`highest-strikes-table-cell-show-coordinates-${index}`}
                            onClick={() => openMapDialog(lightning.find((feature) => feature.properties.name === strike.name) as Feature, index)}
                        >
                            <MapIcon />
                        </IconButton>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>      
        </TableContainer>
        <StrikeDialog
            index={index}
            strike={strike as Feature}
            open={openMap}
            handleClose={() => toggleMap(false)}
        />
    </>
  );
}

export default TableFreqComponent;
