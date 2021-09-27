import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class FormExperienciasComponent {

  constructor(protected ref: NbDialogRef<FormExperienciasComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(colegio,direccion,telefono,gradoscursados) {
    var a=[]
    a.push(colegio,direccion,telefono,gradoscursados);
    this.ref.close(a);
  }
}
