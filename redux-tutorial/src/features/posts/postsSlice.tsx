import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { PostsState, PostState } from '../common/types';

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!', date: '20200801', user: '', reactions: {} },
  { id: '2', title: 'Second Post', content: 'More text', date: '20200801', user: '', reactions: {} }
];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action: PayloadAction<PostState>) =>
        void state.push(action.payload),
      prepare: (title, content, userId) => ({
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
          reactions: {}
        }
      })
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

export const { reducer: postsReducer, actions: postsActions } = postsSlice;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
