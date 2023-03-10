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

export type WithTokenParams = {
  token: string;
};

export type PlaceInQueueParams = WithTokenParams;

export type RemoveFromQueueParams = WithTokenParams;

export type GetStatusInQueueParams = WithTokenParams;

export type GetExistingGamesParams = WithTokenParams;

export type ValidateSessionParams = WithTokenParams;

export interface GetGameDataParams extends WithTokenParams {
  gameId: string;
}

export interface GetTurnsDataParams extends WithTokenParams {
  gameId: string;
}

export interface HandleBetParams extends WithTokenParams {
  gameId: string;
  betId: number;
}

export interface GetBetOptionsParams extends WithTokenParams {
  gameId: string;
}

export interface HandlePlaceChipParams extends WithTokenParams {
  gameId: string;
  provinceId: number;
  chipId: number;
  player: string;
}

export type HandleBetResponse = {
  active_player: string;
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

type RowResponseParam = {
  [key: string]: Array<string>;
};

export type ResponseData = {
  RESULTS: Array<ResponseParam>;
};

export type RowResponseData = {
  RESULTS: Array<Array<RowResponseParam>>;
};

export type FindUserResponse = {
  credentials: User;
};

export type СreateUserResponse = {
  credentials: User;
};

export type GameGeneralInfo = {
  id: string;
  rival: string;
  player: string;
  timestamp: string;
};

export type TaggedSocketParams = {
  username: string;
  gameId: string;
};

export type InititGameParams = {
  gameId: string;
  token: string;
};

export interface ExitGameParams extends WithTokenParams {
  gameId: string;
}
