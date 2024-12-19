import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import PrintElectricBillRow from './PrintElectricBillRow';

const PrintElectricBills = forwardRef(
  ({ allElectricityBills, printSum }, ref) => {
    let sn = 1;

    // calculation
    const totalUnit = printSum?._sum?.unit || 0;
    const totalNetBill = printSum?._sum?.netBill || 0;
    const totalServiceCharge = printSum?._sum?.serviceCharge || 0;
    const totalAmount = printSum?._sum?.amount || 0;
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            Electric Bills Report
          </Typography>
        </Box>

        <Table id="printTable">
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Paid Date</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Meter Info</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Year</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Month</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Reading
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Unit
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Net Bill
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Service Charge
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Total Bill
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Paid By</StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allElectricityBills?.length ? (
              allElectricityBills.map((item) => (
                <PrintElectricBillRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={16}
                  sx={{ border: 0 }}
                  align="center"
                >
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allElectricityBills?.length ? (
              <TableRow>
                <StyledTableCellWithBorder colSpan={6} sx={{ fontWeight: 700 }}>
                  TOTAL
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalUnit}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalNetBill}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalServiceCharge}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                ></StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintElectricBills;
