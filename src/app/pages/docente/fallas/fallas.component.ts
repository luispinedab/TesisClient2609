import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AchievementsService } from 'app/services/achievements.service';
import { GradesService } from 'app/services/grades.service';
import { SubjectsService } from 'app/services/subjects.service';

@Component({
  selector: 'ngx-fallas',
  templateUrl: './fallas.component.html',
  styleUrls: ['./fallas.component.scss']
})
export class FallasComponent implements OnInit {
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
    console.log(this.miFormulario.value);
    this.router.navigate(['/pages/docente/Fallas/tabla'], { state: this.miFormulario.value });
    
  }
}
