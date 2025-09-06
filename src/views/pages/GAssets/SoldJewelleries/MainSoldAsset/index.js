import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { useDebounced } from 'hooks';
import { Autocomplete, TableRow } from '@mui/material';
import { goldYears } from 'assets/data';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useGetJewelleryVendorsQuery } from 'store/api/jewelleryVendor/jewelleryVendorApi';
import { useGetSoldJewelleriesQuery } from 'store/api/soldJewellery/soldJewelleryApi';
import AddMainSoldAsset from './AddMainSoldAsset';
import MainSoldAssetRow from './MainSoldAssetRow';

const MainSoldAsset = ({ category }) => {
  const [searchText, setSearchText] = useState('');
  const [jewelleryType, setJewelleryType] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [year, setYear] = useState(null);

  const [open, setOpen] = useState(false);

  // library
  const { data: jewelleryTypeData, isLoading: jewelleryTypeLoading } =
    useGetJewelleryTypesQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allJewelleryTypes = jewelleryTypeData?.jewelleryTypes || [];

  const { data: vendorData, isLoading: vendorLoading } =
    useGetJewelleryVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.jewelleryVendors || [];
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
      title: 'Sold Date',
    },
    {
      title: 'Sale/Exchange',
      align: 'center',
    },
    {
      title: 'Jewellery Type',
    },
    {
      title: 'Vendor',
    },
    {
      title: 'Invoice No',
    },
    {
      title: 'Weight (gm)',
      align: 'right',
    },
    {
      title: 'Unit Price',
      align: 'right',
    },
    {
      title: 'Total Price',
      align: 'right',
    },
    {
      title: 'Deduction',
      align: 'right',
    },
    {
      title: 'Sale/Exchange Price',
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
  query['sortBy'] = 'soldDate';
  query['sortOrder'] = 'desc';
  query['category'] = category;

  if (jewelleryType) {
    query['jewelleryTypeId'] = jewelleryType?.id;
  }

  if (vendor) {
    query['vendorId'] = vendor?.id;
  }

  if (year) {
    query['year'] = year;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetSoldJewelleriesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allSoldJewelleries = data?.jewelleries || [];
  const meta = data?.meta;
  const sum = data?.sum;

  return (
    <SubCard
      title={`SOLD ${category} JEWELLERIES`}
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
      <AddMainSoldAsset
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
          <Grid item xs={12} md={3.5}>
            <Autocomplete
              loading={jewelleryTypeLoading}
              value={jewelleryType}
              size="small"
              fullWidth
              options={allJewelleryTypes}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setJewelleryType(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Jewellery Type" />
              )}
            />
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Autocomplete
              loading={vendorLoading}
              value={vendor}
              size="small"
              fullWidth
              options={allVendors}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setVendor(newValue)}
              renderInput={(params) => <TextField {...params} label="Vendor" />}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={goldYears}
              onChange={(e, newValue) => setYear(newValue)}
              renderInput={(params) => <TextField {...params} label="Year" />}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        sx={{ minWidth: allSoldJewelleries?.length && 750 }}
        bordered
        tableHeads={tableHeads}
        data={allSoldJewelleries}
        options={(el, index) => (
          <MainSoldAssetRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
            category={category}
          />
        )}
        extra={
          allSoldJewelleries?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={6}
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
                {sum?._sum?.weight?.toFixed(3) || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              ></StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.totalPrice || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.deduction || 0}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.price || 0}
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

export default MainSoldAsset;
