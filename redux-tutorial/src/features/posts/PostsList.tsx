import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostsState, State } from '../common/types';
import { ReactionButtons } from './ReactionButtons';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';

export const PostsList: React.FunctionComponent = () => {
  const posts: PostsState = useSelector<State, PostsState>(state => state.posts);

  const orderedPosts: PostsState = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts: JSX.Element[] = orderedPosts.map(post => (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}