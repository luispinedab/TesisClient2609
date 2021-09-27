import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { GradesService } from 'app/services/grades.service';
import {Nota} from '../../../models/Notas';
import { AchievementsService } from 'app/services/achievements.service';

@Component({
  selector: 'ngx-registrarnota',
  templateUrl: './registrarnota.component.html',
  styleUrls: ['./registrarnota.component.scss']
})
export class RegistrarnotaComponent implements OnInit {
  data:any=[];
  hoy =new Date;
  estudiantes:any=[];
  levelg:any=[];
  nuevo:Nota[]=[]
  fecha=new Date;
  notas:any=[];
    constructor(private achievementservice:AchievementsService,private gradeservice:GradesService,private router:Router,private infoestudiantesservice:InfoestudianteService) { 
      this.data = this.router.getCurrentNavigation().extras.state;
      this.data = history.state;
    }
  
    ngOnInit(): void {
      this.getestudiantes();
    }
    trackByIndex(index: number, obj: any): any {
      return index;
    }
    getestudiantes(){
      var año=new Date().getFullYear();
      console.log(año);
      this.gradeservice.getNivelCursos().subscribe(res=>{
        this.levelg=res;
        this.levelg.forEach(element => {
          if(element.IDLevelGrade==this.data.IDLevelGrade)
          { 
            this.infoestudiantesservice.getInfoestudiantes_grade1(this.data.IDLevelGrade,año).subscribe(res=>{
              this.estudiantes=res;
              this.acomodar(this.estudiantes);
            })
          }
        });
      })
    }
    agregar(){
      var editar=[];
      console.log(this.nuevo)
      this.nuevo.forEach(notanueva => {
        this.estudiantes.forEach(student => {
          if(notanueva.IDStudent==student.IDInfoEstudiante.id)
          {
            if(student.Nota!=notanueva.Nota)
                    {
                      student.Nota=notanueva.Nota;
                      student.IDInfoEstudiante=student.IDInfoEstudiante.id;
                      editar.push({value:student,id:notanueva.IDStudent});
                    }
          }
        });
      });
      if(editar.length!=0)
      {
        console.log(editar)
        this.infoestudiantesservice.updateNotas(editar).subscribe(res=>{
          console.log(res);
          this.getestudiantes();
        })
      }
    }
    acomodar(arreglo:any){
      console.log(arreglo);
      arreglo.forEach(element => {
        var objeto={
          id:element.IDInfoEstudiante,
          Nombre:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido
        }
          element.IDInfoEstudiante=objeto;
          var line = new Nota;
          line={Nota:element.Nota,IDStudent:element.IDInfoEstudiante.id,FechadeModificacion:this.fecha}
          this.nuevo.push(line);
      });
    }
}
