import { PostState, State, UserState } from "./types";
import { parseISO, formatDistanceToNow } from 'date-fns';
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
  constructor(post: PostState) {
    const [title, setTitle] = useState(post.title);
    this.title = title;
    this.setTitle = setTitle;
    this.onTitleChanged = e => setTitle(e.target.value);

    const [content, setContent] = useState(post.content);
    this.content = content;
    this.setContent = setContent;
    this.onContentChanged = e => setContent(e.target.value);

    const [userId, setUserId] = useState(post.user || '');
    this.userId = userId;
    this.setUserId = setUserId;
    this.onAuthorChanged = e => setUserId(e.target.value);
  }
}
const defaultPost: PostState = {
  id: '',
  title: '',
  content: '',
  date: '',
  user: '',
  reactions: {}
};
export function usePostOnChanged(post: PostState = defaultPost): PostOnChanged {
  return new PostOnChanged(post);
}

export function showNoPostPage(): JSX.Element {
  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
}

export function calcTimeAgo(timestamp: string) {
  if (!timestamp) return '';
  const date: Date = parseISO(timestamp);
  const timePeriod: string = formatDistanceToNow(date);
  return `${timePeriod} ago`;
}
