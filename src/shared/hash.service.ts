import { Injectable } from '@nestjs/common';
import { mergeParams, responseToJson } from 'src/utils/helpers';
import { updateConfig } from 'src/utils/helpers';
import { RequestConfig } from 'src/utils/types';

import * as crypto from 'crypto';

@Injectable()
export class HashService {
  #hashGen: crypto.Hash;

  constructor() {
    this.#hashGen = crypto.createHash('md5');
  }

  hash(data: string): string {
    return this.#hashGen.copy().update(data).digest('hex');
  }
}
