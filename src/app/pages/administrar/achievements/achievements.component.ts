import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {AchievementsService} from '../../../services/achievements.service';
import {Router} from '@angular/router';
import {SmartTableData} from '../../../@core/data/smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { AgregarComponent } from './agregar/agregar.component';
import { NbDialogService } from '@nebular/theme';
import { FormExperienciasComponent } from 'app/pages/admision/formulario/FormExperiencias/dialog-name-prompt.component';


@Component({
  selector: 'ngx-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit,AfterViewInit {
  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
  searchCurso:any="";
  settings = {
    mode: 'external',
    add:{
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
      IDLevelGrade:{
        title: 'Nivel del Curso',
        
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
        filterFunction:(cell,search)=> {
          if(this.searchCurso!=search)
          { 
            this.searchCurso=search; 
            this.funcion1();
          }         
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
      NameSubject:{
        title: 'Materia',
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
          console.log("filtro:",cell,search)    
          if(cell==search)
          {
           return true;
         } else {
           console.log(search);
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data;
      },
      },
      Achievement:{
        title:'Logro',
        type:'string'
      }
    }
  }
  names: any[] = [];
  achievements:any=[];
  subjects:any=[];
  subjects1:any=[];
  levelgrades:any=[];
  constructor(private dialogService: NbDialogService,private service: SmartTableData, private achievementsService:AchievementsService,private router:Router) { }

  ngOnInit(): void {
    this.getNivelCursos();
    this.getAsignaturas();
    this.getAchievements();
  }

  getAchievements(){
    this.achievementsService.getLogros().subscribe( 
      res=>{
      this.achievements = res;
      //console.log(this.achievements);
      this.achievements.forEach(function(elemento, indice, array) {
          //array[indice].IDSubject.IDNameSubject=array[indice].IDSubject.IDNameSubject.namesubject;
   })
      },
      err =>console.error(err)
      );
      console.log(this.achievements);
  }
  getAsignaturas(){
    this.achievementsService.getAsignaturas().subscribe(
      res=>{
        this.subjects =res;
    for(let u of this.subjects){
      
      if(this.subjects1.includes(u.IDNameSubject.namesubject)==false)
      {
        this.settings.columns.NameSubject.editor.config.list.push({value:u.IDSubject,title:u.IDNameSubject.namesubject});
        this.settings.columns.NameSubject.filter.config.list.push({value:u.IDNameSubject.namesubject,title:u.IDNameSubject.namesubject});
        this.settings = Object.assign({}, this.settings);
      }
      this.subjects1.push(u.IDNameSubject.namesubject);    
    }
    }
    );
  }
  getNivelCursos(){
    this.achievementsService.getNivelCursos().subscribe(
      res=>{
        this.levelgrades =res;
    for(let u of this.levelgrades){
      this.settings.columns.IDLevelGrade.editor.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings.columns.IDLevelGrade.filter.config.list.push({value:u.IDLevelGrade,title:u.levelgrade});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      let index = this.achievements.indexOf(event.data);
      var selectedrow= this.achievements[index];
      this.achievementsService.deleteLogros(selectedrow.IDAchievement)
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
  funcion1(){
    this.settings.columns.NameSubject.filter.config.list=[];
    console.log(this.subjects);
    this.subjects.forEach(element => {
      if(element.IDGrade.IDLevelGrade.IDLevelGrade==this.searchCurso)
      {
        this.settings.columns.NameSubject.filter.config.list.push({value:element.IDNameSubject.namesubject,title:element.IDNameSubject.namesubject})
        this.settings = Object.assign({}, this.settings);
      }
    });
  }
  ngAfterViewInit(): void
  {
    
    this.smartTable.create.subscribe( (dataObject: any) => {
      this.dialogService.open(AgregarComponent)
      .onClose.subscribe(name => name && this.achievementsService.saveLogros(name).subscribe(res=>
        this.getAchievements(),err=>console.error(err))
        
        );
      console.log(this.achievements);
    });
    this.smartTable.edit.subscribe( (dataObject: any) => {
      this.dialogService.open(AgregarComponent, {
        context: {
          title: 'Enter template name',
          myObject: dataObject.data,
        },
      })
      .onClose.subscribe(registro => registro && 
        this.achievementsService.updateLogros(dataObject.data.IDAchievement,registro)
        .subscribe(
          res =>{
            this.getAchievements();
            console.log(res);
          },
          err => console.error(err)
        )
        );
    });
    this.smartTable.delete.subscribe( (dataObject: any) => {
      if (window.confirm('Are you sure you want to delete?')) {
        this.achievementsService.deleteLogros(dataObject.data.IDAchievement)
        .subscribe(
          res=>{
            console.log(res);
            this.getAchievements();
          },
          err=>console.error(err)
        )
      }
     
    });
  }
  
}
