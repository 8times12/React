import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { postAdded } from './postsSlice';
import { usePostOnChanged } from '../common/utils';
import { State, UsersState } from '../common/types';

export const AddPostForm: React.FunctionComponent = () => {
  const dispatch = useDispatch();

  const {
    title, setTitle, onTitleChanged,
    content, setContent, onContentChanged,
    userId, onAuthorChanged
  } = usePostOnChanged();

  const users: UsersState = useSelector<State, UsersState>(state => state.users);

  const onSavePostClicked = () => {
    if (title && content) {
      // @ts-ignore
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  };

  const canSave = !!title && !!content && !!userId;

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}
