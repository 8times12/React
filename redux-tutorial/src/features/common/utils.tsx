import { PostState, State, UserState } from "./types";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useState } from "react";

export function usePost(postId: string): PostState | undefined {
  return useSelector<State, PostState | undefined>(state =>
    state.posts.find(post => post.id === postId));
}
export function useUser(userId: string): UserState | undefined {
  return useSelector<State, UserState | undefined>(state =>
    state.users.find(user => user.id === userId));
}

export function showNoPostPage(): JSX.Element {
  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
}

type ValuableElement = HTMLElement & { value: any; };
export interface PostOnChanged {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onTitleChanged<T extends ValuableElement>(event: ChangeEvent<T>): void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onContentChanged<T extends ValuableElement>(event: ChangeEvent<T>): void;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  onAuthorChanged<T extends ValuableElement>(event: ChangeEvent<T>): void;
}
export class PostOnChanged implements PostOnChanged {
  constructor(
      [title, setTitle]: [string, React.Dispatch<React.SetStateAction<string>>],
      [content, setContent]: [string, React.Dispatch<React.SetStateAction<string>>],
      [userId, setUserId]: [string, React.Dispatch<React.SetStateAction<string>>]) {
    this.title = title;
    this.setTitle = setTitle;
    this.onTitleChanged = e => setTitle(e.target.value);
    this.content = content;
    this.setContent = setContent;
    this.onContentChanged = e => setContent(e.target.value);
    this.userId = userId;
    this.setUserId = setUserId;
    this.onAuthorChanged = e => setUserId(e.target.value);
  }
}
const defaultPost: PostState = {
  id: '',
  title: '',
  content: '',
  user: ''
};
export function usePostOnChanged(post: PostState = defaultPost): PostOnChanged {
  return new PostOnChanged(useState(post.title), useState(post.content), useState(post.user));
}
