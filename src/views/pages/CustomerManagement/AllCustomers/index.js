import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconCloudDownload, IconPrinter } from '@tabler/icons-react';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';
import CardAction from 'ui-component/cards/CardAction';
import { IconPlus } from '@tabler/icons-react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { useDebounced } from 'hooks';
import { useGetCustomersQuery } from 'store/api/customer/customerApi';
import CustomerRow from './CustomerRow';
import AddCustomer from './AddCustomer';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { utils, writeFile } from 'xlsx';
import PrintCustomer from './PrintCustomer';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AllCustomers = () => {
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
  query['sortBy'] = 'customerId';
  query['sortOrder'] = 'asc';
  query['isActive'] = status;
  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetCustomersQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allCustomers = data?.customers || [];
  const meta = data?.meta;

  let sn = page * rowsPerPage + 1;

  // print and export
  const { data: printData, isLoading: printLoading } = useGetCustomersQuery(
    { ...query, page: 0, limit: 5000 },
    { refetchOnMountOrArgChange: true }
  );

  const allPrintCustomers = printData?.customers || [];
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
      { wch: 18 },
      { wch: 19 },
      { wch: 11 },
      { wch: 12 },
      { wch: 9 },
      { wch: 7 },
    ];
    writeFile(wb, `AllClientList.xlsx`);
  };
  return (
    <MainCard
      title={
        <span>
          <span
            style={{
              display: 'inline-block',
              color: '#121926',
              fontSize: 20,
              fontWeight: 500,
              marginRight: 10,
            }}
          >
            All Clients
          </span>
          <ButtonGroup>
            <Tooltip title="Export to Excel" onClick={handleExport}>
              <IconButton color="primary" size="small">
                <IconCloudDownload size={20} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print All">
              <IconButton size="small" color="secondary" onClick={handlePrint}>
                <IconPrinter size={20} />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </span>
      }
      secondary={
        <CardAction
          title="Add Client"
          onClick={() => setOpen(true)}
          icon={<IconPlus />}
        />
      }
    >
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} sx={{ alignItems: 'end' }}>
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
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="select-status-id">Status</InputLabel>
              <Select
                labelId="select-status-id"
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={true}>
                  <em>Active</em>
                </MenuItem>
                <MenuItem value={false}>
                  <em>Inactive</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {/* popup items */}
      <AddCustomer open={open} handleClose={() => setOpen(false)} />

      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintCustomer
          ref={componentRef}
          allCustomers={allPrintCustomers}
          isLoading={printLoading}
        />
      </Box>
      {/* end popup items */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="center">SN</StyledTableCell>
              <StyledTableCell>Client ID</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
              <StyledTableCell>Client Name &#40;BN&#41;</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Created At</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {allCustomers?.length ? (
              allCustomers.map((item) => (
                <CustomerRow key={item.id} sn={sn++} data={item} />
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

export default AllCustomers;
