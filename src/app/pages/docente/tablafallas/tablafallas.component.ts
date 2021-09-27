import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { NbDialogService } from '@nebular/theme';
import {Falla} from '../../../models/Falla';
import decode from 'jwt-decode';
import { ReportarComponent } from './reportar/reportar.component';
import { AchievementsService } from 'app/services/achievements.service';

@Component({
  selector: 'ngx-tablafallas',
  templateUrl: './tablafallas.component.html',
  styleUrls: ['./tablafallas.component.scss']
})
export class TablafallasComponent implements OnInit {
  data:any=[];
  estudiantes:any=[];
  info:any=[];
  fallasporgrado:any=[];
  fallasporestudiante:any=[];
  Grado:any;
  iddocente:number;
  settings = {
    hideSubHeader: true,
    actions: {
      custom: [
        {
          name: 'VerAction',
          title: '<i class="nb-search" title="Ver"></i>'
        },
        {
          name: 'ReportarAction',
          title: '<i class="nb-compose" title="Reportar"></i>'
        }
      ],
      add: false,
      edit: false,
      delete: false,
      position:'right'
    },
    mode:'external',
    columns: {
      Nombre: {
        title: 'Estudiante',
        width:'75%',
        filter: false
      },
      TotalFallas: {
        title: 'Total de Fallas',
        width:'25%',
        filter: false
      }
    }
  };
  constructor(private achievementservice:AchievementsService,private router:Router,private infoestudiantesservice:InfoestudianteService, private dialogService:NbDialogService) { 
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
    this.getEstudiantes();
  }

  ngOnInit(): void {
    var token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(token);
  this.iddocente=tokenbyload.id;
  }
  getEstudiantes(){
    var año=new Date().getFullYear();
    this.infoestudiantesservice.getInfoestudiantes_curso(this.data.IDGrade,año).subscribe(res=>{
      this.estudiantes=res;
    console.log(this.data,this.estudiantes)
    })
    this.achievementservice.getFallasbyGrade(this.data.Periodo,this.data.IDGrade).subscribe(res=>{
      this.fallasporgrado=res;
      this.acomodar(this.estudiantes);
    })
  }
  acomodar(array:any)
  { this.info=[];
    array.forEach((element,index) => {
      this.info.push({id:element.IDInfoEstudiante,Nombre:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido,TotalFallas:0});
      this.fallasporgrado.forEach(fallasgrade => {
        if(element.IDInfoEstudiante==fallasgrade.IDStudent.IDInfoEstudiante)
        {
          this.info[index].TotalFallas=this.info[index].TotalFallas+1;
        }
      });
    });
    
    this.Grado=array[0].GradoaIngresar
    this.estudiantes=this.info
    console.log(this.estudiantes)
   
  }
  onCustom(event) {
    var newfalla = new Falla;
    var today = new Date();
    console.log(today)
    if(event.action=="VerAction")
    {
      var objeto={
        Periodo:this.data.Periodo,
        Grado:this.data.IDGrade,
        Estudiante:event.data.id
      }
      this.router.navigate(['/pages/docente/Fallas/tabla-ver'], { state: objeto });
    }
    else if(event.action=="ReportarAction")
    {
      console.log("Reportar")
      this.dialogService.open(ReportarComponent)
      .onClose.subscribe(fecha=>{
        newfalla.Periodo=this.data.Periodo;
        newfalla.IDGrade=this.data.IDGrade;
        newfalla.IDStudent=event.data.id;
        newfalla.IDDocente=this.iddocente;
        newfalla.FechaReporte=fecha;
        newfalla.FechadeModificacion=today;
        console.log(newfalla)
        this.achievementservice.saveFallas(newfalla).subscribe(res=>{
          console.log(res);
          this.getEstudiantes();
        },err=>console.error(err))
      });
    }
  }

}
