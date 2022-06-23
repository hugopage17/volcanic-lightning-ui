import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { Feature } from '@global-volcanic-lightning/types'
import StrikeDialog from '../dialogs/StikeDialog'

interface Props {
    feature: Feature;
}

const TableItem: React.FC<Props> = ({ feature }) => {
    const [openMap, toggleMap] = React.useState(false);
  return (
    <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row" align="left">
            {feature.properties.name}
        </TableCell>
        <TableCell align="left">{feature.properties.area}</TableCell>
        <TableCell align="left">{feature.properties.volcanoType}</TableCell>
        <TableCell align="left">{feature.properties.twentyKmStrikes}</TableCell>
        <TableCell align="left">{feature.properties.hundredKmStrikes}</TableCell>
        <TableCell align="left">
            <Chip
                color={feature.properties.severity as any}
                label={feature.properties.severity === 'error' ? 'High' : 'Medium'}
            />        
        </TableCell>
        <TableCell align="left">
            <IconButton onClick={() => toggleMap(true)}>
                <MapIcon />
            </IconButton>       
        </TableCell>
        <StrikeDialog open={openMap} handleClose={() => toggleMap(false)} strike={feature}/>
    </TableRow>
  );
}

export default TableItem;
