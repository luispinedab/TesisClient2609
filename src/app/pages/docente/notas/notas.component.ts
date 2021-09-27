import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AchievementsService } from 'app/services/achievements.service';
import { GradesService } from 'app/services/grades.service';
import { SubjectsService } from 'app/services/subjects.service';

@Component({
  selector: 'ngx-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss']
})
export class NotasComponent implements OnInit {
  flagedit:boolean=false;
  flag:boolean=false;
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

  constructor(private router:Router,private subjectService:SubjectsService,private gradeService:GradesService,private fb:FormBuilder,private achievementsService:AchievementsService) { }
  miFormulario: FormGroup = this.fb.group({
    IDLevelGrade: ['',[Validators.required]],
    IDGrade:['',[Validators.required]],
    IDSubject: ['',[Validators.required]],
    Periodo:['',[Validators.required]]
  })
  ngOnInit(): void {
    this.getinfo();
  }
  getinfo(){
    this.achievementsService.getAsignaturas().subscribe(res=>{
      this.subjects=res;
      console.log(res);
    })
    this.gradeService.getCursos().subscribe(res=>{
      this.cursos=res;
    })
    var dt=new Date;
    this.año=dt.getFullYear();
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      console.log(this.levelgrades);
    },
    err=>console.error(err)
    )
    this.miFormulario.get('IDLevelGrade')?.valueChanges.subscribe(
      Curso=>{
        this.miFormulario.get('IDGrade')?.reset('');
        this.grades=[];

        this.cursos.forEach(element => {
          if(element.IDLevelGrade.IDLevelGrade==Curso &&element.Year==this.año.toString())
          {
            this.grades.push(element);
            console.log(this.grades)
          }
        });
        
      }
    )
    this.miFormulario.get('IDGrade')?.valueChanges.subscribe(
      Curso=>{
        this.miFormulario.get('IDSubject')?.reset('');
        this.materias=[];
        this.subjects.forEach(element => {
          if(element.IDGrade.IDGrade==Curso &&element.Year==this.año.toString())
          {
            this.materias.push({value:element.IDSubject,title:element.IDNameSubject.namesubject});
            console.log(this.materias)
          }
        });
      }
    )

  }
  cancel() {

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
    this.router.navigate(['/pages/docente/Notas/tabla'], { state: this.miFormulario.value });
    
  }

}
