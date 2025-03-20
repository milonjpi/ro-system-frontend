import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { useDebounced } from 'hooks';
import moment from 'moment';
import { useGetRecipientsQuery } from 'store/api/recipient/recipientApi';
import { useGetZakatsQuery } from 'store/api/zakat/zakatApi';
import { Autocomplete, TableRow, TextField } from '@mui/material';
import { zakatYears } from 'assets/data';
import ZakatPayRow from './ZakatPayRow';
import AddZakatPay from './AddZakatPay';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const ZakatPay = () => {
  const [searchText, setSearchText] = useState('');
  const [year, setYear] = useState(moment().format('YYYY'));
  const [recipient, setRecipient] = useState(null);
  const [open, setOpen] = useState(false);

  // library
  const { data: recipientData, isLoading: recipientLoading } =
    useGetRecipientsQuery(
      { limit: 1000, sortBy: 'fullName', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allRecipients = recipientData?.recipients || [];
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
      title: 'Year',
    },
    {
      title: 'Recipient',
    },
    {
      title: 'Remarks',
    },
    {
      title: 'Amount',
      align: 'right',
    },
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'label';
  query['sortOrder'] = 'asc';

  if (year) {
    query['year'] = year;
  }

  if (recipient) {
    query['recipientId'] = recipient?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetZakatsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allZakats = data?.zakats || [];
  const meta = data?.meta;
  const sum = data?.sum;
  return (
    <SubCard
      title="Vehicle List"
      secondary={
        <Button
          size="small"
          color="secondary"
          variant="contained"
          startIcon={<IconPlus size={16} />}
          sx={{ minWidth: 0, fontSize: 12 }}
          onClick={() => setOpen(true)}
        >
          Add
        </Button>
      }
    >
      {/* popup items */}
      <AddZakatPay open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}

      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={1}
          sx={{ alignItems: 'end' }}
        >
          <Grid item xs={12} md={3}>
            <InputBase
              fullWidth
              placeholder="Search..."
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
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={recipientLoading}
              value={recipient}
              size="small"
              fullWidth
              options={allRecipients}
              getOptionLabel={(option) => option.fullName}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setRecipient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Recipient" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={zakatYears}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Year" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allZakats}
        options={(el, index) => (
          <ZakatPayRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
          />
        )}
        extra={
          allZakats?.length ? (
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
                {sum?._sum?.amount || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              ></StyledTableCellWithBorder>
            </TableRow>
          ) : null
        }
        loading={isLoading}
        pagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        count={meta?.total || 0}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {/* end data table */}
    </SubCard>
  );
};

export default ZakatPay;
