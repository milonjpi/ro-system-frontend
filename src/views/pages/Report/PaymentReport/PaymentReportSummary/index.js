import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconCloudDownload, IconPrinter } from '@tabler/icons-react';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import moment from 'moment';
import { utils, writeFile } from 'xlsx';
import { useGetVouchersQuery } from 'store/api/voucher/voucherApi';
import { useGetAllVendorsQuery } from 'store/api/vendor/vendorApi';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import PaymentReportSummaryRow from './PaymentReportSummaryRow';
import groupBy from 'lodash.groupby';
import PrintPaymentReportSummary from './PrintPaymentReportSummary';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PaymentReportSummary = () => {
  const [vendor, setVendor] = useState(null);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  // library
  const { data: vendorData } = useGetAllVendorsQuery(
    {
      isActive: true,
      limit: 1000,
      sortBy: 'vendorName',
      sortOrder: 'asc',
    },
    { refetchOnMountOrArgChange: true }
  );

  const allVendors = vendorData?.vendors || [];
  // end library

  // table
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

  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Vendor',
    },
    {
      title: 'Date',
    },
    {
      title: 'Voucher No',
    },
    {
      title: 'Bill Details',
    },
    {
      title: 'Narration',
    },
    {
      title: 'Amount',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = 5000;
  query['page'] = 0;
  query['type'] = 'Paid';
  query['report'] = true;

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }
  if (vendor) {
    query['vendorId'] = vendor?.id;
  }

  const { data, isLoading } = useGetVouchersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allVouchers = data?.vouchers || [];
  const allSumData = data?.sum?.length ? data?.sum[0] : null;

  let sn = page * rowsPerPage + 1;
  // group data
  const groupVouchers = groupBy(allVouchers, 'vendorId');

  // print and export
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

  const handleExport = () => {
    let elt = document.getElementById('printTable');
    let wb = utils.book_new();
    let ws = utils.table_to_sheet(elt);
    utils.book_append_sheet(wb, ws, 'sheet 1');

    ws['!cols'] = [
      { wch: 5 },
      { wch: 25 },
      { wch: 10 },
      { wch: 12 },
      { wch: 35 },
      { wch: 19 },
      { wch: 7 },
    ];
    writeFile(wb, `PaymentReportSummary.xlsx`);
  };
  return (
    <MainCard
      title="Payment Summary"
      secondary={
        <ButtonGroup>
          <Tooltip title="Export to Excel">
            <IconButton color="primary" size="small" onClick={handleExport}>
              <IconCloudDownload size={22} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Print">
            <IconButton size="small" color="secondary" onClick={handlePrint}>
              <IconPrinter size={22} />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      }
    >
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={6} lg={3}>
            <Autocomplete
              value={vendor}
              size="small"
              fullWidth
              options={allVendors}
              getOptionLabel={(option) => option.vendorName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setVendor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Vendor" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (From)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6} lg={2.5}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (To)"
                views={['year', 'month', 'day']}
                inputFormat="DD/MM/YYYY"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    autoComplete="off"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}
      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintPaymentReportSummary
          ref={componentRef}
          tableHeads={tableHeads}
          data={groupVouchers}
          totalAmount={allSumData?._sum?.amount || 0}
          loading={isLoading}
        />
      </Box>
      {/* end popup item */}
      {/* data table */}

      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 750 }}>
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allVouchers?.length ? (
              Object.entries(groupVouchers)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <PaymentReportSummaryRow
                    key={item[0]}
                    sn={sn++}
                    data={item[1]}
                  />
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
            {allVouchers?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={6}
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {allSumData?._sum?.amount || 0}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={Object.keys(groupVouchers)?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* end data table */}
    </MainCard>
  );
};

export default PaymentReportSummary;
