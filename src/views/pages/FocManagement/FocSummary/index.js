import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MainCard from 'ui-component/cards/MainCard';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IconPrinter } from '@tabler/icons-react';
import LinearProgress from '@mui/material/LinearProgress';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { dueMonths, dueYears } from 'assets/data';
import { useGetFosSummaryQuery } from 'store/api/fosInvoice/fosInvoiceApi';
import PrintFocSummary from './PrintFocSummary';
import FocSummaryRow from './FocSummaryRow';

const FocSummary = () => {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

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
      title: 'Client ID',
    },
    {
      title: 'Client Name',
    },
    {
      title: 'Client Name (BN)',
    },
    {
      title: 'Mobile',
    },
    {
      title: 'Address',
    },
    {
      title: 'Quantity',
      align: 'right',
    },
  ];
  // end table

  // filtering
  const query = {};

  if (year) {
    query['startDate'] = `${year}-${month?.value || '01'}-01`;
    query['endDate'] = `${year}-${month?.value || '12'}-${month?.max || '31'}`;
  }
  const { data, isLoading } = useGetFosSummaryQuery(
    { ...query },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const allDonationReport = data?.data || [];

  let sn = page * rowsPerPage + 1;

  // calculation
  const totalDonation = totalSum(allDonationReport, 'quantity');

  // print and export
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

  return (
    <MainCard
      title="FOC Summary"
      secondary={
        <Tooltip title="Print">
          <IconButton size="small" color="secondary" onClick={handlePrint}>
            <IconPrinter size={22} />
          </IconButton>
        </Tooltip>
      }
    >
      {/* filter area */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={1} sx={{ alignItems: 'end' }}>
          <Grid item xs={6} lg={2.5}>
            <Autocomplete
              value={year}
              size="small"
              fullWidth
              options={dueYears}
              onChange={(e, newValue) => {
                setYear(newValue);
                !newValue && setMonth(null);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Year" />
              )}
            />
          </Grid>
          {year ? (
            <Grid item xs={6} lg={2.5}>
              <Autocomplete
                value={month}
                size="small"
                fullWidth
                options={dueMonths(year || new Date().getFullYear()) || []}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(item, value) =>
                  item.label === value.label
                }
                onChange={(e, newValue) => setMonth(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Month" />
                )}
              />
            </Grid>
          ) : null}
        </Grid>
      </Box>
      {/* end filter area */}

      {/* popup item */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintFocSummary
          ref={componentRef}
          tableHeads={tableHeads}
          data={allDonationReport}
          totalDonation={totalDonation}
          loading={isLoading}
          year={year}
          month={month?.label}
        />
      </Box>
      {/* end popup item */}

      {/* data table */}
      <Box sx={{ overflow: 'auto' }}>
        <Table sx={{ minWidth: 450 }}>
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
            {allDonationReport?.length ? (
              allDonationReport
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <FocSummaryRow key={item.id} sn={sn++} data={item} />
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
            {allDonationReport?.length ? (
              <TableRow>
                <StyledTableCellWithBorder
                  colSpan={6}
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  Total:
                </StyledTableCellWithBorder>
                <StyledTableCellWithBorder
                  align="right"
                  sx={{ fontSize: '12px !important', fontWeight: 700 }}
                >
                  {totalDonation}
                </StyledTableCellWithBorder>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={allDonationReport?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* end data table */}
    </MainCard>
  );
};

export default FocSummary;
