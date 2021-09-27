import { Component, OnInit, ViewChild } from '@angular/core';
import {InfoestudianteService} from '../../../services/infoestudiante.service';
import {InfoEstudiante} from '../../../models/InfoEstudiante';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { updateInfoStudents } from 'app/models/updateInfoStudents';
import { AspirantesService } from 'app/services/aspirantes.service';

@Component({
  selector: 'ngx-enablepago',
  templateUrl: './enablepago.component.html',
  styleUrls: ['./enablepago.component.scss']
})
export class EnablepagoComponent implements OnInit {
  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  public input: string = '<input type="checkbox"  name=checkbox></input>';
  settings = {
    actions: { 
    add:false,
    delete:false,
    edit:false,
     },
    columns: {
      IDInfoEstudiante: {
        title: 'Estudiante',
        type: 'string',
        editable:false,
        filter:false,
        valuePrepareFunction: (data) => {
          return data.Nombre;
        }
      },
      GradoaIngresar: {
        title: 'Grado',
        type: 'string',
        editable:false,
        filter:false, 
      },
      IDAspirante: {
        title: 'Estado de Matricula',
        type: 'string',
        editable:false,
        filter:false,
        valuePrepareFunction: (data) => {
          return data.CheckMatricula;
        }
      },
      set: {
        title: '',
        type: 'html',
        valuePrepareFunction: (value) => { console.log(value);return this._sanitizer.bypassSecurityTrustHtml(this.funcion(value)); },
        filter: false
    },
    },
  };
  data:any;
  infoobjeto:updateInfoStudents;
  constructor(private aspirantesservice:AspirantesService,private dialogService: NbDialogService,private infoestudiante:InfoestudianteService, private router:Router,private _sanitizer: DomSanitizer) {
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
    this.source= new LocalDataSource();
   }
   source:LocalDataSource;
  info:any=[];
  estudiantesselected:any=[];
  ngOnInit(): void {
    console.log(this.data)
    this.getinfo();
  }
  getinfo(){
    var today = new Date();
    var año = today.getFullYear();
    this.infoestudiante.getInfoestudiantes_grade1(this.data.IDLevelGrade,año).subscribe(res=>{
      this.info=res as InfoEstudiante[];
      this.comparar(this.info);
      this.source.load(this.info);
      this.acomodar(this.info);
      console.log("asi quedo",this.info);
    },
    err=>{console.error(err);})
  }
  funcion(valor:boolean){
    if(valor){
      return `<input type="checkbox" checked></input>`;
    }
    return `<input type="checkbox"></input>`
  }
  comparar(arreglo:any){
    arreglo.forEach(element => {
      element.set=false;
    });
  }
  acomodar(arreglo:any){
    
    console.log(arreglo)
    arreglo.forEach(element => {
      var objeto={
        id:element.IDInfoEstudiante,
        Nombre:element.Nombres+" "+element.PrimerApellido+" "+element.SegundoApellido
      }
        element.IDInfoEstudiante=objeto;
        if(element.IDAspirante.CheckMatricula==0){
          element.IDAspirante.CheckMatricula= "Sin Pagar";
        }
        else if (element.IDAspirante.CheckMatricula==1){
          element.IDAspirante.CheckMatricula= "Ya Pago";
        }
    });
  }
  onUserRowSelect (event) {
    var con=false;
    var info1=this.info;
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        
        
        if (this.checked&&con==false) {
          con=true;
          var selectedRows = event.data;
          info1.forEach(element => {
            if(element.IDInfoEstudiante.id==selectedRows.IDInfoEstudiante.id)
            {
              element.set=true;
            }
          });
        } else if(!this.checked &&con==false) {
          con=true
          var selectedRows = event.data;
          info1.forEach(element => {
            if(element.IDInfoEstudiante.id==selectedRows.IDInfoEstudiante.id)
            {
              element.set=false;
            }
          });
        }
        this.info=info1;
        console.log(this.info)
      })
    });
    }
    Asignar(){
      this.estudiantesselected=[];
      console.log(this.info)
      this.info.forEach(element => {
          if(element.set==true)
          {
            this.estudiantesselected.push(element);
          }
      });
      console.log(this.estudiantesselected)
    if(this.estudiantesselected.length!=0)
    { var aspirantesactualizar=[];
      var aspirantes0=[];
      var aspirantes1=[];
      console.log (this.estudiantesselected)
      this.estudiantesselected.forEach(seleccion => {
        if(seleccion.IDAspirante.CheckMatricula=="Sin Pagar")
        {
          aspirantes0.push(seleccion.IDAspirante.IDAspirantes)
        }
        else if(seleccion.IDAspirante.CheckMatricula=="Ya Pago")
        {
          aspirantes1.push(seleccion.IDAspirante.IDAspirantes)
        }
      });
      aspirantesactualizar.push({habilitar:aspirantes0,deshabilitar:aspirantes1})
      console.log("enviar",aspirantesactualizar)
      this.aspirantesservice.updateApirantes(aspirantesactualizar).subscribe(res=>{
        console.log(res);
            this.getinfo();
        this.source.refresh();
      })
    }
    }
    SelectAll(){
      var reiniciar=true;
      this.info.forEach(element => {
        if(element.set!=true)
        { 
          reiniciar=false;
          console.log("bien");
        }
      });

      if(!reiniciar)
      {
        this.info.forEach(element => {
            element.set=true;
        });
      }
      else{
        this.info.forEach(element => {
          element.set=false;
      });
      }
      this.source.refresh();
      console.log(this.info);
      
    }
    
    
}
