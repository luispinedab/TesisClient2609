import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradesService } from 'app/services/grades.service';

@Component({
  selector: 'ngx-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {

  myObject: any;
  grades:any=[];
  cursos:any=[];
  constructor(private gradeService:GradesService,private fb:FormBuilder,protected ref: NbDialogRef<AsignarComponent>) { }
  miFormulario: FormGroup = this.fb.group({
    IDGrade: ['',[Validators.required]],
  })

  ngOnInit(): void {
    console.log(this.myObject);
    this.getinfo();
  }
  getinfo(){
    this.gradeService.getCursos().subscribe(res=>{
      this.cursos=res;
      var hoy= new Date();
      console.log(this.cursos,this.myObject.toString())
      var año=hoy.getFullYear();
      this.cursos.forEach(element => {
        if(element.IDLevelGrade.levelgrade==this.myObject.toString() &&element.Year==año.toString())
        {
          this.grades.push(element);
          console.log(this.grades)
        }
      });
    })
  }
  cancel() {
    this.ref.close();
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  guardar(){
    var a=[]
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    console.log(this.miFormulario.value)
    this.ref.close(this.miFormulario.value);
    
  }

}
