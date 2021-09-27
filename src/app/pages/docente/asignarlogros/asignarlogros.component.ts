import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import {AchievementsService} from '../../../services/achievements.service';
import {Observaciones} from '../../../models/Observacion';
import {Router} from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { ObservacionesService } from 'app/services/observaciones.service';
import { GradesService } from 'app/services/grades.service';

@Component({
  selector: 'ngx-asignarlogros',
  templateUrl: './asignarlogros.component.html',
  styleUrls: ['./asignarlogros.component.scss']
})
export class AsignarlogrosComponent implements OnInit {

observacionobjeto:Observaciones;
año:number;
date:Date;
materias:any=[];
levelgrades:any=[];
grades:any=[];
settings:any=[];
subjects:any=[];
cursos:any=[];

constructor(private gradeService:GradesService,private fb:FormBuilder,private achievementsService:AchievementsService,private infoestudianteService:InfoestudianteService,private observacionesService:ObservacionesService,private router:Router) { }
miFormulario: FormGroup = this.fb.group({
  Periodo:['',[Validators.required]],
  IDLevelGrade: ['',[Validators.required]],
  IDGrade: ['',[Validators.required]],
  NameSubject: ['',[Validators.required]],
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
        this.miFormulario.get('NameSubject')?.reset('');
        this.materias=[];
        this.subjects.forEach(element => {
          if(element.IDGrade.IDGrade==Curso &&element.Year==this.año.toString())
          {
            this.materias.push({value:element.IDNameSubject.namesubject,title:element.IDNameSubject.namesubject});
            console.log(this.materias)
          }
        });
      }
    )

  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  guardar(){
    console.log(this.miFormulario.value);
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    this.router.navigate(['/pages/docente/Asignarlogros/tabla'], { state: this.miFormulario.value });
  }
}
