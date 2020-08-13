import React from 'react';
import { calcTimeAgo } from '../common/utils';

export interface Props {
  timestamp: string;
}

export const TimeAgo: React.FunctionComponent<Props> = ({ timestamp }) => {
  const timeAgo = calcTimeAgo(timestamp);

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
}
