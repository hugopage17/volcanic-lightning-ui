import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { IconButton } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { Feature } from '@global-volcanic-lightning/types'
import StrikeDialog from '../../dialogs/strike'

interface Props {
    feature: Feature;
    index: number
}

const TableItem: React.FC<Props> = ({ feature, index }) => {
    const [openMap, toggleMap] = React.useState(false);

  return (
    <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell
            component="th"
            scope="row"
            align="left"
            aria-label={`full-table-cell-${index}-name`}
        >
            {feature.properties.name}
        </TableCell>
        <TableCell
            aria-label={`full-table-cell-${index}-area`}
            align="left"
        >
            {feature.properties.area}
        </TableCell>
        <TableCell
            align="left"
            aria-label={`full-table-cell-${index}-volcano-type`}
        >
            {feature.properties.volcanoType}
        </TableCell>
        <TableCell
            align="left"
            aria-label={`full-table-cell-${index}-20km-strikes`}
        >
            {feature.properties.twentyKmStrikes}
        </TableCell>
        <TableCell
            align="left"
            aria-label={`full-table-cell-${index}-100km-strikes`}
        >
            {feature.properties.hundredKmStrikes}
        </TableCell>
        <TableCell align="left">
            <Chip
                color={feature.properties.severity as any}
                label={feature.properties.severity === 'error' ? 'High' : 'Medium'}
            />        
        </TableCell>
        <TableCell align="left">
            <IconButton
                onClick={() => toggleMap(true)}
                aria-label={`full-table-cell-show-coordinates-${index}`}
            >
                <MapIcon />
            </IconButton>       
        </TableCell>
        <StrikeDialog index={index} open={openMap} handleClose={() => toggleMap(false)} strike={feature}/>
    </TableRow>
  );
}

export default TableItem;
