import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import DataTable from 'ui-component/table';
import { useGetDistinctDatesQuery } from 'store/api/jewelleryRate/jewelleryRateApi';
import {
  Autocomplete,
  IconButton,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import moment from 'moment';
import { useGetZakatCalculationQuery } from 'store/api/jewelleryReport/jewelleryReportApi';
import ZCalculationRow from './ZCalculationRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { totalSum } from 'views/utilities/NeedyFunction';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IconPrinter } from '@tabler/icons-react';
import PrintZCalculation from './PrintZCalculation';

const ZCalculation = () => {
  const [date, setDate] = useState(null);

  // library

  const { data: dateData, isLoading: dateLoading } = useGetDistinctDatesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const allDates = dateData?.data || [];
  // end library

  // table
  const tableHeads = [
    {
      title: 'SN',
      align: 'center',
    },
    {
      title: 'Category',
    },
    {
      title: 'KDM',
    },
    {
      title: 'Weight (gm)',
      align: 'right',
    },
    {
      title: 'Price/gm (TK)',
      align: 'right',
    },
    {
      title: 'Price (TK)',
      align: 'right',
    },
    {
      title: 'Total',
      align: 'right',
    },
  ];
  // end table

  // filtering and pagination
  const query = {};
  if (date) {
    query['date'] = date?.date;
  }

  const { data, isLoading } = useGetZakatCalculationQuery(
    { ...query },
    { refetchOnMountOrArgChange: true }
  );

  const allData = data?.data || [];

  // calculation
  const mappedAllData = allData?.map((el) => ({
    weight: totalSum(el.carats || [], 'weight'),
    price: totalSum(el.carats || [], 'price'),
  }));
  const totalWeight = totalSum(mappedAllData, 'weight');
  const totalPrice = Math.round(totalSum(mappedAllData, 'price'));

  const rebateAmount = Math.round(totalPrice * 0.18);
  const afterRebate = totalPrice - rebateAmount;
  const zakatAmount = Math.ceil(afterRebate * 0.025);

  // handle Print
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
    <SubCard
      title="Zakat Calculation"
      secondary={
        <Tooltip title="Print">
          <span>
            <IconButton
              size="small"
              color="primary"
              onClick={handlePrint}
              disabled={date ? false : true}
            >
              <IconPrinter size={18} />
            </IconButton>
          </span>
        </Tooltip>
      }
    >
      {/* popup items */}
      <Box component="div" sx={{ overflow: 'hidden', height: 0 }}>
        <PrintZCalculation
          ref={componentRef}
          tableHeads={tableHeads}
          allData={allData}
          isLoading={isLoading}
          totalWeight={totalWeight}
          date={date}
          totalPrice={totalPrice}
          rebateAmount={rebateAmount}
          afterRebate={afterRebate}
          zakatAmount={zakatAmount}
        />
      </Box>
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
            <Autocomplete
              loading={dateLoading}
              value={date}
              size="small"
              fullWidth
              options={allDates}
              getOptionLabel={(option) =>
                moment(option.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
              }
              isOptionEqualToValue={(item, value) => item.id === value.id}
              onChange={(e, newValue) => setDate(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Date" />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      {/* end filter area */}

      {/* data table */}
      {date ? (
        <DataTable
          bordered
          tableHeads={tableHeads}
          data={allData}
          options={(el, index) => (
            <ZCalculationRow key={index} sn={index + 1} data={el} />
          )}
          loading={isLoading}
          extra={
            allData?.length ? (
              <>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={3}
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    TOTAL
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalWeight?.toFixed(3)}
                  </StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  ></StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  ></StyledTableCellWithBorder>
                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    {totalPrice}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={6}
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    REBATE &#40;18%&#41;
                  </StyledTableCellWithBorder>

                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    {rebateAmount}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={6}
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    AFTER REBATE
                  </StyledTableCellWithBorder>

                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    {afterRebate}
                  </StyledTableCellWithBorder>
                </TableRow>
                <TableRow>
                  <StyledTableCellWithBorder
                    colSpan={6}
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    ZAKAT &#40;2.5%&#41;
                  </StyledTableCellWithBorder>

                  <StyledTableCellWithBorder
                    align="right"
                    sx={{
                      fontSize: '12px !important',
                      fontWeight: 700,
                    }}
                  >
                    {zakatAmount}
                  </StyledTableCellWithBorder>
                </TableRow>
              </>
            ) : null
          }
        />
      ) : (
        <Typography sx={{ textAlign: 'center', color: 'red' }}>
          Please Select the date first
        </Typography>
      )}

      {/* end data table */}
    </SubCard>
  );
};

export default ZCalculation;
