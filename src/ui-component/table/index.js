import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import LinearProgress from '@mui/material/LinearProgress';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';

const DataTable = ({
  sx = {},
  id,
  tableHeads,
  data,
  options,
  loading = false,
  pagination = false,
  count = 0,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <Box>
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={sx} id={id || 'dataTable'}>
          <TableHead>
            <StyledTableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCell key={index} align={el.align || 'left'}>
                  {el.title}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              data.map(options)
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  colSpan={tableHeads?.length || 10}
                  sx={{ border: 0 }}
                  align="center"
                >
                  {loading ? (
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
      {pagination ? (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </Box>
  );
};

export default DataTable;
