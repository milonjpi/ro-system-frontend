import { useState } from 'react';
import Box from '@mui/material/Box';
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
import AddMeterInfo from './AddMeterInfo';
import MeterInfoRow from './MeterInfoRow';
import { useGetMetersQuery } from 'store/api/meter/meterApi';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const MeterInfo = () => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState(true);

  const [open, setOpen] = useState(false);

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
  query['isActive'] = status;

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetMetersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allMeters = data?.meters || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard
      title="Meter Info"
      secondary={
        <CardAction
          title="Add Meter"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
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
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                value={status}
                label="Age"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddMeterInfo open={open} handleClose={() => setOpen(false)} />
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 550 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Meter No</StyledTableCell>
              <StyledTableCell>SMS Account</StyledTableCell>
              <StyledTableCell>Owner</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Remarks</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allMeters?.length ? (
              allMeters.map((item) => (
                <MeterInfoRow key={item.id} sn={sn++} data={item} />
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
        rowsPerPageOptions={[10, 20, 40]}
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

export default MeterInfo;
