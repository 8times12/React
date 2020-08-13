export interface State {
  posts: PostsState;
  users: UsersState;
}

export type PostsState = PostState[];
export interface PostState {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: { [reaction: string]: number; }
}
export function isPostState(args: any): args is PostState {
  return args.id !== undefined
    && args.title !== undefined
    && args.content !== undefined;
}
export type UsersState = UserState[];
export interface UserState {
  id: string;
  name: string;
}
export function isUserState(args: any): args is UserState {
  return args.id !== undefined && args.name !== undefined;
}

export interface PostParams {
  postId: string;
}
