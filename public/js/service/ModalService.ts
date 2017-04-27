import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  constructor(
  ) {}

  alert(message:String, addingClass:String = ''):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      alert(message.replace(/<[^>]+>/g, '')); // TODO modalコンポーネント化する
      resolve();
    });
  }
  alertSaved():Promise<void> {
    return this.alert('<span class="glyphicon glyphicon-cloud-upload"></span> 保存しました');
  }
  alertAdded():Promise<void> {
    return this.alert('<span class="glyphicon glyphicon-cloud-upload"></span> 追加しました');
  }
  alertDeleted():Promise<void> {
    return this.alert('<span class="glyphicon glyphicon-trash"></span> 削除しました');
  }
  alertError(e:Error | String):Promise<void> {
    const message = (e instanceof Error) ? e.message : String(e);
    return this.alert('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + message, 'alert-danger');
  }
}
