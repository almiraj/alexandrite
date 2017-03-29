import { Injectable } from '@angular/core';
import { Modal, OneButtonPreset } from 'angular2-modal/plugins/bootstrap';
import { DialogRef } from 'angular2-modal/esm/models/dialog-ref';

@Injectable()
export class ModalService {
  constructor(
    public modal:Modal
  ) {}

  alert(message:String, addingClass:String = ''):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const isLongMessage = message.replace(/<[^>]+>/g, '').replace(/([^a-zA-Z0-9])/g, '$1$1').length >= 25;
      this.modal.alert()
        .size(isLongMessage ? 'lg' : 'sm')
        .body('<strong>' + String(message) + '</strong>')
        .keyboard(32)
        .headerClass('hidden')
        .bodyClass('modal-body text-center text-info h4 ' + addingClass)
        .footerClass('hidden')
        .open()
        .then((ref:DialogRef<OneButtonPreset>) => {
          ref.onDestroy.subscribe(() => resolve());
        });
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
