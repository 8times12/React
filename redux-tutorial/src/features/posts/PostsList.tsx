import React from 'react';
import { useSelector } from 'react-redux';

export interface PostState {
  id: string;
  title: string;
  content: string;
}
export type PostsState = PostState[];
export interface State {
  posts: PostsState;
}

export const PostsList = () => {
  const posts: PostsState = useSelector<State, PostsState>(state => state.posts);

  const renderedPosts = posts.map(post => (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
}