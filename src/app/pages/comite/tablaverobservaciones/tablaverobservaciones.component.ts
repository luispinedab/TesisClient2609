import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ObservacionesService} from '../../../services/observaciones.service';

@Component({
  selector: 'ngx-tablaverobservaciones',
  templateUrl: './tablaverobservaciones.component.html',
  styleUrls: ['./tablaverobservaciones.component.scss']
})
export class TablaverobservacionesComponent implements OnInit {
  settings = {
    actions: {
    add:false,
    edit:false,
    delete:false,
     },
    columns: {
      FechaCreacion: {
        title: 'Fecha',
        type: 'string',
      },
      Aspecto: {
        title: 'Aspecto',
        type: 'string',
      },
      IDSubject: {
        title: 'Asignatura',
        type: 'string',
      },
      Situacion_Presentada: {
        title: 'Descripcion',
        type: 'string',
      },
      Posicion_Estudiante: {
        title: 'Posición del Estudiante',
        type: 'string',
      },
      Acuerdos_Mejoramiento: {
        title: 'Acuerdos de Mejoramiento',
        type: 'string',
      },
      Docente: {
        title: 'Docente',
        type: 'string',
      }
    },
  };
observaciones:any;
data:any;
periodo:any;
  constructor(private router:Router,private observacionesService:ObservacionesService) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    this.data = history.state;
    console.log(this.data);
    this.periodo=this.data.Periodo;
    this.getinfo();
  }
  getinfo(){
    this.observacionesService.getObservaciones_ver(this.data.Año,this.data.Periodo,this.data.IDInfoEstudiante).subscribe(res=>{
      this.observaciones=res;
      this.observaciones.forEach(function(elemento, indice, array) {
        var dt = new Date(elemento.FechaModificacion);
        array[indice].FechaModificacion=dt.getFullYear()+"/"+dt.getMonth()+"/"+dt.getDay();
        array[indice].IDSubject=array[indice].IDSubject.IDNameSubject.namesubject;
 })
      console.log(this.observaciones);
    },
    err=>console.error(err)
    )
  }

}
