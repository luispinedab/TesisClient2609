import { Component, OnInit, ViewChild } from '@angular/core';
import {InfoestudianteService} from '../../../services/infoestudiante.service';
import {InfoEstudiante} from '../../../models/InfoEstudiante';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource, Ng2SmartTableComponent } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { AsignarComponent } from './asignar/asignar.component';
import { updateInfoStudents } from 'app/models/updateInfoStudents';

@Component({
  selector: 'ngx-asignarcursos',
  templateUrl: './asignarcursos.component.html',
  styleUrls: ['./asignarcursos.component.scss']
})
export class AsignarcursosComponent implements OnInit {
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
      IDGrade: {
        title: 'Curso',
        type: 'string',
        editable:false,
        filter:false,
        valuePrepareFunction: (data) => {
          return data.NameGrade;
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
  constructor(private dialogService: NbDialogService,private infoestudiante:InfoestudianteService, private router:Router,private _sanitizer: DomSanitizer) {
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
    this.infoestudiante.getInfoestudiantes_grade(this.data.IDLevelGrade,año).subscribe(res=>{
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
      var today = new Date();
      var año = today.getFullYear();
        element.IDInfoEstudiante=objeto;
        if(element.IDGrade==null){
          var objeto1={
            IDGrade:0,
            NameGrade:"Sin Asignar",
            Year:año
          }
          element.IDGrade=objeto1;
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
      this.info.forEach(element => {
          if(element.set==true)
          {
            this.estudiantesselected.push(element);
          }
      });
    console.log (this.estudiantesselected)
    if(this.estudiantesselected.length!=0)
    {
      this.dialogService.open(AsignarComponent, {
        context: {
          myObject: this.data.IDLevelGrade,
        },
      })
      .onClose.subscribe(name => {
        this.info.IDGrade=name;
        this.infoobjeto=new updateInfoStudents();
        this.infoobjeto.IDInfoStudent=this.estudiantesselected;
        this.infoobjeto.IDGrade=name;
        this.infoestudiante.updateInfoStudents(this.infoobjeto).subscribe(res=>{
        this.getinfo();
        this.source.refresh();
        console.log(this.info)
        },err=>console.error(err))
      }
        );
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
