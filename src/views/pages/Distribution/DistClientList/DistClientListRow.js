import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import { IconEdit, IconTrashXFilled } from '@tabler/icons-react';
import { useState } from 'react';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import moment from 'moment';
import UpdateDistClient from './UpdateDistClient';
import { useDispatch } from 'react-redux';
import { useDeleteDistClientMutation } from 'store/api/distClient/distClientApi';
import { setToast } from 'store/toastSlice';
import { useGetProfileQuery } from 'store/api/profile/profileApi';
import ConfirmDialog from 'ui-component/ConfirmDialog';

const DistClientListRow = ({ sn, data }) => {
  const { data: getUserData } = useGetProfileQuery('', {
    refetchOnMountOrArgChange: true,
  });
  const userData = getUserData?.data;

  const [open, setOpen] = useState(false);
  const [dialog, setDialog] = useState(false);

  const dispatch = useDispatch();
  const [deleteDistClient] = useDeleteDistClientMutation();

  const handleDelete = async () => {
    setDialog(false);
    try {
      const res = await deleteDistClient(data?.id).unwrap();
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
    <StyledTableRow>
      <StyledTableCell align="center">{sn}</StyledTableCell>
      <StyledTableCell>{data?.customerId}</StyledTableCell>
      <StyledTableCell>{data?.customerName}</StyledTableCell>
      <StyledTableCell>{data?.customerNameBn}</StyledTableCell>
      <StyledTableCell>{data?.mobile || 'n/a'}</StyledTableCell>
      <StyledTableCell>{data?.address || 'n/a'}</StyledTableCell>
      <StyledTableCell>
        {moment(data?.createdAt).format('DD/MM/YYYY')}
      </StyledTableCell>
      <StyledTableCell align="center">
        <ButtonGroup>
          <IconButton
            color="primary"
            size="small"
            onClick={() => setOpen(true)}
          >
            <IconEdit size={18} />
          </IconButton>
          {['super_admin'].includes(userData?.role) ? (
            <IconButton
              size="small"
              color="error"
              onClick={() => setDialog(true)}
            >
              <IconTrashXFilled size={18} />
            </IconButton>
          ) : null}
        </ButtonGroup>
        <UpdateDistClient
          open={open}
          preData={data}
          handleClose={() => setOpen(false)}
        />
        <ConfirmDialog
          open={dialog}
          setOpen={setDialog}
          content="Delete Client"
          handleDelete={handleDelete}
        />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default DistClientListRow;
