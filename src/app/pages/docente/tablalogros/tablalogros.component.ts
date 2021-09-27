import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';
import { DomSanitizer } from '@angular/platform-browser';
import {AssignedAchievement} from '../../../models/AssignedAchievement';
import { Achievement } from 'app/models/Achievement';
@Component({
  selector: 'ngx-tablalogros',
  templateUrl: './tablalogros.component.html',
  styleUrls: ['./tablalogros.component.scss']
})

export class TablalogrosComponent implements OnInit {
  public input: string = '<input type="checkbox"  name=checkbox></input>';
  settings = {
    actions: {
    add:false,
    edit:false,
    delete:false,
     },
    columns: {
      Achievement: {
        title: 'Logros',
        type: 'string',
        filter: false
      },
        set: {
          title: '',
          type: 'html',
          
          valuePrepareFunction: (value) => { console.log(value);return this._sanitizer.bypassSecurityTrustHtml(this.funcion(value)); },
          filter: false
      },
    },
  };
  arraytocompare:any=[];
  checkbox:any=[];
  logrosasigned:any=[];
  logrosnew:any=[];
  data:any;
  info:any=[];
  logros:any=[];
  logroobjeto:AssignedAchievement;
  constructor(private router:Router,private achievementservice:AchievementsService,private _sanitizer: DomSanitizer) { 
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
    this.getinfo();
  }

  ngOnInit(): void {
    //console.log("oninit",this.logros);
  }
  funcion(valor:boolean){
    if(valor){
      return `<input type="checkbox" checked></input>`;
    }
    return `<input type="checkbox"></input>`
  }
  getinfo(){
    this.achievementservice.getassignedLogros_menu(this.data.Periodo,this.data.NameSubject).subscribe(res=>{
      this.logrosasigned=res;
    })
    this.achievementservice.getlogros_asignar(this.data.IDLevelGrade,this.data.NameSubject).subscribe(res=>{
      this.logros=res;
      this.comparar(res);
      console.log("logros:",this.logros);
    },
    err=>console.error(err))
  }
  comparar(arreglo:any){
    arreglo.forEach(element => {
      element.set=false;
    });
    arreglo.forEach(logro => {
        this.logrosasigned.forEach(logroasignado => {
            if(logro.IDAchievement==logroasignado.IDAchievement.IDAchievement && this.data.IDGrade==logroasignado.IDGrade.IDGrade)
            { 
              logro.set=true;
            }

        });
    });
  }
  
  Guardar(){
    this.organizararreglo();
    console.log(this.logrosasigned);
    if(this.logrosnew.length!=0)
    {
    console.log("hola",this.logrosnew)
    this.logroobjeto=new AssignedAchievement();
    this.logroobjeto.Periodo=this.data.Periodo;
    this.logroobjeto.IDGrade=this.data.IDGrade;
    this.logroobjeto.NameSubject=this.data.NameSubject;
    this.logroobjeto.IDAchievement=this.logrosnew;
    }
    this.achievementservice.saveLogrosAsignados(this.logroobjeto).subscribe(res=>{
      console.log(res);
      this.achievementservice.getassignedLogros_menu(this.data.Periodo,this.data.NameSubject).subscribe(res=>{
        this.logrosasigned=res;
      })
    },
    err=>console.error(err)
    )
  }
  organizararreglo(){
    this.logrosnew=[];
    var incluye=false;
    this.logrosasigned.forEach(logroviejo => {
      this.logros.forEach(logronuevo => {
          if(this.data.IDGrade==logroviejo.IDGrade.IDGrade && logroviejo.IDAchievement.IDAchievement==logronuevo.IDAchievement && logronuevo.set==false)
          { 
            this.logrosnew.push({logro:logroviejo.IDAssignedAchievement,status:"eliminar"});
          }
      });
    });
    this.logros.forEach(logronuevo => {
      incluye=false;
      this.logrosasigned.forEach(logroviejo => {
          if(this.data.IDGrade==logroviejo.IDGrade.IDGrade && logroviejo.IDAchievement.IDAchievement==logronuevo.IDAchievement)
          { 
            incluye=true;
          }
      });
      if(incluye==false && logronuevo.set==true)
      { 
        console.log("true",logronuevo);
        this.logrosnew.push({logro:logronuevo.IDAchievement,status:"Agregar"});
      }
    });
  }
  public onUserRowSelect(event) {
    var con=false;
    var logros1=this.logros;
    var checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        
        
        if (this.checked&&con==false) {
          con=true;
          var selectedRows = event.data;
          logros1.forEach(element => {
            if(element.IDAchievement==selectedRows.IDAchievement)
            {
              element.set=true;
            }
          });
        } else if(!this.checked &&con==false) {
          con=true
          var selectedRows = event.data;
          logros1.forEach(element => {
            if(element.IDAchievement==selectedRows.IDAchievement)
            {
              element.set=false;
            }
          });
        }
        this.logros=logros1;
      })
    });
  }

}
