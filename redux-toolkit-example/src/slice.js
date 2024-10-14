import { createSlice } from '@reduxjs/toolkit';

const mySlice = createSlice({
    name: 'countSlice',
    initialState: {value:0},
    reducers: {
      up:(state, action)=>{
        state.value=state.value +action.step;
      }
    }
  });

  export default mySlice;