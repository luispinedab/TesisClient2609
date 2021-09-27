import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { SmartTableData } from '../../../@core/data/smart-table';
@Component({
  selector: 'ngx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {
  settings={

    actions: { 
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-list" title="Ver Documentos"></i>' }
    ],
      add:false,
      delete:false,
      edit:false,
      position:'right'
       },
    columns:{
      IDInfoEstudiante: {
        title: 'Estudiante',
        type: 'string',
        editable:false,
        filter:false,
        width: '800px',
        valuePrepareFunction: (data) => {
          return data.Nombre;
        }
      },
      GradoaIngresar: {
        title: 'Grado',
        type: 'string',
        editable:false,
        filter:false,
        width: '250px',
      }
    }
  }
  data:any;
  estudiantes:any;
  constructor(private infoestudianteservice:InfoestudianteService,private router:Router) { 
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
  }

  ngOnInit(): void {
    console.log(this.data)
    this.getinfo();
  }
  getinfo(){
    this.infoestudianteservice.getInfoestudiantes_grade(this.data.IDLevelGrade,this.data.Year).subscribe(res=>{
      this.estudiantes=res;
    this.acomodar(this.estudiantes);
    },err=>console.error(err))
  }
  acomodar(arreglo:any){
      arreglo.forEach(element => {
        var objeto={
          id:element.IDInfoEstudiante,
          Nombre:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido
        }
        element.IDInfoEstudiante=objeto;
      });
  }
  onCustom(event) {
    console.log(event.data.IDInfoEstudiante)
    this.router.navigate(['pages/secretaria/Documentos/'+event.data.IDInfoEstudiante.id+'&'+this.data.Year]);
  }
}
