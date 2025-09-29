import { IconTrashXFilled } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeleteElectricityBillMutation } from 'store/api/electricityBill/electricityBillApi';
import { setToast } from 'store/toastSlice';
import { StyledTableCellWithBorder } from 'ui-component/table-component';
import UpdateElectricBill from './UpdateElectricBill';
import ConfirmDialog from 'ui-component/ConfirmDialog';
import moment from 'moment';
import { Button, TableRow } from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';

const ElectricBillRow = ({ sn, data }) => {
  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const billDetails = data?.data || [];
  const rowSpan = billDetails.length || 1;
  const totalAmount = totalSum(billDetails, 'amount');

  const dispatch = useDispatch();
  const [deleteElectricityBill] = useDeleteElectricityBillMutation();

  const handleDelete = async (id) => {
    setDialog(false);
    try {
      const res = await deleteElectricityBill(id).unwrap();
      if (res.success) {
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
        })
      );
    }
  };

  return (
    <>
      {/* Main Row */}
      <TableRow>
        <StyledTableCellWithBorder align="center" rowSpan={rowSpan}>
          {sn}
        </StyledTableCellWithBorder>
        <StyledTableCellWithBorder rowSpan={rowSpan}>
          {data?.month + '-' + data?.year}
        </StyledTableCellWithBorder>
        {/* First row includes totals and actions */}
        {billDetails.length > 0 && (
          <>
            <StyledTableCellWithBorder>
              {billDetails[0].date
                ? moment(billDetails[0].date).format('DD/MM/YYYY')
                : 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {billDetails[0]?.paidBy || 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder>
              {billDetails[0]?.meter?.smsAccount +
                ', ' +
                billDetails[0]?.meter?.label}
              <br />
              {billDetails[0]?.meter?.location || 'N/A'}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0]?.previousReading}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0]?.meterReading}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0].unit}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right">
              {billDetails[0].amount}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="right" rowSpan={rowSpan}>
              {totalAmount}
            </StyledTableCellWithBorder>
            <StyledTableCellWithBorder align="center" sx={{ minWidth: 85 }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ minWidth: 0, mr: 0.5 }}
                onClick={() => setOpen(true)}
              >
                <IconEdit size={14} />
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                sx={{ minWidth: 0 }}
                onClick={() => setDialog(true)}
              >
                <IconTrashXFilled size={14} />
              </Button>

              <UpdateElectricBill
                open={open}
                preData={billDetails[0]}
                handleClose={() => setOpen(false)}
              />
              <ConfirmDialog
                open={dialog}
                setOpen={setDialog}
                content="Delete Electric Bill"
                handleDelete={() => handleDelete(billDetails[0]?.id)}
              />
            </StyledTableCellWithBorder>
          </>
        )}

        {/* Totals and Actions */}
      </TableRow>

      {/* Remaining Income Details Rows */}
      {billDetails.slice(1).map((el, index) => (
        <TableRow key={index}>
          <StyledTableCellWithBorder>
            {el.date ? moment(el.date).format('DD/MM/YYYY') : 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.paidBy || 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder>
            {el?.meter?.smsAccount + ', ' + el?.meter?.label}
            <br />
            {el?.meter?.location || 'N/A'}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el?.previousReading}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el?.meterReading}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.unit}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="right">
            {el.amount}
          </StyledTableCellWithBorder>
          <StyledTableCellWithBorder align="center" sx={{ minWidth: 85 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ minWidth: 0, mr: 0.5 }}
              onClick={() => setOpen(true)}
            >
              <IconEdit size={14} />
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ minWidth: 0 }}
              onClick={() => setDialog(true)}
            >
              <IconTrashXFilled size={14} />
            </Button>

            <UpdateElectricBill
              open={open}
              preData={el}
              handleClose={() => setOpen(false)}
            />
            <ConfirmDialog
              open={dialog}
              setOpen={setDialog}
              content="Delete Electric Bill"
              handleDelete={() => handleDelete(el?.id)}
            />
          </StyledTableCellWithBorder>
        </TableRow>
      ))}
    </>
  );
};

export default ElectricBillRow;
