import { User, Token } from './typeorm';

export type FindUserParams = {
  username: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
};

export type CreateSessionParams = {
  username: string;
  password: string;
};

export type CreateSessionResponse = {
  response: Token;
};

export type ValidateSessionParams = {
  token: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export interface Response<T> {
  rejected: boolean;
  error_message: string;
  data: T;
}

export type FindUserOptions = {
  selectPassword?: boolean;
};

export type FindGameParams = {
  username: string;
};

export type PlaceInQueueParams = {
  token: string;
};

export type GetStatusInQueueParams = {
  token: string;
};

export type RetrieveGameDataParams = {
  gameData: any;
};

export type UpdateGameStageDataParams = {
  gameStage: any;
  gameId: any;
};

type Param = {
  [key: string]: string;
};

export interface RequestConfig extends RequestInit {
  params: Param | undefined;
}

type ResponseParam = {
  [key: string]: Array<string>;
};

export type ResponseData = {
  RESULTS: Array<ResponseParam>;
};

export type FindUserResponse = {
  credentials: User;
};

export type СreateUserResponse = {
  credentials: User;
};

export type TaggedSocketParams = {
  token: string;
};
