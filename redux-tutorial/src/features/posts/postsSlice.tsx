import { createSlice, Slice, CreateSliceOptions } from '@reduxjs/toolkit';
import { PostsState } from './PostsList';

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
];

const postsSliceOptions: CreateSliceOptions<PostsState> = {
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action) {
      state.push(action.payload);
    }
  }
};
const postsSlice: Slice<PostsState> = createSlice(postsSliceOptions);

export const { reducer: postsReducer, actions: postsActions } = postsSlice;
export const { postAdded } = postsSlice.actions;
