import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import { IconPlus } from '@tabler/icons-react';
import CardAction from 'ui-component/cards/CardAction';
import DataTable from 'ui-component/table';
import { useDebounced } from 'hooks';
import moment from 'moment';
import { useGetBuildingInvestmentsQuery } from 'store/api/buildingInvestment/buildingInvestmentApi';
import { Autocomplete, TableRow } from '@mui/material';
import { useGetBuildingInvestmentSourcesQuery } from 'store/api/buildingInvestmentSource/buildingInvestmentSourceApi';
import AddOperationInvestment from './AddOperationInvestment';
import OperationInvestmentRow from './OperationInvestmentRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';

const OperationInvestments = () => {
  const [searchText, setSearchText] = useState('');
  const [source, setSource] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: investmentSourceData, isLoading: investmentSourceLoading } =
    useGetBuildingInvestmentSourcesQuery(
      { limit: 100, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allInvestmentSource =
    investmentSourceData?.buildingInvestmentSources || [];
  // end library

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

  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Date',
    },
    {
      title: 'Source',
    },
    {
      title: 'Details',
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
  query['sortBy'] = 'date';
  query['sortOrder'] = 'desc';

  if (source) {
    query['investmentSourceId'] = source?.id;
  }

  if (startDate) {
    query['startDate'] = moment(startDate).format('YYYY-MM-DD');
  }
  if (endDate) {
    query['endDate'] = moment(endDate).format('YYYY-MM-DD');
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetBuildingInvestmentsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allInvestments = data?.buildingInvestments || [];
  const meta = data?.meta;
  const sum = data?.sum;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Investments"
      secondary={
        <CardAction
          title="Create"
          icon={<IconPlus />}
          onClick={() => setOpen(true)}
        />
      }
    >
      {/* pop up items */}
      <AddOperationInvestment open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
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
          <Grid item xs={12} md={3.5}>
            <Autocomplete
              loading={investmentSourceLoading}
              value={source}
              size="small"
              fullWidth
              options={allInvestmentSource}
              getOptionLabel={(option) => option.label}
              onChange={(e, newValue) => setSource(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Investment Source" />
              )}
            />
          </Grid>
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

      {/* data table */}
      <DataTable
        bordered
        tableHeads={tableHeads}
        data={allInvestments}
        options={(el) => (
          <OperationInvestmentRow key={el.id} sn={sn++} data={el} />
        )}
        extra={
          allInvestments?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={5}
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                Total
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
              >
                {sum?._sum?.amount || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{ fontSize: '12px !important', fontWeight: 700 }}
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
    </MainCard>
  );
};

export default OperationInvestments;
