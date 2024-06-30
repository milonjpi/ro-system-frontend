import { useState } from 'react';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import AddDistClient from './AddDistClient';
import DistClientListRow from './DistClientListRow';
import { useGetDistClientsQuery } from 'store/api/distClient/distClientApi';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
// import distClient from 'assets/distClient';

const DistClientList = () => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [searchText, setSearchText] = useState('');
  const [distributor, setDistributor] = useState(
    ['super_admin'].includes(userData?.role) ? null : userData?.distributor
  );

  const [open, setOpen] = useState(false);

  // library
  const { data: customerData, isLoading: customerLoading } =
    useGetCustomersQuery(
      {
        isDistributor: true,
        limit: 1000,
        sortBy: 'customerName',
        sortOrder: 'asc',
      },
      { refetchOnMountOrArgChange: true }
    );

  const allDistributor = customerData?.customers || [];
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

  query['limit'] = rowsPerPage;
  query['page'] = page;
  query['sortBy'] = 'customerId';
  query['sortOrder'] = 'asc';
  query['isActive'] = true;
  query['distributorId'] = '123';

  if (['super_admin'].includes(userData?.role)) {
    query['distributorId'] = undefined;
  }

  if (distributor) {
    query['distributorId'] = distributor?.id;
  }

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetDistClientsQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = data?.distClients || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  // const [createAllDistClient] = useCreateAllDistClientMutation();

  // const onClientSubmit = async () => {
  //   const newData = distClient?.map((el) => ({
  //     customerId: el.customerId,
  //     customerName: el.customerName,
  //     customerNameBn: el.customerNameBn,
  //     mobile: el.mobile?.trim() || '',
  //     address: el.address?.trim() || '',
  //     distributorId: '2ef73061-1e0e-4be3-b6cc-fb437427d6ce',
  //   }));
  //   try {
  //     const res = await createAllDistClient({ data: newData }).unwrap();
  //     if (res.success) {
  //       console.log('success');
  //     }
  //   } catch (err) {
  //     console.log('error');
  //   }
  // };
  return (
    <MainCard
      title="All Clients"
      secondary={
        userData?.distributor ? (
          <CardAction
            title="Add Client"
            onClick={() => setOpen(true)}
            icon={<IconPlus />}
          />
        ) : null
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
          <Grid item xs={12} md={4}>
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
          <Grid
            item
            xs={12}
            md={3}
            hidden={['super_admin'].includes(userData?.role) ? false : true}
          >
            <Autocomplete
              value={distributor}
              loading={customerLoading}
              size="small"
              fullWidth
              options={allDistributor}
              getOptionLabel={(option) => option.customerName}
              onChange={(e, newValue) => setDistributor(newValue)}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Select Distributor" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddDistClient open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Client ID</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell>Client Name &#40;BN&#41;</StyledTableCell>
              <StyledTableCell>Mobile</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allCustomers?.length ? (
              allCustomers.map((item) => (
                <DistClientListRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={10} sx={{ border: 0 }} align="center">
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default DistClientList;
