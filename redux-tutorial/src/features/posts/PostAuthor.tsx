import React from 'react';
import { UserState } from '../common/types';
import { useUser } from '../common/utils';

export const PostAuthor: React.FunctionComponent<UserState> = ({ id: userId }) => {
  const author = useUser(userId);

  return (
    <span>
      by {author ? author.name : 'Unknown author'}
    </span>
  );
}