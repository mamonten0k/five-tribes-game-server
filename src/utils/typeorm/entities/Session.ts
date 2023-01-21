export class Session {
  expiredAt: number = Date.now();
  id: string;
  json: string;
  destroyedAt: Date;
}
