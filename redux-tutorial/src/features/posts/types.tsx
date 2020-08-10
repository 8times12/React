export interface State {
  posts: PostsState;
}
export type PostsState = PostState[];
export interface PostState {
  id: string;
  title: string;
  content: string;
}
export function isPostState(arg: any): arg is PostState {
  return arg.id !== undefined
    && arg.title !== undefined
    && arg.content !== undefined;
}
export interface PostParams {
  postId: string;
}
