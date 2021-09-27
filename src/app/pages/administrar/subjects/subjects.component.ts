import { AfterViewInit, Component, OnInit,ViewChild } from '@angular/core';
import {SubjectsService} from '../../../services/subjects.service';
import {Router} from '@angular/router';
import {Subject} from '../../../models/Subject';
import {SmartTableData} from '../../../@core/data/smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { AgregarComponent1 } from '../subjects/agregar/agregar.component';


@Component({
  selector: 'ngx-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit,AfterViewInit {
  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;
     c:boolean=false;
     cell1:any="";
     entra:any="";
     searchArea:any="";
     searchAño:any="";
     searchMateria:any="";
       listaValcursos: any=[];
      listaValasignaturas: any=[];
      listaValcursos1: any=[];
      listaValasignaturas1: any=[];
     ValorEditorMateria:any=0;
   newregistry:any;
     names:any=[];
     cellArea:any=[];
     i:any=0;
  settings ={
    mode:'external',
    add: {
      addButtonContent:    '<i class="nb-plus"></i>',
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
        addable: 'true',
        defaultValue: "Select",
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
          filterFunction:(cell,search)=>{ 
          if(this.searchAño!=search)
          { this.searchAño=search;
            this.funcion1();
          }
          if(cell==search)
          {
           return true;
         } else {
           return false;
         } 
       },
      },
      IDGrade: {
        
        title: 'Curso',
        editor:
        {
          type: 'list',
          config:
          { selectText: 'Select',
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
          if(cell.NameGrade==search)
          {
           return true;
         } else {
           return false;
         } 
       },
        valuePrepareFunction: (data) => {
        return data.NameGrade;
      },
      },
      IDArea: {
        title: 'Area',
        defaultValue: "Select",
        editor:
        {
          tagName: 'aaa',
        type: 'list',
          config:
          { selectText: 'Select',
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
      
        valuePrepareFunction: (cell,row) => {
          try {
            return cell.Area; 
            
          } catch (error) {
            return "pepito";
          }
         },
         filterFunction: (cell,search) => {
           if(this.searchArea!=search)
           {
              this.searchArea=search;
              this.funcion()
           }
          if (cell.IDArea == search || search == '') {
            return true;
          } else {
            return false;
          }
       },
        
      },
      IDNameSubject:{
        title: 'Nombre Asignatura',
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
        filterFunction:(cell,search)=>{  
          this.searchMateria=search;    
          if(cell.namesubject==search)
          {
           return true;
         } else {
           return false;
         } 
       },
       
        valuePrepareFunction: (data) => {
        return data.namesubject;
      },
      },
      IDTeacher:{
        title: 'Docente',
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
        filterFunction(cell?: any, search?: string): boolean {          
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
     
    }
  }
   a;
   objeto:Subject={};
  Area: any=[];
  areas:any=[];
  subjects:any=[];
  usuarios:any=[];
  cursos:any=[];
  grades1:any=[];
  supertoTable:Subject[]; 
  subjectstoTable:Subject[]; 
  nombreasignaturas:any=[];
  year: any=[]; 
  yearoption: any=[];
  constructor(private windowService: NbWindowService,private dialogService: NbDialogService,private service: SmartTableData, private subjectsService:SubjectsService,private router:Router) {
    this.subjectstoTable=new Array<Subject>();
    this.supertoTable=new Array<Subject>();
   }

  ngOnInit(): void {
    this.getAreas();
    this.getNameSubjects();
    this.getGrades();
    this.getYears();
    this.getUsers();
    this.getSubjects();
  }
  
  getSubjects(){
    this.subjectstoTable=[];
    this.subjectsService.getAsignaturas().subscribe( 
      res=>{
      this.subjects = this.prepareDatatoTable(res);
      console.log(this.subjects)
      },
      err =>console.error(err)
      );
      
  }
    funcion(){
      this.settings.columns.IDNameSubject.filter.config.list=[];
      this.nombreasignaturas.forEach(element => {
        if(element.IDArea.IDArea.toString()==this.searchArea)
        {
          this.settings.columns.IDNameSubject.filter.config.list.push({value:element.namesubject,title:element.namesubject})
          this.settings = Object.assign({}, this.settings);
        }
      });
      
      console.log(this.nombreasignaturas[0].IDArea,this.searchArea)
      
  }
  funcion1(){
    this.settings.columns.IDGrade.filter.config.list=[];
    this.cursos.forEach(element => {
      if(element.Year==this.searchAño)
      {
        this.settings.columns.IDGrade.filter.config.list.push({value:element.NameGrade,title:element.NameGrade})
        this.settings = Object.assign({}, this.settings);
      }
    });
        
}
  prepareDatatoTable(subjects:any):any{
    
    subjects.forEach((element,index) => {
        this.objeto=new Subject();
        this.objeto.IDGrade=element.IDGrade;
        this.objeto.IDNameSubject=element.IDNameSubject;
        this.objeto.IDArea=element.IDNameSubject.IDArea;
        this.objeto.IDTeacher=element.IDTeacher;
        this.objeto.Year=element.Year;
        this.objeto.IDSubject=element.IDSubject;
        this.subjectstoTable.push(this.objeto);
    });
    return this.subjectstoTable;
  }
 
  getUsers(){
    this.subjectsService.getUsuarios().subscribe( 
      res=>{
        this.usuarios =res;
        for(let u of this.usuarios){
          if(u.IDUserType.UserType=="Docente" && u.UserState=='1'){
          this.settings.columns.IDTeacher.editor.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
          this.settings.columns.IDTeacher.filter.config.list.push({value:u.IDUser,title:u.Name+" "+u.Lastname});
          this.settings = Object.assign({}, this.settings);
          }
        }
      }
      )
  }
  getGrades(){
    
    this.subjectsService.getCursos().subscribe(
      res=>{
        this.cursos =res;
    for(let u of this.cursos){
      if(this.grades1.includes(u.NameGrade)==false)
      { this.listaValcursos1.push({value:u.IDGrade,title:u.NameGrade});
        this.listaValcursos.push({value:u.IDGrade,title:u.NameGrade});
        this.settings.columns.IDGrade.filter.config.list.push({value:u.NameGrade,title:u.NameGrade});
        this.settings = Object.assign({}, this.settings);   
      }
      this.grades1.push(u.NameGrade);   
     
    }  
    }
    );
  }
    getYears(){
    
    this.subjectsService.getCursos().subscribe(
      res=>{
        this.cursos =res;
        this.settings.columns.Year.editor.config.list=[{value:"Select",title:"Select"}]
    for(let u of this.cursos){
       if(this.year.includes(u.Year)==false)
       {    
            this.settings.columns.Year.filter.config.list.push({value:u.Year,title:u.Year});
            this.settings.columns.Year.editor.config.list.push({value:u.Year,title:u.Year});
            this.settings = Object.assign({}, this.settings);
       }
      this.year.push(u.Year);
      this.yearoption.push({Year:u.Year,Grade:u.NameGrade,IDGrade:u.IDGrade});

    }  
    }
    );
  }
   
      
   
  getAreas(){
    this.subjectsService.getAreas().subscribe(
      res=>{
        this.areas =res;
        this.settings.columns.IDArea.editor.config.list=[{value:"Select",title:"Select"}]
    for(let u of this.areas){
      this.settings.columns.IDArea.editor.config.list.push({value:u.IDArea,title:u.Area});
      this.settings.columns.IDArea.filter.config.list.push({value:u.IDArea,title:u.Area});
      this.settings = Object.assign({}, this.settings);
    } 
    }
    );
  }
  getNameSubjects(){
    this.subjectsService.getNombreAsignaturas().subscribe(
      res=>{
        this.nombreasignaturas =res;
    for(let u of this.nombreasignaturas){
      this.listaValasignaturas1.push({value:u.IDNameSubject,title:u.namesubject});
      this.listaValasignaturas.push({value:u.IDNameSubject,title:u.namesubject});
      this.settings.columns.IDNameSubject.filter.config.list.push({value:u.namesubject,title:u.namesubject});
      this.settings = Object.assign({}, this.settings);
      
    }  
    }
    );
  }

  ngAfterViewInit(): void
  { 
    var year= new Date()
    this.smartTable.create.subscribe( (dataObject: any) => {
      console.log("probando",dataObject)
      var yaesta =false;
      this.dialogService.open(AgregarComponent1, {
        context: {
          myObject: dataObject.data,
          año: year.getFullYear()
        },
      })
      .onClose.subscribe(registro =>{
        this.subjects.forEach(element => {
          if(element.Year==registro.Year && element.IDGrade.IDGrade==registro.IDGrade && element.IDNameSubject.IDNameSubject==registro.IDNameSubject)
          {
            window.alert("La materia ya fue asignada.");
            yaesta=true;
            
          }
    });
    if(yaesta) {
}
else{
  this.subjectsService.saveAsignaturas(registro)
  .subscribe(
    res => {
      this.getSubjects();
      return;
    },
    err => console.error(err)
  )
}

      } );
      
    });
      
    this.smartTable.edit.subscribe( (dataObject: any) => {
      var yaesta =false;
      console.log(dataObject.data);
      this.dialogService.open(AgregarComponent1, {
        context: {
          myObject: dataObject.data,
        }
      })
      .onClose.subscribe(registro =>{
        var data =registro;
        this.subjects.forEach(element => {
          if(element.Year==data.Year && element.IDGrade.IDGrade==data.IDGrade && element.IDNameSubject.IDNameSubject==data.IDNameSubject)
          {
            window.alert("La materia ya fue asignada.");
            yaesta=true;
            
          }
    });
    if(yaesta) {
}
else{
  this.subjectsService.updateAsignaturas(dataObject.data.IDSubject,data)
.subscribe(
  res =>{
this.getSubjects();
  },
  err => console.error(err)
)
}
      })
    })
    
    
    this.smartTable.delete.subscribe( (dataObject: any) => {
      if (window.confirm('Are you sure you want to delete?')) {
        this.subjectsService.deleteAsignaturas(dataObject.data.IDSubject)
        .subscribe(
          res=>{
            console.log(res);
            this.getSubjects();
          },
          err=>console.error(err)
        )
      }
    });
    
  }
  
}
