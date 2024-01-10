import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { totalSum } from 'views/utilities/NeedyFunction';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const InvoiceComponent = ({ data, startDate, endDate }) => {
  let sn = 1;

  // calculation
  const allInvoices = data?.invoices || [];
  const totalPrice = totalSum(allInvoices, 'totalPrice');
  const discount = totalSum(allInvoices, 'discount');
  const totalAmount = totalSum(allInvoices, 'amount');
  const paidAmount = totalSum(allInvoices, 'paidAmount');
  const totalDue = totalAmount - paidAmount;
  return (
    <Box className="printPage">
      <Typography
        sx={{
          fontSize: 22,
          textTransform: 'uppercase',
          fontWeight: 700,
          mb: 2,
          lineHeight: 1,
          color: '#614cab',
        }}
      >
        Invoice
      </Typography>

      <Box
        sx={{
          mt: 3,
          mb: 2,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
            {data?.customerName}
          </Typography>
          <Typography sx={{ fontSize: 12, letterSpacing: 2 }}>
            {data?.address}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
            Invoice Date:
          </Typography>
          <Typography sx={{ fontSize: 11 }}>
            {moment(startDate).format('DD/MM/YYYY') +
              ' - ' +
              moment(endDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Date</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Description</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Total Price
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Discount
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Paid Amount
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Due
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allInvoices?.length ? (
              allInvoices?.map((el) => (
                <TableRow key={el.id}>
                  <StyledTableCellWithBorder align="center">
                    {sn++}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder>
                    {moment(el.date).format('DD/MM/YYYY')}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder>
                    {el.invoicedProducts?.map((ip) => (
                      <Typography ke={ip.id} sx={{ fontSize: 11 }}>
                        {ip?.product?.label + ' - ' + ip.quantity + ' pcs'}
                      </Typography>
                    ))}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder align="right">
                    {el.totalPrice}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder align="right">
                    {el.discount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder align="right">
                    {el.amount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder align="right">
                    {el.paidAmount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder align="right">
                    {el.amount - el.paidAmount}
                  </StyledTableCellWithBorder>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={8} align="center">
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allInvoices?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={3}
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  Total
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalPrice}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {discount}
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
                >
                  {paidAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontWeight: 700 }}
                >
                  {totalDue}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default InvoiceComponent;
