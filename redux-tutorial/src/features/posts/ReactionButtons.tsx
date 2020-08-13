import React from 'react';
import { PostState } from '../common/types';
import { reactionEmoji } from '../common/constants';
import { useDispatch } from 'react-redux';
import { reactionAdded } from './postsSlice';

export interface Props {
  post: PostState;
}

export const ReactionButtons: React.FunctionComponent<Props> = ({ post }) => {
  const dispatch = useDispatch();
  
  const reactionButtons = Array.from(reactionEmoji).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="muted-button reaction-button"
      onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name}))}
    >
      {emoji} {post.reactions[name]}
    </button>
  ));

  return <div>{reactionButtons}</div>
};
