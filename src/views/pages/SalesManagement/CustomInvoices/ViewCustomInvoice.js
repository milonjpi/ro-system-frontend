import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  StyledTableCellWithBorder,
  StyledTableCellWithNoBorder,
} from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 800 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const ViewCustomInvoice = ({ open, handleClose, data, startDate, endDate }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });
  let sn = 1;
  // calculation
  const allInvoices = data?.invoices || [];
  const totalPrice = totalSum(allInvoices, 'totalPrice');
  const discount = totalSum(allInvoices, 'discount');
  const totalAmount = totalSum(allInvoices, 'amount');
  const paidAmount = totalSum(allInvoices, 'paidAmount');
  const totalDue = totalAmount - paidAmount;
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Typography sx={{ fontSize: 18, color: '#878781' }}>
            Invoice View
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon color="error" fontSize="small" />
          </IconButton>
          <IconButton
            onClick={handlePrint}
            size="small"
            sx={{ position: 'absolute', top: 70, right: 16, zIndex: 12 }}
          >
            <PrintIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mt: 0.5, mb: 2 }} />
        <Box
          sx={{
            minWidth: 600,
            p: 3,
          }}
          ref={componentRef}
        >
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
                <Box sx={{ mt: 2 }}>
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
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                  TBZ Enterprise
                </Typography>
                <Typography sx={{ fontSize: 11 }}>Rajpat, Fakirhat</Typography>
                <Typography sx={{ fontSize: 11 }}>Bagerhat.</Typography>
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
                    <StyledTableCellWithBorder>
                      Description
                    </StyledTableCellWithBorder>
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
                      <TableRow>
                        <StyledTableCellWithBorder align="center">
                          {sn++}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {moment(el.date).format('DD/MM/YYYY')}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {'description'}
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
                      <StyledTableCellWithBorder colSpan={4} align="center">
                        No Data
                      </StyledTableCellWithBorder>
                    </TableRow>
                  )}
                  {allInvoices?.length ? (
                    <TableRow>
                      <StyledTableCellWithNoBorder
                        colSpan={3}
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        Total
                      </StyledTableCellWithNoBorder>
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
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewCustomInvoice;
