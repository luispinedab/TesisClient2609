import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DocumentosService } from 'app/services/documentos.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { SmartTableData } from '../../../@core/data/smart-table';

@Component({
  selector: 'ngx-format-matricula',
  templateUrl: './format-matricula.component.html',
  styleUrls: ['./format-matricula.component.scss']
})
export class FormatMatriculaComponent implements OnInit {
  settings={
    actions: { 
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-cloudy" title="Ver Documentos"></i>' }
    ],
      add:false,
      delete:false,
      edit:false,
      position:'right',
       },
    columns:{
      Tipo: {
        title: 'Tipo',
        type: 'string',
        editable:false,
        filter:false,
        width: '250px',
        valuePrepareFunction: (data) => {
          return data;
        }
      },
      IDInfoEstudiante: {
        title: 'Estudiante',
        type: 'string',
        editable:false,
        filter:false,
        width: '800px',
        valuePrepareFunction: (data) => {
          return data.Nombre;
        }
      }
    }
  }
  data:any;
  estudiantes:any;
  constructor(private documentoservice:DocumentosService,private router:Router) { 
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
  }
  ngOnInit(): void {
    console.log("in format",this.data)
    this.getinfo();
  }
  getinfo(){
    this.documentoservice.getFormatsbyYear(this.data.Year).subscribe(res=>{
      console.log(res);
      this.estudiantes=res;
      this.acomodar(this.estudiantes);
    })
  }
  acomodar(arreglo:any){
      arreglo.forEach(element => {
        var objeto={
          id:element.IDInfoEstudiante.IDInfoEstudiante,
          Nombre:element.IDInfoEstudiante.Nombres+" "+element.IDInfoEstudiante.PrimerApellido+" "+element.IDInfoEstudiante.SegundoApellido
        }
        element.IDInfoEstudiante=objeto;
      });
  }
  onCustom(event) {
    console.log("ricoo",event.data.Ruta)
    window.location=event.data.Ruta;
  }

}
