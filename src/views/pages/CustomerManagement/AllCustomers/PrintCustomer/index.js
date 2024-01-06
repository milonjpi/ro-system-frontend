import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useCustomerDetailsQuery } from 'store/api/customer/customerApi';
import PrintCustomerRow from './PrintCustomerRow';

const PrintCustomer = forwardRef(({ data }, ref) => {
  const { data: customerData, isLoading } = useCustomerDetailsQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allCustomers = customerData?.customers || [];
  let sn = 1;
  return (
    <Box component="div" ref={ref} sx={{ p: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h2"
          sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
        >
          TBZ RO SYSTEM
        </Typography>
        <Typography component="p" sx={{ fontSize: 14, textAlign: 'center' }}>
          Rajpat, Fakirhat, Bagerhat.
        </Typography>
        <Typography
          component="h6"
          sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
        >
          All Client List
        </Typography>
      </Box>

      <Table id="printTable">
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center">
              SN
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Client ID</StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Client Name</StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              Client Name &#40;BN&#41;
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Mobile</StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Address</StyledTableCellWithBorder>
            <StyledTableCellWithBorder>Group By</StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCustomers?.length ? (
            allCustomers.map((item) => (
              <PrintCustomerRow key={item.id} sn={sn++} data={item} />
            ))
          ) : (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={10}
                sx={{ border: 0 }}
                align="center"
              >
                {isLoading ? (
                  <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                ) : (
                  'No Data'
                )}
              </StyledTableCellWithBorder>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
});

export default PrintCustomer;
