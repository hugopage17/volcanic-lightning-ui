import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Paper } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { Feature } from '@global-volcanic-lightning/types';
import StrikeDialog from '../../dialogs/strike';
import { alertStrikes } from '../../../api/sortedStrikeData';

interface Props {
    lightning: Feature[];
}


const TableHighAlertComponent: React.FC<Props> = ({ lightning }) => {

  const [openMap, toggleMap] = React.useState(false);
  const [strike, setStrike] = React.useState<Feature | null>(null);
  const [index, setIndex] = React.useState<number>(0);

  const openMapDialog = (strike: Feature, index: number) => {
    setIndex(index)
    toggleMap(true)
    setStrike(strike)
  };

  return (
    <div>
      <TableContainer component={Paper} sx={{ height: '50vh' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Area</TableCell>
              <TableCell align="left">20km Strikes</TableCell>
              <TableCell align="left">100km Strikes</TableCell>
              <TableCell align="left">Total Strikes</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {alertStrikes(lightning).map((strike, index) =>
                  <TableRow
                      key={strike.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell
                        align="left"
                        aria-label={`alert-strikes-table-cell-${index}-name`}
                      >
                        {strike.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        aria-label={`alert-strikes-table-cell-${index}-area`}
                      >{strike.area}</TableCell>
                      <TableCell
                        align="left"
                        aria-label={`alert-strikes-table-cell-${index}-20km-strikes`}
                      >{strike.twentyKmStrikes}</TableCell>
                      <TableCell
                        align="left"
                        aria-label={`alert-strikes-table-cell-${index}-100km-strikes`}
                      >{strike.hundredKmStrikes}</TableCell>
                      <TableCell aria-label={`alert-strikes-table-cell-${index}-total-strikes`} align="left">{strike.totalStrikes}</TableCell>
                      <TableCell align="left">
                        <IconButton aria-label={`alert-strikes-table-cell-show-coordinates-${index}`} onClick={() => openMapDialog(lightning.find((feature) => feature.properties.name === strike.name) as Feature, index) }>
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
    </div>
  );
}

export default TableHighAlertComponent;
