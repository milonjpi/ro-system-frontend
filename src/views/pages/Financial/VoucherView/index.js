import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
  width: { xs: 350, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const VoucherView = ({ open, handleClose, data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });
  let sn = 1;

  const voucherDetails = data?.voucherDetails;
  const voucherDetailsAmount = totalSum(voucherDetails || [], 'receiveAmount');
  const advancedAmount = data?.amount - voucherDetailsAmount;
  console.log(data);
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
            Voucher View
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
              Voucher
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 12 }}>
                  {data?.customer?.customerName}
                </Typography>
                <Typography sx={{ fontSize: 12, letterSpacing: 2 }}>
                  {data?.customer?.address}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ pr: 2 }}>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Voucher Date:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {moment(data?.date).format('DD-MM-YYYY')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Voucher No:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {data?.voucherNo}
                    </Typography>
                  </Box>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: '#111', opacity: 1 }}
                />
                <Box sx={{ pl: 2 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                    TBZ Enterprise
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    Rajpat, Fakirhat
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>Bagerhat.</Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCellWithBorder align="center">
                      SN
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder>
                      Description
                    </StyledTableCellWithBorder>
                    <StyledTableCellWithBorder align="right">
                      Amount
                    </StyledTableCellWithBorder>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voucherDetails?.length ? (
                    voucherDetails?.map((el) => (
                      <TableRow key={el.id}>
                        <StyledTableCellWithBorder align="center">
                          {sn++}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {el.invoice?.invoiceNo +
                            ' - ' +
                            el.invoice?.totalQty +
                            ' pcs'}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder align="right">
                          {el.receiveAmount}
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
                  {advancedAmount > 0 ? (
                    <TableRow>
                      <StyledTableCellWithNoBorder
                        colSpan={2}
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        Advanced Amount
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithBorder
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        {advancedAmount}
                      </StyledTableCellWithBorder>
                    </TableRow>
                  ) : null}
                  {voucherDetails?.length ? (
                    <TableRow>
                      <StyledTableCellWithNoBorder
                        colSpan={2}
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        Total
                      </StyledTableCellWithNoBorder>
                      <StyledTableCellWithBorder
                        align="right"
                        sx={{ fontWeight: 700 }}
                      >
                        {data?.amount}
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

export default VoucherView;
