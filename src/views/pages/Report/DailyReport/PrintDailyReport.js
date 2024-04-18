import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import DailyReportRow from './DailyReportRow';

const PrintDailyReport = forwardRef(
  (
    {
      tableHeads,
      allProducts,
      filterReports,
      year,
      totalPrice,
      discount,
      totalAmount,
      paidAmount,
      dueAmount,
      totalQty,
    },
    ref
  ) => {
    let sn = 1;
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            TBZ RO SYSTEM
          </Typography>
          <Typography component="p" sx={{ fontSize: 14, textAlign: 'center' }}>
            Rajpat, Fakirhat, Bagerhat.
          </Typography>
          <Typography
            component="h6"
            sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          >
            Summary Report {year}
          </Typography>
        </Box>

        <Table id="printTable">
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                  colSpan={el?.colSpan || 1}
                  rowSpan={el?.rowSpan || 1}
                  sx={{ py: '0px !important' }}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
            <TableRow>
              {allProducts?.map((el) => (
                <StyledTableCellWithBorder
                  key={el.id}
                  align="center"
                  sx={{ py: '0px !important', fontSize: '9px !important' }}
                >
                  {el.label}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterReports?.length ? (
              filterReports.map((item, index) => (
                <DailyReportRow
                  key={index}
                  sn={sn++}
                  data={item}
                  allProducts={allProducts}
                />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={12}
                  sx={{ border: 0 }}
                  align="center"
                >
                  No Data
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {filterReports?.length ? (
              <>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={2}
                    rowSpan={2}
                    align="right"
                    sx={{ fontSize: '12px !important', fontWeight: 700 }}
                  >
                    Total:
                  </StyledTableCellWithBorder>
                  {allProducts?.map((el) => {
                    const filterProducts = filterReports[0]?.products?.filter(
                      (it) => it.productId === el.id && it.year === year
                    );
                    return (
                      <StyledTableCellWithBorder
                        key={el.id}
                        align="center"
                        sx={{
                          fontSize: '12px !important',
                          py: '2px !important',
                          fontWeight: 700,
                        }}
                      >
                        {totalSum(filterProducts || [], 'quantity')}
                      </StyledTableCellWithBorder>
                    );
                  })}

                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalPrice}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {discount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalAmount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {paidAmount}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    rowSpan={2}
                    sx={{
                      fontSize: '12px !important',
                      py: '0px !important',
                      fontWeight: 700,
                    }}
                  >
                    {dueAmount > 0 ? dueAmount : 0}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={allProducts?.length || 1}
                    align="center"
                    sx={{
                      fontSize: '12px !important',
                      py: '2px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalQty}
                  </StyledTableCellWithBorder>
                </TableRow>
              </>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintDailyReport;
