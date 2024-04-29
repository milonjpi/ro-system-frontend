import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconCloudDownload, IconPrinter } from '@tabler/icons-react';
import LinearProgress from '@mui/material/LinearProgress';
import { useDailyReportQuery } from 'store/api/report/reportSlice';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { utils, writeFile } from 'xlsx';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import moment from 'moment';
import { useGetProductsQuery } from 'store/api/product/productApi';
import PrintDailyReport from './PrintDailyReport';
import DailyReportRow from './DailyReportRow';

const DailyReport = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  // library
  const { data: productData } = useGetProductsQuery(
    { limit: 10, isActive: true, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allProducts = productData?.products || [];
  // end library

  // table
  const tableHeads = [
    {
      title: 'Product Sales',
      align: 'center',
      colSpan: allProducts?.length || 1,
    },
    {
      title: 'Cash Invest',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Withdraws',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Collections',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Expenses',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Advance',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Due',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Balance',
      rowSpan: 2,
      align: 'center',
    },
  ];
  // end table

  // filtering
  const { data, isLoading } = useDailyReportQuery(
    {
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const expenses = data?.report?.expenses;
  const invoicedProducts = data?.report?.invoicedProducts || [];
  const invoices = data?.report?.invoices;
  const vouchers = data?.report?.vouchers || [];
  const investments = data?.report?.investments;
  const withdraws = data?.report?.withdraws;

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
      { wch: 12 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 8 },
      { wch: 8 },
      { wch: 7 },
      { wch: 7 },
    ];
    writeFile(wb, `SummaryReport.xlsx`);
  };

  return (
    <MainCard
      title="Daily Report"
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
          <Grid item xs={12} sm={6} md={2.5}>
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
          <Grid item xs={12} sm={6} md={2.5}>
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
        <PrintDailyReport
          ref={componentRef}
          tableHeads={tableHeads}
          allProducts={allProducts}
          startDate={startDate}
          endDate={endDate}
          expenses={expenses}
          invoicedProducts={invoicedProducts}
          invoices={invoices}
          vouchers={vouchers}
          investments={investments}
          withdraws={withdraws}
          isLoading={isLoading}
        />
      </Box>
      {/* end popup item */}

      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                  colSpan={el?.colSpan || 1}
                  rowSpan={el?.rowSpan || 1}
                  sx={{ py: '0px !important' }}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
            <TableRow>
              {allProducts?.map((el) => (
                <StyledTableCellWithBorder
                  key={el.id}
                  align="center"
                  sx={{ py: '0px !important', fontSize: '9px !important' }}
                >
                  {el.label}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses ||
            invoicedProducts?.length ||
            invoices ||
            vouchers?.length ||
            investments ||
            withdraws ? (
              <DailyReportRow
                expenses={expenses}
                invoicedProducts={invoicedProducts}
                invoices={invoices}
                vouchers={vouchers}
                investments={investments}
                withdraws={withdraws}
                allProducts={allProducts}
              />
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={12}
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
            {expenses ||
            invoicedProducts?.length ||
            invoices ||
            vouchers?.length ||
            investments ||
            withdraws ? (
              <>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={allProducts?.length || 1}
                    align="center"
                    sx={{
                      fontSize: '12px !important',
                      py: '2px !important',
                      fontWeight: 700,
                    }}
                  >
                    Total Quantity: {invoices?._sum?.totalQty || 0}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={allProducts?.length || 1}
                    align="center"
                    sx={{
                      fontSize: '12px !important',
                      py: '2px !important',
                      fontWeight: 700,
                    }}
                  >
                    Total Amount: {invoices?._sum?.amount || 0} ৳
                  </StyledTableCellWithBorder>
                </TableRow>
              </>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      {/* end data table */}
    </MainCard>
  );
};

export default DailyReport;
