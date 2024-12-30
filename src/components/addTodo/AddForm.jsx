import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TextField, Button, Checkbox, FormControlLabel, Box, Typography, Container } from '@mui/material';
import { setFormData } from '../../redux/formSlice/formSlice';
import SweetAlert from '../../sweetAlert/SweetAlert';
 
const AddForm = ({close}) => {
  const dispatch = useDispatch();
  const formData=useSelector(state=>state.form)
  // console.log(formData)
  
   const { title, description, endDate, isCompleted, image } = useSelector((state) => state.form);

  const { register, handleSubmit, formState: { errors },setValue } = useForm();

  const onSubmit = (data) => {
    dispatch(setFormData(data));
    console.log('Form data submitted:', data);
    SweetAlert('success', 'Added', 'The item has been added successfully', 700)
    close()
  };

   

  return (
    <Container maxWidth="md">
    <Box sx={{ maxWidth: 400, margin: '0 auto', padding: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>Add Details</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Title"
          {...register('title', { required: 'Title is required' })}
          error={!!errors.title}
          helperText={errors.title ? errors.title.message : ''}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={!!errors.description}
          helperText={errors.description ? errors.description.message : ''}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          type="date"
          label="Date"
          InputLabelProps={{ shrink: true }}
          {...register('endDate', { required: 'End date is required' })}
          error={!!errors.endDate}
          helperText={errors.endDate ? errors.endDate.message : ''}
          sx={{ marginBottom: 2 }}
        />


        <TextField
          type="file"
          accept="image/*"
      
        onChange={(e)=>{
          const file=e.target.files[0]
          const reader=new FileReader()
          if(file){
              reader.onloadend=()=>{
                  setValue("image",reader.result)
               }
              reader.readAsDataURL(file)
          }
       }}
          style={{ marginBottom:10,display:'flex',justifyContent:'start' }}
        />
        <FormControlLabel
          control={<Checkbox {...register('isCompleted')} />}
          label="Completed"
          sx={{ marginBottom: 2,display:'flex',justifyContent:'start' }}
        />
         

        <Button variant="contained" type="submit">Submit</Button>
      </form>
     
    </Box>
    </Container>
  );
};

export default AddForm;
