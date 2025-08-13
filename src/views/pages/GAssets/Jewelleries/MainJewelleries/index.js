import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { IconCloudDownload, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { useDebounced } from 'hooks';
import moment from 'moment';
import { utils, writeFile } from 'xlsx';
import { Autocomplete, IconButton, TableRow, Tooltip } from '@mui/material';
import { goldYears } from 'assets/data';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { useGetJewelleryTypesQuery } from 'store/api/jewelleryType/jewelleryTypeApi';
import { useGetCaratsQuery } from 'store/api/carat/caratApi';
import { useGetJewelleryVendorsQuery } from 'store/api/jewelleryVendor/jewelleryVendorApi';
import { useGetJewelleriesQuery } from 'store/api/jewellery/jewelleryApi';
import AddJewellery from './AddJewellery';
import JewelleriesRow from './JewelleriesRow';

const MainJewelleries = ({ category }) => {
  const [searchText, setSearchText] = useState('');
  const [jewelleryType, setJewelleryType] = useState(null);
  const [carat, setCarat] = useState(null);
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

  const { data: caratData, isLoading: caratLoading } = useGetCaratsQuery(
    { limit: 1000, sortBy: 'label', sortOrder: 'asc', category: category },
    { refetchOnMountOrArgChange: true }
  );

  const allCarats = caratData?.carats || [];

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
      title: 'DOP',
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
      title: 'KDM',
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
      title: 'Raw Price',
      align: 'right',
    },
    {
      title: 'Making Charge',
      align: 'right',
    },
    {
      title: 'VAT',
      align: 'right',
    },
    {
      title: 'Price',
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
  query['sortBy'] = 'dop';
  query['sortOrder'] = 'desc';
  query['isSold'] = false;
  query['isExchanged'] = false;
  query['category'] = category;

  if (jewelleryType) {
    query['jewelleryTypeId'] = jewelleryType?.id;
  }

  if (carat) {
    query['caratId'] = carat?.id;
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

  const { data, isLoading } = useGetJewelleriesQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allJewelleries = data?.jewelleries || [];
  const meta = data?.meta;
  const sum = data?.sum;

  // export
  //   const { data: printData, isLoading: printLoading } =
  //     useGetMonthlyExpensesQuery(
  //       { ...query, page: 0, limit: 5000 },
  //       { refetchOnMountOrArgChange: true }
  //     );

  //   const allPrintMonthlyExpenses = printData?.monthlyExpenses || [];

  //   const handleExport = () => {
  //     let elt = allPrintMonthlyExpenses.map((el, index) => ({
  //       SN: index + 1,
  //       'Expense Area': `${el?.expenseArea?.label}\n${
  //         el?.vehicle ? ', ' + el?.vehicle?.label : ''
  //       }`,
  //       Month: el?.month + ' - ' + el?.year,
  //       Date: moment(el?.date).format('DD/MM/YYYY'),
  //       'Expense Head': el?.monthlyExpenseHead?.label,
  //       'Expense Details': el?.expenseDetail?.label || 'n/a',
  //       Remarks: el?.expenseDetails || 'n/a',
  //       'Payment Source': el?.paymentSource?.label,
  //       Amount: el?.amount,
  //     }));
  //     let wb = utils.book_new();
  //     let ws = utils.json_to_sheet(elt);
  //     utils.book_append_sheet(wb, ws, 'sheet 1');

  //     ws['!cols'] = [
  //       { wch: 5 },
  //       { wch: 41 },
  //       { wch: 15 },
  //       { wch: 12 },
  //       { wch: 36 },
  //       { wch: 27 },
  //       { wch: 27 },
  //       { wch: 14 },
  //       { wch: 14 },
  //     ];
  //     writeFile(wb, `MonthlyExpenses.xlsx`);
  //   };
  return (
    <SubCard
      title={
        <span>
          {category} JEWELLERIES
          {/* <Tooltip title="Export">
            <IconButton
              color="primary"
              size="small"
              sx={{ ml: 0.5 }}
              disabled={printLoading}
              onClick={handleExport}
            >
              <IconCloudDownload size={18} />
            </IconButton>
          </Tooltip> */}
        </span>
      }
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
      <AddJewellery
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
          <Grid item xs={12} lg={2.7}>
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
          <Grid item xs={12} sm={3.5} lg={2.8}>
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
          <Grid item xs={12} sm={2.5} lg={1.8}>
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
          <Grid item xs={12} md={3.5} lg={2.9}>
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
          <Grid item xs={12} sm={2.5} lg={1.8}>
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
        sx={{ minWidth: allJewelleries?.length && 750 }}
        bordered
        tableHeads={tableHeads}
        data={allJewelleries}
        options={(el, index) => (
          <JewelleriesRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
            category={category}
          />
        )}
        extra={
          allJewelleries?.length ? (
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
                {sum?._sum?.weight?.toFixed(2) || 0}
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
                {sum?._sum?.totalPrice -
                  sum?._sum?.makingCharge -
                  sum?._sum?.vat}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.makingCharge}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.vat}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              >
                {sum?._sum?.price}
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

export default MainJewelleries;
