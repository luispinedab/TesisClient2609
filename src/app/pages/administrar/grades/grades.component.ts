import { Component, OnInit } from '@angular/core';
import {GradesService} from '../../../services/grades.service';
import {UsersService} from '../../../services/users.service';
import {Router} from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'ngx-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent{
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Year: {
        title: 'Año',
        type: 'string',
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
      },
      IDLevelGrade: {
        title: 'Nivel de Curso',
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
        filterFunction(cell?: any, search?: string,): boolean {          
          if(cell.IDLevelGrade==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.levelgrade;
      },
      },
      NameGrade: {
        title: 'Nombre del curso',
        type: 'string',
      },
      IDDirector: {
        title: 'Director de Curso',
        editor:
        {selectText: 'Select',
          type: 'list',
          config:
          { 
            list: []
          },  
        },
          filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: []
          },
        },
        filterFunction(cell?: any, search?: string,): boolean {          
          if(cell.IDUser==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.Name +" "+ data.Lastname;
      },
    },
    },
  };
  años: any=[];
  grades: any = [];
  usuarios: any = [];
  niveles: any=[];
  constructor(private service: SmartTableData, private gradesService:GradesService,private usersService:UsersService, private router:Router) {
  }

  ngOnInit(): void {
    this.getGrades();
    this.getlevelGrades();
    this.getUsers();
    this.getGrades();
  }
  getlevelGrades(){
    this.gradesService.getNivelCursos().subscribe(
      res=>{
        this.niveles =res;
    for(let u of this.niveles){
      this.settings.columns.IDLevelGrade.editor.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings.columns.IDLevelGrade.filter.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }
  getGrades(){
    this.gradesService.getCursosAll().subscribe(
      res=>{
        this.grades = res;
        var anio= new Date();
          this.settings.columns.Year.editor.config.list=[{value:anio.getFullYear(),title:anio.getFullYear().toString()}];
        if(this.grades.length==0)
        {
            this.settings.columns.Year.filter.config.list.push({value:anio.getFullYear(),title:anio.getFullYear().toString()});
            
        }
        else{
          this.grades.forEach(element => {
            if(this.años.includes(element.Year)==false)
            {
              this.settings.columns.Year.filter.config.list.push({value:element.Year,title:element.Year});
              this.settings = Object.assign({}, this.settings);
            }
            this.años.push(element.Year);
          });
        }
        
        console.log(this.grades);
      },
      err =>console.error(err)
    );
  }
  getUsers(){
    this.usersService.getUsuarios().subscribe(
      res=>{
        this.usuarios =res;
    for(let u of this.usuarios){
      if(u.IDUserType.UserType=="Docente" && u.UserState=='1'){
      this.settings.columns.IDDirector.editor.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
      this.settings.columns.IDDirector.filter.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
      this.settings = Object.assign({}, this.settings);
      }
    }
    }
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      let index = this.grades.indexOf(event.data);
      var selectedrow= this.grades[index];
      this.gradesService.deleteCursos(selectedrow.IDGrade)
      .subscribe(
        res=>{
          console.log(res);
        },
        err=>console.error(err)
      )
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event):void { 
    if (window.confirm('Are you sure you want to create?')) {
      event.confirm.resolve(event.newData);
       var newregistry = event.newData;
       console.log(newregistry);
      this.gradesService.saveCursos(newregistry)
    .subscribe(
      res => {
        this.getGrades();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  } 
  onSaveConfirm(event):void {
    if (window.confirm('Are you sure you want to save?')) {
      event.confirm.resolve(event.newData);
      var newrow=event.newData;
      console.log("filaeditada"+ newrow.Year);
      this.gradesService.updateCursos(newrow.IDGrade,newrow)
    .subscribe(
      res =>{
        this.getGrades();
        console.log(res);
      },
      err => console.error(err)
    )
    } else {
      event.confirm.reject();
    }
  }
}
