import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, IconButton, Container, InputAdornment, Tooltip, Box, Typography, Modal } from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../../redux/formSlice/formSlice';
import SweetAlert from '../../sweetAlert/SweetAlert';
import AddForm from '../addTodo/AddForm';
import EditForm from '../editTodo/EditForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const TableList = () => {
  const [singleData, setSingleData] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const formData = useSelector(state => state.form);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(formData);
  }, [formData]);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAdd = () => {
    console.log('Add new item');
    handleOpen();
  };

  const handleEdit = (item) => {
    console.log('Edit item:', item);
    handleOpenEdit();
    setSingleData(item);
  };

  const handleDelete = (title) => {
    dispatch(removeData(title));
    SweetAlert("success", "Removed", "Item has been removed successfully", 900);
  };

  const filteredData = data.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ p: 4 ,boxShadow:3,borderRadius:2}}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          placeholder="Search by title..."
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: '300px' }}
        />
        <Button variant="contained" sx={{color:'white',bgcolor:'tomato'}} onClick={handleAdd}>
          <Add /> Add Details
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          {formData.length > 0 ? (
            <TableBody>
              {filteredData.map((data, index) => (
                <TableRow key={data.title} sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' }, '&:hover': { backgroundColor: '#f1f1f1' } }}>
                  <TableCell>
                    <img src={data.image} alt="Image" style={{ width: 50, height: 50, borderRadius: '50%' }} />
                  </TableCell>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.endDate}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton sx={{ color: 'greenyellow', '&:hover': { color: '#ffeb3b' } }} onClick={() => handleEdit(data)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton sx={{ color: 'black', '&:hover': { color: 'red' } }} onClick={() => handleDelete(data.title)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Box><Typography variant="body2" color="textSecondary" align="center" sx={{ p: 2 }}>No data added...</Typography></Box>
          )}
        </Table>
      </TableContainer>

       <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <AddForm close={handleClose} />
          <IconButton sx={{ position: 'absolute', top: 4, right: 4 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>

       <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <EditForm close={handleCloseEdit} singleData={singleData} />
          <IconButton sx={{ position: 'absolute', top: 4, right: 4 }} onClick={handleCloseEdit}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </Container>
  );
};

export default TableList;
