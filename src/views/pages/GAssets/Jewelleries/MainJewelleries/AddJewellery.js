import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { setToast } from 'store/toastSlice';
import moment from 'moment';
import {
  Autocomplete,
  Table,
  TableBody,
  TableHead,
  Tooltip,
} from '@mui/material';
import { totalSum } from 'views/utilities/NeedyFunction';
import { StyledTableCell, StyledTableRow } from 'ui-component/table-component';
import { IconSquareRoundedPlusFilled } from '@tabler/icons-react';
import JewelleryFields from './JewelleryFields';
import { useGetJewelleryVendorsQuery } from 'store/api/jewelleryVendor/jewelleryVendorApi';
import { useCreateJewelleryMutation } from 'store/api/jewellery/jewelleryApi';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 400, sm: 550, md: 850, lg: 950 },
  maxHeight: '100vh',
  overflow: 'auto',
  boxShadow: 24,
  p: 2,
};

const defaultValue = {
  jewelleryType: null,
  carat: null,
  weight: 0,
  unitPrice: 0,
  makingCharge: 0,
  vat: 0,
  price: 0,
  remarks: '',
};

const AddJewellery = ({ open, handleClose, category }) => {
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment());
  const [vendor, setVendor] = useState(null);

  // library
  const { data: vendorData, isLoading: vendorLoading } =
    useGetJewelleryVendorsQuery(
      { limit: 1000, sortBy: 'label', sortOrder: 'asc' },
      { refetchOnMountOrArgChange: true }
    );

  const allVendors = vendorData?.jewelleryVendors || [];
  // end library

  // hook form
  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: {
      jewelleries: [defaultValue],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'jewelleries',
  });

  const handleAppend = () => {
    append(defaultValue);
  };
  const handleRemove = (index) => remove(index);
  // end hook form

  // calculation

  const watchValue = useWatch({ control, name: 'jewelleries' });

  const totalWeight = totalSum(watchValue || [], 'weight');
  const makingCharge = totalSum(watchValue || [], 'makingCharge');
  const vat = totalSum(watchValue || [], 'vat');
  const totalAmount = totalSum(watchValue || [], 'price');

  // end calculation

  // table
  const tableHeads = [
    {
      title: 'Jewellery Type',
    },
    {
      title: 'KDM',
    },

    {
      title: 'Remarks',
    },
    {
      title: 'Weight (gm)',
      align: 'right',
    },
    {
      title: 'Unit Price',
      align: 'right',
    },
    {
      title: 'Making Ch.',
      align: 'right',
    },
    {
      title: 'VAT',
      align: 'right',
    },
    {
      title: 'Price',
      align: 'right',
    },
    {
      title: 'Action',
      align: 'center',
    },
  ];
  // end table

  const dispatch = useDispatch();

  const [createJewellery] = useCreateJewelleryMutation();

  const onSubmit = async (data) => {
    const newData = data?.jewelleries?.map((el) => ({
      category: category,
      jewelleryTypeId: el.jewelleryType?.id,
      caratId: el.carat?.id,
      vendorId: vendor?.id,
      invoiceNo: data?.invoiceNo,
      dop: date,
      year: moment(date).format('YYYY'),
      month: moment(date).format('MMMM'),
      weight: el.weight,
      unitPrice: el.unitPrice,
      makingCharge: el.makingCharge,
      vat: el.vat,
      totalPrice: Math.round(
        el.weight * el.unitPrice + el.makingCharge + el.vat
      ),
      price: el.price,
      remarks: el.remarks || '',
    }));

    try {
      setLoading(true);
      const res = await createJewellery({ data: newData }).unwrap();
      if (res.success) {
        handleClose();
        setLoading(false);
        reset({ jewelleries: [defaultValue] });
        setDate(moment());
        setVendor(null);
        dispatch(
          setToast({
            open: true,
            variant: 'success',
            message: res?.message,
          })
        );
      }
    } catch (err) {
      setLoading(false);
      dispatch(
        setToast({
          open: true,
          variant: 'error',
          message: err?.data?.message || 'Something Went Wrong',
          errorMessages: err?.data?.errorMessages,
        })
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 16, color: '#878781' }}>
            ADD {category} JEWELLERY
          </Typography>
          <IconButton color="error" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2, mt: 1 }} />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3.5}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="Date of Purchase"
                  views={['year', 'month', 'day']}
                  inputFormat="DD/MM/YYYY"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      autoComplete="off"
                      required
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={5}>
              <Autocomplete
                loading={vendorLoading}
                value={vendor}
                size="small"
                fullWidth
                options={allVendors}
                getOptionLabel={(option) => option.label}
                onChange={(e, newValue) => setVendor(newValue)}
                isOptionEqualToValue={(item, value) => item.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} label="Select Vendor" required />
                )}
              />
            </Grid>
            <Grid item xs={12} md={3.5}>
              <TextField
                fullWidth
                required
                label="Invoice No"
                size="small"
                {...register('invoiceNo', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ overflow: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
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
                    {fields.map((el, index) => (
                      <JewelleryFields
                        key={el.id}
                        field={el}
                        index={index}
                        control={control}
                        handleRemove={handleRemove}
                        register={register}
                        setValue={setValue}
                        category={category}
                      />
                    ))}
                    <StyledTableRow>
                      <StyledTableCell sx={{ verticalAlign: 'top' }}>
                        <Tooltip title="Add Row">
                          <IconButton color="primary" onClick={handleAppend}>
                            <IconSquareRoundedPlusFilled size={20} />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>

                      {watchValue?.length ? (
                        <>
                          <StyledTableCell colSpan={2} align="right">
                            <Typography sx={{ fontSize: 14, fontWeight: 700 }}>
                              Total:
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.2 }}
                            >
                              {totalWeight?.toFixed(3)}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.2 }}
                            ></Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.2 }}
                            >
                              {makingCharge}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.2 }}
                            >
                              {vat}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 700, pr: 1.2 }}
                            >
                              {totalAmount}
                            </Typography>
                          </StyledTableCell>
                        </>
                      ) : null}
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                size="small"
                color="secondary"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddJewellery;
