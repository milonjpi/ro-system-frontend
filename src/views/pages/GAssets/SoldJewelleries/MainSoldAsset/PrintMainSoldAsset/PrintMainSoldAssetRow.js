import { StyledTableCellWithBorder } from 'ui-component/table-component';
import { TableRow } from '@mui/material';
import moment from 'moment';

const PrintMainSoldAssetRow = ({ sn, data }) => {
  return (
    <TableRow>
      <StyledTableCellWithBorder align="center">{sn}</StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {moment(data?.soldDate).format('DD/MM/YYYY')}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="center">
        {data?.soldType}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.jewellery?.jewelleryType?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.jewellery?.vendor?.label}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder>
        {data?.jewellery?.invoiceNo}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.weight}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.unitPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.totalPrice}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.deduction + ' ( ' + data?.percent + ' % )'}
      </StyledTableCellWithBorder>
      <StyledTableCellWithBorder align="right">
        {data?.price}
      </StyledTableCellWithBorder>
    </TableRow>
  );
};

export default PrintMainSoldAssetRow;