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
import { useGetCaratsQuery } from 'store/api/carat/caratApi';
import {
  useGetDistinctDatesQuery,
  useGetJewelleryRatesQuery,
} from 'store/api/jewelleryRate/jewelleryRateApi';
import { Autocomplete, TextField } from '@mui/material';
import moment from 'moment';
import AddRate from './AddRate';
import RateRow from './RateRow';

const MainRate = ({ category }) => {
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(null);
  const [carat, setCarat] = useState(null);
  const [open, setOpen] = useState(false);

  // library
  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc', category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

  const { data: dateData, isLoading: dateLoading } = useGetDistinctDatesQuery(
    { category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allDates = dateData?.data || [];
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
      title: 'Date',
    },
    {
      title: 'KDM',
    },
    {
      title: 'Price/gm (TK)',
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
  query['category'] = category;

  if (carat) {
    query['caratId'] = carat?.id;
  }

  if (date) {
    query['date'] = date?.date;
  }

  const { data, isLoading } = useGetJewelleryRatesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allRates = data?.jewelleryRates || [];
  const meta = data?.meta;
  return (
    <SubCard
      title={`${category} RATE`}
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
      <AddRate
        open={open}
        handleClose={() => setOpen(false)}
        category={category}
      />
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
              loading={caratLoading}
              value={carat}
              size="small"
              fullWidth
              options={allCarats}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setCarat(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select KDM" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              loading={dateLoading}
              value={date}
              size="small"
              fullWidth
              options={allDates}
              getOptionLabel={(option) =>
                moment(option.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Date" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        tableHeads={tableHeads}
        data={allRates}
        options={(el, index) => (
          <RateRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
            category={category}
          />
        )}
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

export default MainRate;
