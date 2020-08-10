import { createSlice, Slice, CreateSliceOptions, nanoid, ValidateSliceCaseReducers, SliceCaseReducers } from '@reduxjs/toolkit';
import { PostsState } from './types';

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
];

const postsSliceOptions: CreateSliceOptions<PostsState> = {
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: { id: nanoid(), title, content }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    }
  }
};
const postsSlice: Slice<PostsState> = createSlice(postsSliceOptions);

export const { reducer: postsReducer, actions: postsActions } = postsSlice;
export const { postAdded, postUpdated } = postsSlice.actions;
