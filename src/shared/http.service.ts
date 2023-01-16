import { Injectable } from '@nestjs/common';
import { mergeParams, responseToJson } from 'src/utils/helpers';
import { updateConfig } from 'src/utils/helpers';
import { RequestConfig } from 'src/utils/types';

@Injectable()
export class HttpService {
  #config: RequestInit;

  constructor() {
    this.#config = {
      method: '',
      body: null,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      integrity: '',
      keepalive: true,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      signal: null,
      window: null,
    };
  }

  async post(url: string, config: RequestConfig): Promise<any> {
    const params = mergeParams(config.params || {});
    updateConfig(this.#config, config);

    const response = await fetch(`${url}?${params}`, { ...this.#config, method: 'POST' })
      .then((response) => response.json())
      .then((response) => responseToJson(response));

    return response;
  }
}
