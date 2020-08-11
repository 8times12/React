import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, RouteComponentProps } from 'react-router-dom';

import { postUpdated } from './postsSlice';
import { PostParams, PostState } from '../common/types';
import { usePost, showNoPostPage, usePostOnChanged } from '../common/utils';

export const EditPostForm: React.FunctionComponent<RouteComponentProps<PostParams>> = ({ match }) => {
  const { postId } = match.params;

  const post: PostState | undefined = usePost(postId);
  if (!post) {
    return showNoPostPage();
  }

  const dispatch: React.Dispatch<any> = useDispatch();
  const history = useHistory();

  const {
    title, onTitleChanged,
    content, onContentChanged
  } = usePostOnChanged(post);
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/posts/${postId}`);
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
};