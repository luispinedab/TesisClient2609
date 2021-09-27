import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AchievementsService } from 'app/services/achievements.service';
import { GradesService } from 'app/services/grades.service';


@Component({
  selector: 'ngx-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  objeto:any;
  title: String;
  myObject: any;
  año:number;
  date:Date;
  materias:any=[];
  levelgrades:any=[];
  grades:any=[];
  settings:any=[];
  subjects:any=[];
  cursos:any=[];
  constructor(private gradeService:GradesService,private fb:FormBuilder,private achievementsService:AchievementsService,protected ref: NbDialogRef<AgregarComponent>) { }
  
  miFormulario: FormGroup = this.fb.group({
    IDLevelGrade: ['',[Validators.required]],
    NameSubject: ['',[Validators.required]],
    Achievement:['',[Validators.required]]
  })
  ngOnInit(): void {
    this.getinfo();
    
  }
  getinfo(){
   
    this.gradeService.getCursos().subscribe(res=>{
      this.cursos=res;
      
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      console.log(this.levelgrades);
    },
    err=>console.error(err)
    )
    })
    var dt=new Date;
    this.año=dt.getFullYear();
    this.miFormulario.get('IDLevelGrade')?.valueChanges.subscribe(
      Curso=>{
        console.log("entraaaa")
        this.miFormulario.get('NameSubject')?.reset('');
        this.materias=[];
        this.achievementsService.getAsignaturas().subscribe(res=>{
          this.subjects=res;
          console.log(this.subjects)
        this.subjects.forEach(element => {
          if(element.IDGrade.IDLevelGrade.IDLevelGrade==Curso &&element.Year==this.año.toString())
          { if((this.materias.find(namesub=>namesub.value==element.IDNameSubject.namesubject))==undefined)
            {
            this.materias.push({value:element.IDNameSubject.namesubject,title:element.IDNameSubject.namesubject});
            }
          }
        });
        })
      }
    )
    if(this.myObject!=null)
    { 
      this.objeto=this.myObject;
      this.miFormulario.patchValue({'IDLevelGrade':this.objeto.IDLevelGrade.IDLevelGrade})
      this.miFormulario.patchValue({'NameSubject':this.objeto.NameSubject})
      this.miFormulario.patchValue({'Achievement':this.objeto.Achievement})
      console.log(this.miFormulario.value);
    }
    
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
