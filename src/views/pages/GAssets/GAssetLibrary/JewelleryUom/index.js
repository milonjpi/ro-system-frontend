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
import { useGetJewelleryUomQuery } from 'store/api/jewelleryUom/jewelleryUomApi';
import AddJewelleryUom from './AddJewelleryUom';
import JewelleryUomRow from './JewelleryUomRow';

const JewelleryUom = () => {
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);

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
      title: 'Unit of Measurement',
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

  // search term
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchText,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query['searchTerm'] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetJewelleryUomQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allUom = data?.jewelleryUom || [];
  const meta = data?.meta;
  return (
    <SubCard
      title="Unit of Measurement"
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
      <AddJewelleryUom open={open} handleClose={() => setOpen(false)} />
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
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      <DataTable
        tableHeads={tableHeads}
        data={allUom}
        options={(el, index) => (
          <JewelleryUomRow
            key={el.id}
            sn={page * rowsPerPage + index + 1}
            data={el}
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

export default JewelleryUom;
