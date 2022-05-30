import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from '../../apis/userApi';

export const fetchAsyncUsers = createAsyncThunk(
  "Users/fetchAsyncUsers",
  async () => {
    const response = await userApi.get(`/api/users`);
    return response.data.data ;
  }
);

// ===============================================================

// interface UsersState {
//   users: []
//   Loading: boolean | null
// }

const initialState = {
  users: {},
  Loading: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers:{
    addUser : (state , action) => {
      state.users.push(action.payload);
    },
    deleteUser : (state , action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
    updateUser : (state , action) => {
      state.users.map((user) => {
        if(user.id === action.payload.id ){
          user.first_name = action.payload.first_name ;
        }
      })
    },

  },
  extraReducers: {
    [fetchAsyncUsers.pending]: (state) => {
      state.Loading = true ;
    },
    [fetchAsyncUsers.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      console.log(payload);
      return { ...state, users: payload , Loading:false};
    },
    [fetchAsyncUsers.rejected]: () => {
      console.log("Rejected!");
    }
  },
});

export const { addUser , deleteUser , updateUser } = usersSlice.actions ;
export const getAllUsers = (state) => state.users.users ;
export const Load = (state) => state.users.Loading ;
export default usersSlice.reducer ;
