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

interface Props {
    lightning: Feature[];
}


const TableHighAlertComponent: React.FC<Props> = ({ lightning }) => {

    const [openMap, toggleMap] = React.useState(false);
    const [strike, setStrike] = React.useState<Feature | null>(null);

    const openMapDialog = (strike: Feature) => {
      toggleMap(true)
      setStrike(strike)
    };

    const alertStrikes = lightning.filter((strike) => strike.properties.severity === 'error').map((strike: any) => {
        return (
            {
                twentyKmStrikes: strike.properties.twentyKmStrikes,
                hundredKmStrikes: strike.properties.hundredKmStrikes,
                totalStrikes: Number(strike.properties.twentyKmStrikes + strike.properties.hundredKmStrikes),
                area: strike.properties.area,
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
    <div>
      <TableContainer component={Paper} sx={{ height: '50vh' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell  align="left">Name</TableCell>
              <TableCell align="left">Area</TableCell>
              <TableCell align="left">20km Strikes</TableCell>
              <TableCell align="left">100km Strikes</TableCell>
              <TableCell align="left">Total Strikes</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {alertStrikes.map((strike: any) =>
                  <TableRow
                      key={strike.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                      <TableCell align="left">{strike.name}</TableCell>
                      <TableCell align="left">{strike.area}</TableCell>
                      <TableCell align="left">{strike.twentyKmStrikes}</TableCell>
                      <TableCell align="left">{strike.hundredKmStrikes}</TableCell>
                      <TableCell align="left">{strike.totalStrikes}</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => openMapDialog(lightning.find((feature) => feature.properties.name === strike.name) as Feature) }>
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
    </div>
  );
}

export default TableHighAlertComponent;
