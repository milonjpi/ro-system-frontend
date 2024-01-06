import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import {
  StyledTableCellWithBorder,
  StyledTableCellWithNoBorder,
} from 'ui-component/table-component';
import DueReportRow from './DueReportRow';

const PrintDueReport = forwardRef(
  ({ tableHeads, data, totalDue, loading }, ref) => {
    let sn = 1;
    return (
      <Box component="div" ref={ref} sx={{ p: 3 }}>
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
            Due Report
          </Typography>
        </Box>

        <Table id="printTable">
          <TableHead>
            <TableRow>
              {tableHeads?.map((el, index) => (
                <StyledTableCellWithBorder
                  key={index}
                  align={el.align || 'left'}
                >
                  {el.title}
                </StyledTableCellWithBorder>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              data.map((item) => (
                <DueReportRow key={item.id} sn={sn++} data={item} />
              ))
            ) : (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={10}
                  sx={{ border: 0 }}
                  align="center"
                >
                  {loading ? (
                    <LinearProgress sx={{ opacity: 0.5, py: 0.5 }} />
                  ) : (
                    'No Data'
                  )}
                </StyledTableCellWithBorder>
              </TableRow>
            )}
            {data?.length ? (
              <TableRow>
                <StyledTableCellWithNoBorder
                  colSpan={8}
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithNoBorder>
                <StyledTableCellWithNoBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {totalDue}
                </StyledTableCellWithNoBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
    );
  }
);

export default PrintDueReport;
