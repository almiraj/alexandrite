import { Injectable } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Injectable()
export class ModalService {
  constructor(
    public modal:Modal
  ) {}

  alert(message:String):void {
    this.modal.alert()
      .size('sm')
      .body('<strong>' + String(message) + '</strong>')
      .keyboard(32)
      .headerClass('hidden')
      .bodyClass('modal-body text-center text-info h4')
      .footerClass('hidden')
      .open();
  }
  alertSaved():void {
    this.alert('<span class="glyphicon glyphicon-cloud-upload"></span> 保存しました');
  }
  alertAdded():void {
    this.alert('<span class="glyphicon glyphicon-cloud-upload"></span> 追加しました');
  }
  alertDeleted():void {
    this.alert('<span class="glyphicon glyphicon-trash"></span> 削除しました');
  }
  alertError(e:Error):void {
    const message = (e instanceof Error) ? e.message : String(e);
    this.modal.alert()
      .size('sm')
      .body('<span class="glyphicon glyphicon-exclamation-sign"></span> ' + message)
      .keyboard(32)
      .headerClass('hidden')
      .bodyClass('modal-body text-center text-info h4 alert-danger')
      .footerClass('hidden')
      .open();
  }
}
