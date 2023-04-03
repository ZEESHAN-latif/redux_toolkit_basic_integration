import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store';

interface User {
  id: number;
  name: string;
  email: string;
  altaf: string
}

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state) => {
      state.loading = false;
    }
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = userSlice.actions;

export const fetchUsers = () => async (dispatch: AppDispatch, getState: RootState) => {
  dispatch(fetchUsersStart());

  try {
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();

    console.log("++++++++++++++++++++++", data)
    dispatch(fetchUsersSuccess(data));
  } catch (error) {

    dispatch(fetchUsersFailure());
  }
};

export default userSlice.reducer;


