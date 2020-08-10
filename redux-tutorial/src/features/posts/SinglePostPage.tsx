import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { PostParams, PostState } from './types';
import { usePost, showNoPostPage } from './utils';

export const SinglePostPage: React.FunctionComponent<RouteComponentProps<PostParams>> = ({ match }) => {
  const { postId } = match.params;

  const post: PostState | undefined = usePost(postId);

  if (!post) {
    return showNoPostPage();
  } else {
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    );
  }
};
