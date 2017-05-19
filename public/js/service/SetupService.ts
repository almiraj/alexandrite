import { Injectable } from '@angular/core';

import { HttpService } from '../service/HttpService';

@Injectable()
export class SetupService {
  constructor(
    public httpService:HttpService
  ) {}

  setup():Promise<void> {
    return this.httpService.post<void>('/ws/setup', {});
  }
}
