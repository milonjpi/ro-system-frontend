import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import { useSummaryReportQuery } from 'store/api/report/reportSlice';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { utils, writeFile } from 'xlsx';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ReportSummaryRow from './ReportSummaryRow';
import moment from 'moment';
import { useGetProductsQuery } from 'store/api/product/productApi';
import PrintReportSummary from './PrintReportSummary';

const ReportSummary = () => {
  const [customer, setCustomer] = useState(null);
  const [year, setYear] = useState(moment().format('YYYY'));

  // library
  const { data: customerData } = useGetCustomersQuery(
    { limit: 1000, sortBy: 'customerName', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = customerData?.customers || [];

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
      align: 'center',
      rowSpan: 2,
    },
    {
      title: 'Month',
      rowSpan: 2,
    },
    {
      title: 'Quantity',
      align: 'center',
      colSpan: allProducts?.length || 1,
    },
    {
      title: 'Total Price',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Discount',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Amount',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Paid',
      rowSpan: 2,
      align: 'right',
    },
    {
      title: 'Due',
      rowSpan: 2,
      align: 'right',
    },
  ];
  // end table

  // filtering
  const query = {};

  if (customer) {
    query['customerId'] = customer.id;
  }
  const { data, isLoading } = useSummaryReportQuery(
    { ...query },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const getAllReports = data?.report || [];

  const filterReports = getAllReports?.filter((el) => el.year === year);

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
      { wch: 8 },
      { wch: 16 },
      { wch: 13 },
      { wch: 13 },
      { wch: 15 },
      { wch: 9 },
      { wch: 8 },
      { wch: 7 },
      { wch: 6 },
      { wch: 6 },
    ];
    writeFile(wb, `SummaryReport.xlsx`);
  };

  let sn = 1;
  // calculation
  const totalPrice = totalSum(filterReports, 'totalPrice');
  const discount = totalSum(filterReports, 'discount');
  const totalAmount = totalSum(filterReports, 'amount');
  const paidAmount = totalSum(filterReports, 'paidAmount');
  const dueAmount = totalAmount - paidAmount;

  const totalQty = totalSum(
    filterReports[0]?.products?.filter((el) => el.year === year) || [],
    'quantity'
  );

  return (
    <MainCard
      title="Summary"
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
              value={customer}
              size="small"
              fullWidth
              options={allCustomers}
              getOptionLabel={(option) => option.customerName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setCustomer(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Customer" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-year-id">Year</InputLabel>
              <Select
                labelId="select-year-id"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((el) => (
                  <MenuItem key={el} value={`${2023 + el}`}>
                    {2023 + el}
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
        <PrintReportSummary
          ref={componentRef}
          tableHeads={tableHeads}
          allProducts={allProducts}
          filterReports={filterReports}
          year={year}
          totalPrice={totalPrice}
          discount={discount}
          totalAmount={totalAmount}
          paidAmount={paidAmount}
          dueAmount={dueAmount}
          totalQty={totalQty}
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
            {filterReports?.length ? (
              filterReports.map((item, index) => (
                <ReportSummaryRow
                  key={index}
                  sn={sn++}
                  data={item}
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
            {filterReports?.length ? (
              <>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={2}
                    rowSpan={2}
                    align="right"
                    sx={{ fontSize: '12px !important', fontWeight: 700 }}
                  >
                    Total:
                  </StyledTableCellWithBorder>
                  {allProducts?.map((el) => {
                    const filterProducts = filterReports[0]?.products?.filter(
                      (it) => it.productId === el.id && it.year === year
                    );
                    return (
                      <StyledTableCellWithBorder
                        key={el.id}
                        align="center"
                        sx={{
                          fontSize: '12px !important',
                          py: '2px !important',
                          fontWeight: 700,
                        }}
                      >
                        {totalSum(filterProducts || [], 'quantity')}
                      </StyledTableCellWithBorder>
                    );
                  })}

                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalPrice}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {discount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalAmount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {paidAmount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {dueAmount > 0 ? dueAmount : 0}
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
                    {totalQty}
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

export default ReportSummary;
