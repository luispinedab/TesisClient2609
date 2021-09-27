import { Component, OnInit } from '@angular/core';
import { Preguntas } from 'app/models/preguntas';
import { Respuestas } from 'app/models/Respuestas';
import { GradesService } from 'app/services/grades.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { PreguntasService } from 'app/services/preguntas.service';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {

  constructor(private levelgradeservice:GradesService,private preguntasservice:PreguntasService, private infoestudianteservice:InfoestudianteService) { 
    this.preguntas1=new Array<Preguntas>();
  }
  idestudiante:any;
  infoestudiante:any;
  preguntas:any;
  preguntatemporal:Preguntas;
  respuestas:Respuestas[];
  preguntas1:Preguntas[];
  
  ngOnInit(): void {
    
    this.getinfo();
  }
  getinfo(){
  var token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(token);
  console.log(tokenbyload);
  this.idestudiante = tokenbyload.idAspirante;
    this.infoestudianteservice.getInfoEstudiantebyaspirante(this.idestudiante).subscribe(res=>{
      this.infoestudiante=res;
      this.levelgradeservice.getIDNivelCurso(this.infoestudiante.GradoaIngresar).subscribe(res=>{
        var idnew:any=res;
        this.preguntasservice.getPreguntas(idnew.IDLevelGrade).subscribe(res=>{
          this.preguntas=res;
          console.log(this.preguntas)
          for (let index = 0; index < this.preguntas.length; index++) {
            this.preguntasservice.getRespuestas(this.preguntas[index].IDPregunta).subscribe(res=>{
              this.respuestas=[];
              this.respuestas.push(res);
              console.log(this.respuestas)
              this.preguntatemporal=new Preguntas();
              this.preguntatemporal.IDPregunta=this.preguntas[index].IDPregunta;
              this.preguntatemporal.Pregunta=this.preguntas[index].Pregunta;
              this.preguntatemporal.IDLevelGrade=this.preguntas[index].IDLevelGrade;
              this.preguntatemporal.Respuestas=this.respuestas;
              console.log(this.preguntatemporal)
              this.preguntas1.push(this.preguntatemporal);
              console.log(this.preguntas1)
            },err=>console.error(err));
          }
        },err=>console.error(err))
  
      },err=>console.error(err))
    },err=>console.error(err))
  }

}
