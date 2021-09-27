import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ObservacionesService} from '../../../services/observaciones.service';

@Component({
  selector: 'ngx-tablaeditarobservaciones',
  templateUrl: './tablaeditarobservaciones.component.html',
  styleUrls: ['./tablaeditarobservaciones.component.scss']
})
export class TablaeditarobservacionesComponent implements OnInit {

  settings = {
    actions: { 
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }
    ],
    add:false,
    edit:false,
    delete:false,
    position:'right'
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
  constructor(private router:Router,private observacionesService:ObservacionesService) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    this.data = history.state;
    console.log(this.data);
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
  onCustom(event) {
    this.router.navigate(['pages/comite/observaciones-add/'+event.data.IDremark]);
  }

}
