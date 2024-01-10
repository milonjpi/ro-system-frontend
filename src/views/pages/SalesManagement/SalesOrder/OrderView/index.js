import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import PrintIcon from '@mui/icons-material/Print';
import moment from 'moment';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ShowStatus from 'ui-component/ShowStatus';
import { totalSum } from 'views/utilities/NeedyFunction';

const NoBorderCell = styled.td`
  text-align: right;
  padding: 8px;
  font-size: 12px;
`;
const TableCellLeft = styled.td`
  text-align: left;
  padding: 8px;
  font-size: 12px;
  border-right: 1px solid #000;
`;
const TableCellCenter = styled.td`
  text-align: center;
  padding: 8px;
  font-size: 12px;
  width: 30px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
`;
const TableCellRight = styled.td`
  text-align: right;
  padding: 8px;
  font-size: 12px;
  width: 100px;
  border-right: 1px solid #000;
`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 650 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const OrderView = ({ open, handleClose, data }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
    @media print {

    }
    `,
  });
  let sn = 1;
  const totalAmount = totalSum(data?.orderedProducts || [], 'totalPrice');
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
            Order View
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
              Sales Order
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
                      Order Date:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {moment(data?.date).format('DD-MM-YYYY')}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      Order No:
                    </Typography>
                    <Typography sx={{ fontSize: 11 }}>
                      {data?.orderNo}
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
                    Delivery Status:
                  </Typography>
                  <Typography sx={{ fontSize: 11 }}>
                    <ShowStatus status={data?.status} />
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ mt: 2, borderColor: '#000' }} />
            <Box>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                }}
              >
                <thead style={{ borderBottom: '1px solid #000' }}>
                  <tr>
                    <TableCellCenter>SN</TableCellCenter>
                    <TableCellLeft>Description</TableCellLeft>
                    <TableCellCenter>Qty</TableCellCenter>
                    <TableCellRight>Unit Price</TableCellRight>
                    <TableCellRight>Amount</TableCellRight>
                  </tr>
                </thead>
                <tbody style={{ borderBottom: '1px solid #000' }}>
                  {data?.orderedProducts?.map((el) => (
                    <tr key={el.id}>
                      <TableCellCenter>{sn++}</TableCellCenter>
                      <TableCellLeft>{el.product?.label}</TableCellLeft>
                      <TableCellCenter style={{ width: 50 }}>
                        {el?.quantity}
                      </TableCellCenter>
                      <TableCellRight>{el?.unitPrice}</TableCellRight>
                      <TableCellRight>{el.totalPrice}</TableCellRight>
                    </tr>
                  ))}

                  <tr>
                    <TableCellCenter></TableCellCenter>
                    <TableCellLeft></TableCellLeft>
                    <TableCellCenter></TableCellCenter>
                    <TableCellRight></TableCellRight>
                    <TableCellRight></TableCellRight>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <NoBorderCell colSpan={4}>Total:</NoBorderCell>
                    <NoBorderCell style={{ border: '1px solid #000' }}>
                      {totalAmount}
                    </NoBorderCell>
                  </tr>
                </tfoot>
              </table>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default OrderView;
