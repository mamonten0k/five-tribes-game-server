import { URLSearchParams } from 'url';
import { RequestConfig, ResponseData } from './types';

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
 * @name responseToJson
 * @descr Функция преобразует данные из базы данных на MySQL версии, меньшей 5.6, в JSON
 * @param response - Сырые данные из базы данных
 */
export function responseToJson(response: ResponseData) {
  const res = {};

  for (const entry of response.RESULTS) {
    for (const [key, value] of Object.entries(entry)) {
      res[key] = value[0];
    }
  }

  if (res['error_message']) res['rejected'] = true;
  return JSON.stringify(res) === '{}' ? undefined : res;
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
