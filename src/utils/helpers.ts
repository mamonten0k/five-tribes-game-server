import { URLSearchParams } from 'url';
import { GameGeneralInfo, RequestConfig, ResponseData, RowResponseData } from './types';

import * as bcrypt from 'bcrypt';

/**
 * @name parseBearerHeader
 * @descr Функция парсит запрос, достает из него токен
 * @param req - запрос пришедший на сервер
 */
export function parseBearerHeader(req: any) {
  const bearer = req.rawHeaders.filter((str: string) => str.startsWith('Bearer'))[0];
  return bearer.split(' ')[1];
}

/**
 * @name hashPassword
 * @descr Функция принимает пароль строкой, хэширует его и возвращает пользователю
 * @param rawPassword - введенный пользователем пароль
 */
export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawPassword, salt);
}

/**
 * @name compareHash
 * @descr Функция принимает введенный пользователем пароль и хэш пароля из базы данных и сравнивает их
 * @param rawPassword params - введенный пользователем пароль
 * @param hashedPassword params - хэш пароля из базы данных
 */
export async function compareHash(rawPassword: string, hashedPassword: string) {
  return bcrypt.compare(rawPassword, hashedPassword);
}

/**
 * @name mergeParams
 * @descr Функция принимает query аргументы для http запроса и собирает их в строку
 * @param params - queries в формате JSON
 */
export function mergeParams(params: object) {
  return new URLSearchParams({
    ...params,
  }).toString();
}

/**
 * @name updateConfig
 * @descr Функция обновляет конфиг для класса запросов, выполняя leftJoin
 * @param config - оригинальный конфиг
 * @param newConfig - конфиг, заданный пользователем
 */
export function updateConfig(config: RequestInit, newConfig: RequestConfig) {
  for (const key of Object.keys(newConfig)) {
    if (key in config) {
      config[key] = { ...config[key], ...newConfig[key] };
    }
  }
}

/**
 * @name toJsonResponse
 * @descr Функция парсит данные из базы данных на MySQL версии, меньшей 5.6, в удобоваримый JSON
 * @param response - Сырые данные из базы данных
 */
export function toJsonResponse(response: ResponseData) {
  const res = {};

  for (const entry of response.RESULTS) {
    for (const [key, value] of Object.entries(entry)) {
      res[key] = value.length === 1 ? value[0] : [...value];
    }
  }

  if (res['error_message']) res['rejected'] = true;
  return Object.keys(res).length === 0 ? undefined : res;
}
/**
 * @name rowsToJsonResponse
 * @descr Функция парсит данные из базы данных на MySQL версии, меньшей 5.6, в удобоваримый JSON
 * @param response - Сырые данные из базы данных, взятые по рядам
 */
export function rowsToJsonResponse(response: RowResponseData) {
  const res = {};

  for (const [entryKey, entryValue] of Object.entries(response.RESULTS)) {
    for (const [key, value] of Object.entries(entryValue || [,])) {
      if (!key || !value) {
        continue;
      }

      if ('error_message' in value) {
        res['error_message'] = value.error_message;
        continue;
      }

      if (!res[`batch-${entryKey}`]) {
        res[`batch-${entryKey}`] = [value];
        continue;
      }

      res[`batch-${entryKey}`] = [...res[`batch-${entryKey}`], value];
    }
  }

  if (res['error_message']) res['rejected'] = true;
  return Object.keys(res).length === 0 ? undefined : res;
}

/**
 * @name waitFor
 * @descr Функция, позволяет вызвать задержку в асинхронных функциях
 * @param timeout - время задержки
 */
export function waitFor(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Timeout');
    }, timeout);
  });
}

/**
 * @name transformExistingGames
 * @descr Костыль, получение данных, забранных столбцами
 * @param games_raw - полученные игры {game_ids: [], players: [], timestamp: []}
 */
export function transformExistingGames(games_raw: any) {
  const games = [];

  while (games_raw.game_id.length) {
    games.push({
      id: games_raw.game_id.pop(),
      rival: games_raw.player.pop(),
      player: games_raw.player.pop(),
      timestamp: games_raw.timestamp.pop(),
    } as GameGeneralInfo);

    games_raw.game_id.pop();
    games_raw.timestamp.pop();
  }

  return { games };
}
