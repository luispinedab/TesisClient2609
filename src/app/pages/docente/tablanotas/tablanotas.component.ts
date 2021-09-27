import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { areIntervalsOverlappingWithOptions } from 'date-fns/fp';
import { GradesService } from 'app/services/grades.service';
import {Nota} from '../../../models/Notas';
import decode from 'jwt-decode';
import { AchievementsService } from 'app/services/achievements.service';

@Component({
  selector: 'ngx-tablanotas',
  templateUrl: './tablanotas.component.html',
  styleUrls: ['./tablanotas.component.scss']
})
export class TablanotasComponent implements OnInit {
data:any=[];
hoy =new Date;
estudiantes:any=[];
estudiantes1:any=[];
levelg:any=[];
nuevo:Nota[]=[]
fecha=new Date;
iddocente:number;
notas:any=[];
  constructor(private achievementservice:AchievementsService,private gradeservice:GradesService,private router:Router,private infoestudiantesservice:InfoestudianteService) { 
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
  }

  ngOnInit(): void {
    var token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(token);
  this.iddocente=tokenbyload.id;
    console.log(this.data);
    this.getnotas();
    this.getestudiantes();
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }
  getnotas(){
    this.achievementservice.getNotasbyMateria(this.data.Periodo,this.data.IDGrade,this.data.IDSubject).subscribe(res=>{
      this.notas=res;
    })
  }
  getestudiantes(){
    var año=new Date().getFullYear();
    console.log(año);
    this.gradeservice.getNivelCursos().subscribe(res=>{
      this.levelg=res;
      this.levelg.forEach(element => {
        if(element.IDLevelGrade==this.data.IDLevelGrade)
        { 
          this.data.IDLevelGrade=element.levelgrade;
          console.log(this.data.IDLevelGrade,element.levelgrade)
          this.infoestudiantesservice.getInfoestudiantes_curso(this.data.IDGrade,año).subscribe(res=>{
            this.estudiantes=res;
            this.acomodar(this.estudiantes);
          })
        }
      });
    })
  }
  cambiar(event:any){
      console.log(event.target.value);
  }
  agregar(){
    console.log("notas",this.notas);
    var agregar=[];
    var editar=[];
    var encontro:Boolean=false;
    var fin:Boolean=false;
    this.nuevo.forEach(notanueva => {
      fin=false;
      encontro=false;
      this.notas.forEach((nota,index) => {
        if(index==this.notas.length-1)
          {
            fin=true;
          }
          if(notanueva.IDStudent==nota.IDStudent.IDInfoEstudiante)
                {
                  console.log(notanueva.IDStudent,nota.IDStudent.IDInfoEstudiante)
                  encontro=true;
                  if(nota.Nota!=notanueva.Nota)
                  {
                    editar.push({value:notanueva,id:nota.IDratings});
                  }
                }
                if(fin && encontro==false && notanueva.Nota!=0){
                  agregar.push(notanueva);
                }
      });
    });
    if(this.notas.length==0)
    {
      this.nuevo.forEach(element => {
        if(element.Nota!=0)
        {
          agregar.push(element);
        }
      });
    }
    console.log("agregar",agregar)
    console.log("editar",editar)
    console.log("nuevo",this.nuevo);
    if(agregar.length!=0)
    {
      this.achievementservice.saveNotas(agregar).subscribe(res=>{
        console.log(res);
        this.getnotas();
      })

    }
    if(editar.length!=0)
    {
      this.achievementservice.updateNotas(editar).subscribe(res=>{
        console.log(res);
        this.getnotas();
      })
    }
  }
  acomodar(arreglo:any){
    console.log("notas",this.notas);
    console.log("estudiantes",arreglo)
    // for (let index = 0; index < 30; index++) {
    //   arreglo.push(arreglo[1])
      
    // }
    // console.log("estudiantes",arreglo)
    arreglo.forEach(element => {
      var objeto={
        id:element.IDInfoEstudiante,
        Nombre:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido
      }
        element.IDInfoEstudiante=objeto;
        var line = new Nota;
        line={Periodo:this.data.Periodo,IDGrade:this.data.IDGrade,IDSubject:this.data.IDSubject,Nota:0,IDStudent:element.IDInfoEstudiante.id,IDDocente:this.iddocente,FechadeModificacion:this.fecha}
        this.notas.forEach(element1 => {
          if(element.IDInfoEstudiante.id==element1.IDStudent.IDInfoEstudiante)
          {
            line.Nota=element1.Nota;
          }
        });
        this.nuevo.push(line);
    });
  }

}
