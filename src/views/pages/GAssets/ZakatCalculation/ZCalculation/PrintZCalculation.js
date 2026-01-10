import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import DataTable from 'ui-component/table';
import ZCalculationRow from './ZCalculationRow';
import moment from 'moment';

const PrintZCalculation = forwardRef(
  (
    {
      tableHeads,
      allData,
      isLoading,
      totalWeight,
      date,
      totalPrice,
      rebateAmount,
      afterRebate,
      zakatAmount,
    },
    ref
  ) => {
    return (
      <Box component="div" ref={ref}>
        <Box sx={{ mb: 2 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 22, textAlign: 'center', fontWeight: 700 }}
          >
            Jewellery Type Wise Summary
          </Typography>
          <Typography
            sx={{ fontSize: 16, textAlign: 'center', fontWeight: 700 }}
          >
            Date: {date ? moment(date.date, "YYYY-MM-DD").format('DD/MM/YYYY') : 'n/a'}
          </Typography>
        </Box>

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
      </Box>
    );
  }
);

export default PrintZCalculation;
