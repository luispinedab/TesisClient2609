import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import {AchievementsService} from '../../../services/achievements.service';
import {Observaciones} from '../../../models/Observacion';
import {Router} from '@angular/router';
import decode from 'jwt-decode';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { ObservacionesService } from 'app/services/observaciones.service';

@Component({
  selector: 'ngx-verobservaciones',
  templateUrl: './verobservaciones.component.html',
  styleUrls: ['./verobservaciones.component.scss']
})
export class VerobservacionesComponent implements OnInit {
observacionobjeto:Observaciones;
años:any=[];
Anios1:any=[];
año:number;
date:Date;
Tipo_Faltas:any=[];
Faltas:any=[];
infoestudiantes:any=[];
estudiantes:any=[];
levelgrades:any=[];
settings:any=[];

  constructor(private fb:FormBuilder,private achievementsService:AchievementsService,private infoestudianteService:InfoestudianteService,private observacionesService:ObservacionesService,private router:Router) { }
  miFormulario: FormGroup = this.fb.group({
    Año:['',[Validators.required]],
    Periodo:['',[Validators.required]],
    IDLevelGrade: ['',[Validators.required]],
    IDInfoEstudiante: ['',[Validators.required]],
  })
  ngOnInit(): void {
    this.getinfo();
  }
  getinfo(){
    this.miFormulario.get('Año')?.valueChanges.subscribe(
      Año=>{
        this.año=Año;
      }
    )
    this.miFormulario.get('IDLevelGrade')?.valueChanges.subscribe(
      Curso=>{
        var objeto={
          curso:Curso,
          año:this.año
        }
        this.miFormulario.get('IDInfoEstudiante')?.reset('');
        this.estudiantes=[];
        this.infoestudianteService.getInfoestudiantes_grade(objeto.curso,objeto.año).subscribe(res=>{
          this.infoestudiantes=res;
          this.infoestudiantes.forEach(element => {
            this.estudiantes.push({Value:element.IDInfoEstudiante,Title:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido})
          });
        })
      }
    )
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      console.log(this.levelgrades);
    },
    err=>console.error(err)
    )
    
    this.observacionesService.getObservaciones().subscribe(res=>{
      this.settings=res;
      this.settings.forEach(element => {
        var dt = new Date(element.FechaModificacion);
        if(this.años.includes(dt.getFullYear())==false)
        {
          this.Anios1.push(dt.getFullYear());
        }
        this.años.push(dt.getFullYear());
      });
      console.log(this.Anios1);
    })
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
    this.router.navigate(['/pages/comite/observaciones-ver/tabla'], { state: this.miFormulario.value });
  }
}
