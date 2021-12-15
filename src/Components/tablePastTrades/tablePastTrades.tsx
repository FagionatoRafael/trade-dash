import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface pastTradesParams {
    FromTo: string
      valueUSD: number,
    valueGBP:	number
  }

interface TablePsatTradeProps {
    rowsPast: Array<pastTradesParams>
}

const TablePastTrades = (prosp: TablePsatTradeProps) => {

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Trade</TableCell>
            <TableCell align="right">Value DOLLAR</TableCell>
            <TableCell align="right">value POUND</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {prosp.rowsPast.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.FromTo}</TableCell>
              <TableCell align="right">{row.valueUSD}</TableCell>
              <TableCell align="right">{row.valueGBP}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TablePastTrades;