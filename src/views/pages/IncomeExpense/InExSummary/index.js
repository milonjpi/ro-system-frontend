import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetIncomeExpenseCategoriesQuery } from 'store/api/incomeExpenseCategory/incomeExpenseCategoryApi';
import { useGetInExSummaryQuery } from 'store/api/incomeExpense/incomeExpenseApi';
import moment from 'moment';
import InExSummaryRow from './InExSummaryRow';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';
import PrintInExSummary from './PrintInExSummary';

const InExSummary = () => {
  const [type, setType] = useState('Income');
  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'));
  const [endDate, setEndDate] = useState(moment());

  // library
  const { data: categoryData } = useGetIncomeExpenseCategoriesQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc' },
    { refetchOnMountOrArgChange: true }
  );

  const allCategories = categoryData?.incomeExpenseCategories || [];

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
  query['type'] = type;

  if (category) {
    query['categoryId'] = category?.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  const { data, isLoading } = useGetInExSummaryQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allIncomeExpenses = data?.data || [];
  const totalAmount = totalSum(allIncomeExpenses, 'amount');

  let sn = page * rowsPerPage + 1;

  // print
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
      title="Summary"
      secondary={
        <IconButton color="primary" size="small" onClick={handlePrint}>
          <IconPrinter />
        </IconButton>
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-type-id">Select Type</InputLabel>
              <Select
                labelId="select-type-id"
                value={type}
                label="Select Type"
                onChange={(e) => setType(e.target.value)}
              >
                {['Income', 'Expense'].map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={category}
              size="small"
              fullWidth
              options={allCategories}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setCategory(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Category" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Date (Form)"
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
          <Grid item xs={12} md={3}>
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

      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintInExSummary
          ref={componentRef}
          allIncomeExpenses={allIncomeExpenses}
          totalAmount={totalAmount}
          startDate={startDate}
          endDate={endDate}
          type={type}
        />
      </Box>
      {/* end popup item */}

      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Category</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>{type} Head</StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Amount
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {allIncomeExpenses?.length ? (
              allIncomeExpenses
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <InExSummaryRow key={item.head} sn={sn++} data={item} />
                ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder colSpan={10} align="center">
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {allIncomeExpenses?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  align="right"
                  colSpan={3}
                  sx={{ fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  sx={{ fontWeight: 700 }}
                  align="right"
                >
                  {totalAmount}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={allIncomeExpenses?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default InExSummary;
