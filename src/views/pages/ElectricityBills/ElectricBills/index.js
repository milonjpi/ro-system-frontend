import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus, IconPrinter } from '@tabler/icons-react';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import AddElectricBill from './AddElectricBill';
import ElectricBillRow from './ElectricBillRow';
import { useGetElectricityBillsQuery } from 'store/api/electricityBill/electricityBillApi';
import { electricMonths, electricYears } from 'assets/data';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintElectricBills from './PrintElectricBills';
import { TableRow } from '@mui/material';

const ElectricBills = () => {
  const [smsAccount, setSmsAccount] = useState(null);
  const [meter, setMeter] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [status, setStatus] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: meterData, isLoading: meterLoading } = useGetMetersQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = meterData?.meters || [];
  // end library

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'date';
  query['sortOrder'] = 'asc';

  if (smsAccount) {
    query['smsAccount'] = smsAccount;
  }

  if (meter) {
    query['meterId'] = meter?.id;
  }

  if (year) {
    query['year'] = year;
  }

  if (month) {
    query['month'] = month;
  }

  if (status) {
    query['status'] = status;
  }

  const { data, isLoading } = useGetElectricityBillsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allElectricityBills = data?.electricityBills || [];
  const meta = data?.meta;
  const totalUnit = data?.sum?._sum?.unit || 0;
  const totalNetBill = data?.sum?._sum?.netBill || 0;
  const totalServiceCharge = data?.sum?._sum?.serviceCharge || 0;
  const totalAmount = data?.sum?._sum?.amount || 0;

  let sn = page * rowsPerPage + 1;

  // print data
  const { data: printData } = useGetElectricityBillsQuery(
    { ...query, page: 0, limit: 10000 },
    { refetchOnMountOrArgChange: true }
  );

  const allPrintElectricityBills = printData?.electricityBills || [];
  const printSum = printData?.sum;

  // handle print
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        .pageBreakRow {
          page-break-inside: avoid;
        }
      }
      `,
  });
  return (
    <MainCard
      title={
        <span>
          Electric Bills{' '}
          <Tooltip title="Print">
            <IconButton size="small" color="primary" onClick={handlePrint}>
              <IconPrinter size={20} />
            </IconButton>
          </Tooltip>
        </span>
      }
      secondary={
        <CardAction
          title="Add Bill"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={smsAccount}
              loading={meterLoading}
              size="small"
              fullWidth
              options={[...new Set(allMeters?.map((el) => el.smsAccount))]}
              onChange={(e, newValue) => setSmsAccount(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="SMS Account" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={meter}
              loading={meterLoading}
              size="small"
              fullWidth
              options={allMeters}
              getOptionLabel={(option) =>
                option.label +
                (option.smsAccount ? ', ' + option?.smsAccount : '')
              }
              onChange={(e, newValue) => setMeter(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Meter" />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={electricYears}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Autocomplete
              value={month}
              size="small"
              fullWidth
              options={electricMonths}
              onChange={(e, newValue) => setMonth(newValue)}
              renderInput={(params) => <TextField {...params} label="Month" />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              value={status}
              size="small"
              fullWidth
              options={['Due', 'Paid']}
              onChange={(e, newValue) => setStatus(newValue)}
              renderInput={(params) => <TextField {...params} label="Status" />}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddElectricBill open={open} handleClose={() => setOpen(false)} />
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintElectricBills
          ref={componentRef}
          allElectricityBills={allPrintElectricityBills}
          printSum={printSum}
        />
      </Box>
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }}>
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
              <StyledTableCellWithBorder align="center">
                Action
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allElectricityBills?.length ? (
              allElectricityBills.map((item) => (
                <ElectricBillRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={16}
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
                  colSpan={2}
                ></StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default ElectricBills;
