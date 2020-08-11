import { createSlice, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import { UsersState } from '../common/types';

const initialState: UsersState = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' }
];

interface UserReducers extends SliceCaseReducers<UsersState> {}
const usersSlice: Slice<UsersState, UserReducers> = createSlice({
  name: 'users',
  initialState,
  reducers: {}
});

export const { reducer: usersReducer } = usersSlice;
