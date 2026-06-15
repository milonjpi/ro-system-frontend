import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { allMonths } from 'assets/data';
import RoDailyReportRow from './RoDailyReportRow';
import { totalSum } from 'views/utilities/NeedyFunction';
import PrintRoDailyReport from './PrintRoDailyReport';

const RoDailyReport = () => {
  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('MMMM'));

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
      title: 'SN',
      rowSpan: 2,
      align: 'center',
    },
    {
      title: 'Date',
      rowSpan: 2,
    },
    {
      title: 'Product Sales',
      align: 'center',
      colSpan: allProducts?.length || 1,
    },
    {
      title: 'Total Quantity',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Total Amount',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Paid Amount',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Due Amount',
      rowSpan: 2,
      align: 'right',
    },
  ];
  // end table

  // filtering
  const { data, isLoading } = useDailyReportQuery(
    {
      startDate: moment(`${year}-${month}`, 'YYYY-MMMM')
        .startOf('month')
        .format('YYYY-MM-DD'),
      endDate: moment(`${year}-${month}`, 'YYYY-MMMM')
        .endOf('month')
        .format('YYYY-MM-DD'),
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const invoices = data?.report || [];

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
      { wch: 9 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 11 },
      { wch: 11 },
      { wch: 11 },
      { wch: 11 },
    ];
    writeFile(wb, `Daily Report.xlsx`);
  };

  // calculation
  const totalQty = totalSum(invoices, 'totalQty');
  const totalAmount = totalSum(invoices, 'amount');
  const totalPaidAmount = totalSum(invoices, 'paidAmount');
  const totalDue = totalAmount - totalPaidAmount;

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
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => (
                  <MenuItem key={el} value={`${2020 + el}`}>
                    {2020 + el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-month-id">Month</InputLabel>
              <Select
                labelId="select-month-id"
                value={month}
                label="Year"
                onChange={(e) => setMonth(e.target.value)}
              >
                {allMonths.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintRoDailyReport
          ref={componentRef}
          tableHeads={tableHeads}
          allProducts={allProducts}
          year={year}
          month={month}
          invoices={invoices}
          totalQty={totalQty}
          totalAmount={totalAmount}
          totalPaidAmount={totalPaidAmount}
          totalDue={totalDue}
          isLoading={isLoading}
        />
      </Box>
      {/* end popup item */}

      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 650 }}>
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
            {invoices?.length ? (
              invoices?.map((el, index) => (
                <RoDailyReportRow
                  key={index}
                  sn={index + 1}
                  data={el}
                  allProducts={allProducts}
                />
              ))
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
            {invoices?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={(allProducts?.length || 1) + 2}
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
                  {totalQty}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalPaidAmount}
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{
                    fontSize: '12px !important',
                    fontWeight: 700,
                  }}
                >
                  {totalDue}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      {/* end data table */}
    </MainCard>
  );
};

export default RoDailyReport;
