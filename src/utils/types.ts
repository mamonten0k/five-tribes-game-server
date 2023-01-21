import { User } from './typeorm';

export type FindUserParams = {
  username: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
};

export type UserCredentialsParams = {
  username: string;
  password: string;
};

export type FindUserOptions = {
  selectPassword?: boolean;
};

//Game-Service
export type FindGameParams = {
  username: string;
};

export type PlaceInQueueParams = {
  username: string;
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
