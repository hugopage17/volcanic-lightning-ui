import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Feature } from '@global-volcanic-lightning/types';

import TableItem from './TableItem';

interface Props {
    lightning: Feature[];
}


const TableComponent: React.FC<Props> = ({ lightning }) => {
  return (
    <TableContainer component={Paper} id="table-component">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  align="left">Name</TableCell>
            <TableCell align="left">Region</TableCell>
            <TableCell align="left">Volcanic Type</TableCell>
            <TableCell align="left">20km Strikes</TableCell>
            <TableCell align="left">100km Strikes</TableCell>
            <TableCell align="left">Severity</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {lightning.map((strike, index) =>
                <TableItem
                    index={index}
                    key={strike.properties.name}
                    feature={strike}
                />
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
