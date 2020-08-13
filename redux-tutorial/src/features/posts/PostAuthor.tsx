import React from 'react';
import { useUser } from '../common/utils';

export interface Props {
  userId: string;
}

export const PostAuthor: React.FunctionComponent<Props> = ({ userId }) => {
  const author = useUser(userId);

  return (
    <span>
      by {author ? author.name : 'Unknown author'}
    </span>
  );
}