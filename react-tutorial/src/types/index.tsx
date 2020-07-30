import { Checkers } from "../constants";

export type Checker = Checkers | null;
export type BoardFace = Checker[];
export type BoardRecord = {squares: BoardFace};
export type BoardHistory = BoardRecord[];
export type CheckLocation = { x: number; y: number; };
