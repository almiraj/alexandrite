import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  alert(message:String, addingClass:String = ''):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      alert(message.replace(/<[^>]+>/g, ''));
      resolve();
    });
  }
  alertSaved():Promise<void> {
    return this.alert('[〇] 保存しました');
  }
  alertAdded():Promise<void> {
    return this.alert('[▽] 追加しました');
  }
  alertDeleted():Promise<void> {
    return this.alert('[▼] 削除しました');
  }
  alertError(e:Error | String):Promise<void> {
    const message = (e instanceof Error) ? e.message : String(e);
    return this.alert('[×] ' + message, 'alert-danger');
  }
}
