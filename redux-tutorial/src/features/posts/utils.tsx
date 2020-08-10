import { PostState, State } from "./types";
import { useSelector } from "react-redux";
import React, { ChangeEvent, useState } from "react";

export function usePost(postId: string): PostState | undefined {
  return useSelector<State, PostState | undefined>(state =>
    state.posts.find(post => post.id === postId));
}

export function showNoPostPage(): JSX.Element {
  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
}

export interface PostOnChanged {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onTitleChanged<T extends HTMLInputElement | HTMLTextAreaElement>(event: ChangeEvent<T>): void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onContentChanged<T extends HTMLInputElement | HTMLTextAreaElement>(event: ChangeEvent<T>): void;
}
export class PostOnChanged implements PostOnChanged {
  constructor(
      [title, setTitle]: [string, React.Dispatch<React.SetStateAction<string>>],
      [content, setContent]: [string, React.Dispatch<React.SetStateAction<string>>]) {
    this.title = title;
    this.setTitle = setTitle;
    this.onTitleChanged = e => setTitle(e.target.value);
    this.content = content;
    this.setContent = setContent;
    this.onContentChanged = e => setContent(e.target.value);
  }
}
export function usePostOnChanged(post: PostState): PostOnChanged {
  return new PostOnChanged(useState(post.title), useState(post.content));
}
