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
      .body(String(message))
      .keyboard(32)
      .headerClass('hidden')
      .bodyClass('modal-body text-center text-info h4')
      .footerClass('hidden')
      .open();
  }

  alertSaved():void {
    this.alert('<span class="glyphicon glyphicon-cloud-upload"></span> <strong>保存しました</strong>');
  }

  alertDeleted():void {
    this.alert('<span class="glyphicon glyphicon-trash"></span> <strong>削除しました</strong>');
  }

  alertError(e:Error):void {
    const message = (e instanceof Error) ? e.message : String(e);
    this.modal.alert()
      .size('sm')
      .body('<span class="glyphicon glyphicon-exclamation-sign"></span> <strong>' + message + '</strong>')
      .keyboard(32)
      .headerClass('hidden')
      .bodyClass('modal-body text-center text-info h4 alert-danger')
      .footerClass('hidden')
      .open();
  }
}
