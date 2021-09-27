import { Component, OnInit,AfterViewInit} from '@angular/core';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import {AchievementsService} from '../../../services/achievements.service';
import {Observaciones} from '../../../models/Observacion';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { ObservacionesService } from 'app/services/observaciones.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { ObjectLiteralElementLike } from 'typescript';

@Component({
  selector: 'ngx-addobservaciones',
  templateUrl: './addobservaciones.component.html',
  styleUrls: ['./addobservaciones.component.scss']
})
export class AddobservacionesComponent implements OnInit{
flagedit:boolean=false;
infoedit:any;
observacionobjeto:Observaciones;
año:Date;
date:Date;
Tipo_Faltas:any=[];
Faltas:any=[];
docente:any;
infoestudiantes:any=[];
estudiantes:any=[];
levelgrades:any=[];
settings:any=[];
subjects:any=[];
subjects1:any=[];
subjects2:any=[];
  constructor(private router:Router,private fb:FormBuilder,private achievementsService:AchievementsService,private infoestudianteService:InfoestudianteService,private observacionesService:ObservacionesService) {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
   }
    miFormulario: FormGroup = this.fb.group({
    Periodo:['',[Validators.required]],
    IDLevelGrade: ['',[Validators.required]],
    IDInfoEstudiante: ['',[Validators.required]],
    Aspecto: ['',[Validators.required]],
    IDSubject: ['',[Validators.required]],
    Tipo_Falta: ['',[Validators.required]],
    IDFalta: ['',[Validators.required]],
    Situacion_Presentada: ['',[Validators.required]],
    Posicion_Estudiante: ['',[Validators.required]],
    Acuerdos_Mejoramiento: ['',[Validators.required]],
    Docente: ['',],
    FechaCreacion: ['',],
    FechaModificacion: ['',]
   })

  ngOnInit(): void {
    this.año = new Date();
    this.docente="";
    this.getinfo();
    this.miFormulario.get('IDLevelGrade')?.valueChanges.subscribe(
      Curso=>{
        var objeto:any = {
          curso: Curso,
          año: this.año.getFullYear()
      };
        this.miFormulario.get('IDInfoEstudiante')?.reset('');
        this.miFormulario.get('IDSubject')?.reset('');
        this.estudiantes=[];
        this.settings=[];
        this.infoestudianteService.getInfoestudiantes_grade(objeto.curso,objeto.año).subscribe(res=>{
          this.infoestudiantes=res;
          this.infoestudiantes.forEach(element => {
            this.estudiantes.push({Value:element.IDInfoEstudiante,Title:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido})
          });
        })
        this.subjects.forEach(element => {
          if(element.IDGrade.IDLevelGrade.levelgrade==Curso &&element.Year==this.año.getFullYear().toString())
          {
            this.settings.push({value:element.IDSubject,title:element.IDNameSubject.namesubject});
            console.log(this.settings)
          }
        });
      }
    )
    this.miFormulario.get('IDSubject')?.valueChanges.subscribe(
      IDMateria=>{
        this.docente=" ";
         this.subjects.forEach(element => {
            if(element.IDSubject==IDMateria)
            {
              this.docente=element.IDTeacher.Name+' '+element.IDTeacher.Lastname;
            }
         });
      }
    )
    this.miFormulario.get('Tipo_Falta')?.valueChanges.subscribe(
      tipofalta=>{
        this.miFormulario.get('IDFalta').reset('');
        this.Faltas=[];
        this.observacionesService.getfaltas_tipoFaltas(tipofalta).subscribe(res=>{
          this.Faltas=res;
        },
        err=>console.error(err))
      }
    )
    
    var ruta = this.router.url.split('/');
    if(ruta[4]!=null)
    { this.flagedit=true;
      this.observacionesService.getObservacion(ruta[4]).subscribe(res=>{
        this.infoedit=res;
        console.log("andentro",this.infoedit.IDSubject.IDSubject);
        this.miFormulario.patchValue({'Periodo':this.infoedit.Periodo});
        this.miFormulario.patchValue({'Aspecto':this.infoedit.Aspecto});
        this.miFormulario.patchValue({'IDLevelGrade':this.infoedit.IDLevelGrade});
        this.miFormulario.patchValue({'Tipo_Falta':this.infoedit.IDFalta.IDTipoFalta.IDTipoFalta});
        this.miFormulario.patchValue({'IDFalta':this.infoedit.IDFalta.IDFalta});
        this.miFormulario.patchValue({'IDInfoEstudiante':this.infoedit.IDInfoEstudiante.IDInfoEstudiante});
        this.miFormulario.patchValue({'IDSubject':this.infoedit.IDSubject.IDSubject});
        this.miFormulario.patchValue({'Situacion_Presentada':this.infoedit.Situacion_Presentada});
        this.miFormulario.patchValue({'Posicion_Estudiante':this.infoedit.Posicion_Estudiante});
        this.miFormulario.patchValue({'Acuerdos_Mejoramiento':this.infoedit.Acuerdos_Mejoramiento});
        this.miFormulario.patchValue({'Docente':this.infoedit.Docente});
        this.miFormulario.patchValue({'FechaCreacion':this.infoedit.FechaCreacion})
        console.log("aquies",this.miFormulario.value);
      })
    }
  }
getinfo(){
  this.achievementsService.getAsignaturas().subscribe(res=>{
    this.subjects=res;
    console.log(this.subjects)
  },
  err=>console.error(err))
  this.achievementsService.getNivelCursos().subscribe(res=>{
    this.levelgrades=res;
    console.log(this.levelgrades);
  },
  err=>console.error(err)
  )
  this.observacionesService.gettipofaltas().subscribe(res=>{
    this.Tipo_Faltas=res;
    console.log(this.Tipo_Faltas);
  })
  
}
campoEsValido(campo:string){
  return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  
}
guardar(){
  if(this.miFormulario.invalid){
    this.miFormulario.markAllAsTouched();
    alert("Faltan campos por llenar");
    return;
  }
  
  console.log("Guardar",this.miFormulario.value);
  if(this.flagedit==false){
    console.log("Agregar")
    this.observacionobjeto=new Observaciones();
  this.observacionobjeto=this.miFormulario.value;
  this.observacionobjeto.FechaCreacion=this.date;
  this.observacionobjeto.FechaModificacion=this.date;
  this.observacionobjeto.Docente=this.docente;
    this.observacionesService.saveObservacion(this.observacionobjeto).subscribe(res=>{
      console.log(res);
      this.miFormulario.reset('');
    },
    err=>console.error(err))
  }
  else
  { console.log("editar");
    this.observacionobjeto=new Observaciones();
    this.observacionobjeto=this.miFormulario.value;
    this.observacionobjeto.FechaModificacion=this.date;
    this.observacionobjeto.Docente=this.docente;
    var ruta = this.router.url.split('/');
    this.observacionesService.updateobservacion(ruta[4],this.observacionobjeto).subscribe(res=>{
      console.log(res);
      this.miFormulario.reset('');
    },
    err=>console.error(err))
  }
}
}
