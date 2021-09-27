import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.scss']
})
export class ReportarComponent implements OnInit {
  formControl = new FormControl(new Date());
  constructor(protected ref: NbDialogRef<ReportarComponent>) { }
  

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }

  submit() {
    var date=this.formControl.value;
    var fecha = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+ " " +'12:00:00';
    console.log(fecha)
    this.ref.close(fecha);
  }

}
