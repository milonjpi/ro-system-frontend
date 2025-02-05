import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TableRow } from '@mui/material';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';
import SubCard from 'ui-component/cards/SubCard';
import ShowStatus from 'ui-component/ShowStatus';
import DataTable from 'ui-component/table';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 350, sm: 500, md: 750 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 3,
};

const ViewOperationExpense = ({ open, handleClose, data }) => {
  const buildingPayments = data?.buildingPayments || [];
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'DATE',
    },
    {
      title: 'PAYMENT METHOD',
    },
    {
      title: 'DETAILS',
    },
    {
      title: 'AMOUNT',
      align: 'right',
    },
  ];
  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            Quick View Expense
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 700 }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <SubCard title="EXPENSE DETAILS" sx={{ height: '100%' }}>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Date: </span>
                    {moment(data?.date).format('DD/MM/YYYY')}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Expense Head: </span>
                    {data?.expenseHead?.label}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Quantity: </span>
                    {data?.quantity + ' ' + data?.uom?.label}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Unit Price: </span>
                    {data?.unitPrice}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Total Amount: </span>
                    {data?.amount}
                  </Typography>
                </SubCard>
              </Grid>
              <Grid item xs={6}>
                <SubCard title="VENDOR DETAILS" sx={{ height: '100%' }}>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Name: </span>
                    {data?.vendor?.label}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 0.8,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Contact NO: </span>
                    {data?.vendor?.contactNo || 'n/a'}
                  </Typography>
                  <Typography
                    sx={{
                      mb: 1.3,
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Address: </span>
                    {data?.vendor?.address || 'n/a'}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span style={{ fontWeight: 400 }}>Payment Status: </span>
                    <ShowStatus status={data?.status} />
                  </Typography>
                  {['Due', 'Partial'].includes(data?.status) ? (
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 12,
                        textTransform: 'uppercase',
                      }}
                    >
                      <span style={{ fontWeight: 400 }}>Due: </span>
                      <span style={{ color: 'red' }}>
                        {data?.amount - data?.paidAmount}
                      </span>
                    </Typography>
                  ) : null}
                </SubCard>
              </Grid>
              <Grid item xs={12}>
                <SubCard title="PAYMENT DETAILS">
                  <DataTable
                    bordered
                    tableHeads={tableHeads}
                    data={buildingPayments}
                    options={(el, index) => (
                      <TableRow key={el.id}>
                        <StyledTableCellWithBorder align="center">
                          {index + 1}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder>
                          {moment(el.date).format('DD/MM/YYYY')}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder
                          sx={{
                            textTransform: 'uppercase',
                          }}
                        >
                          {el.paymentMethod?.label}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder
                          sx={{
                            textTransform: 'uppercase',
                          }}
                        >
                          {el?.paymentDetails || 'n/a'}
                        </StyledTableCellWithBorder>
                        <StyledTableCellWithBorder align="right">
                          {el.amount}
                        </StyledTableCellWithBorder>
                      </TableRow>
                    )}
                    extra={
                      buildingPayments?.length ? (
                        <TableRow>
                          <StyledTableCellWithBorder
                            colSpan={4}
                            sx={{
                              fontSize: '12px !important',
                              fontWeight: 700,
                            }}
                          >
                            TOTAL
                          </StyledTableCellWithBorder>
                          <StyledTableCellWithBorder
                            align="right"
                            sx={{
                              fontSize: '12px !important',
                              fontWeight: 700,
                            }}
                          >
                            {data?.paidAmount}
                          </StyledTableCellWithBorder>
                        </TableRow>
                      ) : null
                    }
                  />
                </SubCard>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default ViewOperationExpense;
