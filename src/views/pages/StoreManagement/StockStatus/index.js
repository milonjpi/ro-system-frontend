import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import LinearProgress from '@mui/material/LinearProgress';
import TableRow from '@mui/material/TableRow';
import MainCard from 'ui-component/cards/MainCard';
import {
  useGetEquipmentSummaryQuery,
  useGetEquipmentsQuery,
} from 'store/api/equipment/equipmentApi';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import StockStatusRow from './StockStatusRow';

const StockStatus = () => {
  const [equipment, setEquipment] = useState(null);

  // library
  const { data: equipmentData } = useGetEquipmentsQuery(
    { limit: 100, sortBy: 'label', sortOrder: 'asc', isAsset: false },
    { refetchOnMountOrArgChange: true }
  );

  const allEquipments = equipmentData?.equipments || [];
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
  const { data, isLoading } = useGetEquipmentSummaryQuery('', {
    refetchOnMountOrArgChange: true,
  });

  const allEquipmentsSummary = data?.equipments || [];
  const filterSummary = allEquipmentsSummary?.filter((el) =>
    equipment ? el.id === equipment.id : true
  );

  let sn = page * rowsPerPage + 1;
  return (
    <MainCard title="Stock Status">
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Autocomplete
              value={equipment}
              size="small"
              options={allEquipments}
              fullWidth
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setEquipment(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose a Equipment"
                  variant="outlined"
                  required
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
          <TableHead>
            <TableRow>
              <StyledTableCellWithBorder align="center">
                SN
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Item Code</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>Item Name</StyledTableCellWithBorder>
              <StyledTableCellWithBorder>
                Unit of Measurement
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Received
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Delivered
              </StyledTableCellWithBorder>
              <StyledTableCellWithBorder align="right">
                Available
              </StyledTableCellWithBorder>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterSummary?.length ? (
              filterSummary.map((item) => (
                <StockStatusRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={10}
                  sx={{ border: 0 }}
                  align="center"
                >
                  {isLoading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filterSummary?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </MainCard>
  );
};

export default StockStatus;
