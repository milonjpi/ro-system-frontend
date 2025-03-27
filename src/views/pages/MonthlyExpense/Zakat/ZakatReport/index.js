import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import {
  Autocomplete,
  InputAdornment,
  InputBase,
  LinearProgress,
  TablePagination,
  TextField,
} from '@mui/material';
import { useDebounced } from 'hooks';
import { useGetRecipientsQuery } from 'store/api/recipient/recipientApi';
import { convertToBanglaNumber, totalSum } from 'views/utilities/NeedyFunction';
import ZakatReportRow from './ZakatReportRow';
import { zakatTaken, zakatYears } from 'assets/data';

const ZakatReport = () => {
  const [searchText, setSearchText] = useState('');
  const [year, setYear] = useState(null);
  const [taken, setTaken] = useState(null);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // table
  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // end pagination
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = 2000;
  query['page'] = 0;
  query['sortBy'] = 'fullName';
  query['sortOrder'] = 'asc';

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetRecipientsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const mapData =
    data?.recipients?.map((el) => ({
      ...el,
      zakats: el.zakats?.filter(
        (bl) =>
          (year ? bl.year === year : true) &&
          (minAmount ? bl.amount > Number(minAmount) : true) &&
          (maxAmount ? bl.amount < Number(maxAmount) : true)
      ),
    })) || [];

  const filterData = mapData?.filter(
    (el) =>
      el.zakats?.length && (taken ? el.zakats?.length >= taken?.value : true)
  );

  const allRecipients = filterData.sort((a, b) => {
    const sumA = a.zakats.reduce((acc, zakat) => acc + zakat.amount, 0);
    const sumB = b.zakats.reduce((acc, zakat) => acc + zakat.amount, 0);
    return sumB - sumA;
  });

  const totalAmount = totalSum(
    allRecipients?.map((el) => ({ amount: totalSum(el.zakats, 'amount') })),
    'amount'
  );

  return (
    <MainCard title="যাকাত রিপোর্ট">
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3.5}>
            <InputBase
              disabled={taken ? true : false}
              fullWidth
              placeholder="অনুসন্ধান..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              sx={{ borderBottom: '1px solid #ccc' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <Autocomplete
              disabled={taken ? true : false}
              value={year}
              size="small"
              fullWidth
              options={zakatYears}
              getOptionLabel={(option) => convertToBanglaNumber(option)}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => <TextField {...params} label="বছর" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              disabled={taken ? true : false}
              fullWidth
              label="পরিমাণ (শুরু)"
              size="small"
              type="number"
              inputProps={{ min: 0 }}
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              disabled={taken ? true : false}
              fullWidth
              label="পরিমাণ (শেষ)"
              size="small"
              type="number"
              inputProps={{ min: 0 }}
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              value={taken}
              size="small"
              fullWidth
              options={zakatTaken}
              onChange={(e, newValue) => {
                setTaken(newValue);
                setSearchText('');
                setYear(null);
                setMinAmount('');
                setMaxAmount('');
              }}
              renderInput={(params) => (
                <TextField {...params} label="গ্রহণের হার" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              ক্রোমিক নং
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              গ্রহীতার নাম
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              ঠিকানা
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" colSpan={3}>
              যাকাত গ্রহণ
            </StyledTableCellWithBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithBorder align="center">
              বছর
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              পরিমাণ
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              মোট গ্রহণ
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRecipients?.length ? (
            allRecipients
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((el, index) => (
                <ZakatReportRow
                  key={el.id}
                  sn={page * rowsPerPage + index + 1}
                  data={el}
                />
              ))
          ) : (
            <TableRow>
              <StyledTableCellWithBorder colSpan={15} align="center">
                {isLoading ? (
                  <LinearProgress
                    color="primary"
                    sx={{ opacity: 0.5, py: 0.5 }}
                  />
                ) : (
                  'No Data'
                )}
              </StyledTableCellWithBorder>
            </TableRow>
          )}
          {allRecipients?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={5}
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                মোট
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {convertToBanglaNumber(totalAmount || 0)}
              </StyledTableCellWithBorder>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40, 100]}
        component="div"
        count={allRecipients?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default ZakatReport;
