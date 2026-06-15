import React from 'react';

import TableRow from '@mui/material/TableRow';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import moment from 'moment';

const RoDailyReportRow = ({ sn, data, allProducts }) => {
  const products = data?.products || [];
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.date).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      {allProducts?.map((el) => {
        const findProduct = products?.find((item) => item.productId === el.id);
        return (
          <StyledTableCellWithBorder key={el.id} align="center">
            {findProduct?.quantity || 0}
          </StyledTableCellWithBorder>
        );
      })}
      <StyledTableCellWithBorder align="right">
        {data?.totalQty}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.amount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.paidAmount}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {(data?.amount || 0) - (data?.paidAmount || 0)}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default RoDailyReportRow;
