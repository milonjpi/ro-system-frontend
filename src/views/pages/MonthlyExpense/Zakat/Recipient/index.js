import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import MainCard from 'ui-component/cards/MainCard';

import { IconPlus } from '@tabler/icons-react';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import {
  Button,
  InputAdornment,
  InputBase,
  LinearProgress,
  TablePagination,
} from '@mui/material';
import { useDebounced } from 'hooks';
import { useGetRecipientsQuery } from 'store/api/recipient/recipientApi';
import RecipientRow from './RecipientRow';
import AddRecipient from './AddRecipient';

const Recipient = () => {
  const [searchText, setSearchText] = useState('');

  const [open, setOpen] = useState(false);

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

  query['limit'] = rowsPerPage;
  query['page'] = page;
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

  const allRecipients = data?.recipients || [];
  const meta = data?.meta;

  return (
    <MainCard
      title="Recipient List"
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
      {/* pop up items */}
      <AddRecipient open={open} handleClose={() => setOpen(false)} />
      {/* pop up items */}
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
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              SN
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              Full Name
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              Mobile
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              Address
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" colSpan={2}>
              Zakat History
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              Action
            </StyledTableCellWithBorder>
          </TableRow>
          <TableRow>
            <StyledTableCellWithBorder align="center">
              Year
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              Amount
            </StyledTableCellWithBorder>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRecipients?.length ? (
            allRecipients?.map((el, index) => (
              <RecipientRow
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
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40, 100]}
        component="div"
        count={meta?.total || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default Recipient;
