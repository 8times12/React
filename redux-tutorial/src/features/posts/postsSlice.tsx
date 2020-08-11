import { createSlice, Slice, CreateSliceOptions, nanoid, SliceCaseReducers, CaseReducerWithPrepare, PayloadAction, CaseReducer } from '@reduxjs/toolkit';
import { PostsState, PostState } from '../common/types';

const initialState: PostsState = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: 'Katou' },
  { id: '2', title: 'Second Post', content: 'More text', user: 'Tanaka' }
];

interface PostsReducers extends SliceCaseReducers<PostsState> {
  // @ts-ignore
  postAdded: CaseReducerWithPrepare<PostsState, PayloadAction<PostState>>;
  postUpdated: CaseReducer<PostsState, PayloadAction<any>>
}
const postsSliceOptions: CreateSliceOptions<PostsState, PostsReducers> = {
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: { id: nanoid(), title, content, user: userId }
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
