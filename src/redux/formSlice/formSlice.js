import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState:[],
  reducers: {
    setFormData: (state, action) => {
      state.push({...action.payload})
    },
    editData:(state,action)=>{
      const item=state.find((item)=>item.description===action.payload.description)
      item.title=action.payload.title
      item.description=action.payload.description
      item.endDate=action.payload.endDate
      item.isCompleted=action.payload.isCompleted
      item.image=action.payload.image
    },
    removeData: (state, action) => {
     return state.filter((item) => item.title !== action.payload);
    },
  },
});

export const { setFormData,removeData,editData } = formSlice.actions;

export default formSlice.reducer;
