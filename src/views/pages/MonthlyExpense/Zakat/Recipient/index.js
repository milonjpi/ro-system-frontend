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
import { convertToBanglaNumber } from 'views/utilities/NeedyFunction';

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

  const allRecipients = data?.recipients || [];
  const sum = data?.sum;

  return (
    <MainCard
      title="গ্রহীতার তালিকা"
      secondary={
        <Button
          size="small"
          color="secondary"
          variant="contained"
          startIcon={<IconPlus size={16} />}
          sx={{ minWidth: 0, fontSize: 12 }}
          onClick={() => setOpen(true)}
        >
          যোগ করুন
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
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              ক্রোমিক
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              গ্রহীতার নাম
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              মোবাইল নং
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder rowSpan={2}>
              ঠিকানা
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" colSpan={3}>
              যাকাত গ্রহণ
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" rowSpan={2}>
              অ্যাকশন
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
          {allRecipients?.length ? (
            <TableRow>
              <StyledTableCellWithBorder
                colSpan={6}
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
                {convertToBanglaNumber(sum || 0)}
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder
                align="right"
                sx={{
                  fontSize: '12px !important',
                  fontWeight: 700,
                }}
              ></StyledTableCellWithBorder>
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

export default Recipient;
