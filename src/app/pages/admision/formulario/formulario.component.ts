import { Component, OnInit} from '@angular/core';
import {ExperienciasEscolares} from '../../../models/ExperienciasEscolares';
import {Hermanos} from '../../../models/Hermanos';
import {infoallestudiante} from '../../../models/infoallstudent';
import {InfoEstudiante} from '../../../models/InfoEstudiante';
import {CitasService} from '../../../services/citas.service';
import {GradesService} from '../../../services/grades.service';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from './dialog-name-prompt/dialog-name-prompt.component';
import { FormExperienciasComponent } from './FormExperiencias/dialog-name-prompt.component';
import {DepartamentosService} from '../../../services/departamentos.service';
import {InfoestudianteService} from '../../../services/infoestudiante.service';
import {Router} from '@angular/router';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit{
  checks: any=[
    {description: 'Padre', value: 'Padre'},
    {description: 'Madre', value: 'Madre'},
    {description: 'Hermanos', value: 'Hermanos'},
    {description: 'Otros', value: 'Otros'}
  ]
  citas:any=[];
  fieldsetDisabled:boolean;
  experiencias:ExperienciasEscolares[]; 
  hermanos:Hermanos[]; 
  info:any=[];
  exnew:any=[];
  hernew:any=[];
  infoallobjeto:infoallestudiante;
  exobjeto:ExperienciasEscolares;
  Herobjeto:Hermanos;
  idlastinfo:any;
  quienes:boolean=true;
  p3:boolean=true; 
  grades:any=[];
  lugares:any=[];
  ciudades: any=[];
  arreglo: any = [];
  names: any[] = [];
  experiences: any[] = []; 
  miFormulario: FormGroup = this.fb.group({
    Nombres: ['',[Validators.required]],
    PrimerApellido:['',[Validators.required]],
    SegundoApellido:['',[Validators.required]],
    Documento:['',[Validators.required]],
    TipoDocumento:['',[Validators.required]],
    DepartamentodeExpedicion:['',[Validators.required]],
    CiudaddeExpedicion:['',[Validators.required]],
    DepartamentodeNacimiento:['',[Validators.required]],
    CiudaddeNacimiento:['',[Validators.required]],
    Sexo:['',[Validators.required]],
    Edad:['',[Validators.required]],
    RH:['',[Validators.required]],
    Direccion:['',[Validators.required]],
    Barrio:['',[Validators.required]],
    Telefono:['',[Validators.required]],
    Estrato:['',[Validators.required]],
    Sisben:['',[Validators.required]],
    GradoaIngresar:['',[Validators.required]],
    EPS:['',[Validators.required]],
    CajaCompensacion:['',[Validators.required]],
    FechadeNacimiento:['',[Validators.required]],
    vivecon:['',[Validators.required]],
    Quienes:['',],
    NombrePadre:['',[Validators.required]],
    FechadeNacimientoP:['',[Validators.required]],
    IdentificacionPadre:['',[Validators.required]],
    ProfesionPadre:['',[Validators.required]],
    EmpresaPadre:['',[Validators.required]],
    CargoPadre:['',[Validators.required]],
    TelefonoCelularPadre:['',[Validators.required]],
    MailPadre:['',[Validators.required]],
    NombreMadre:['',[Validators.required]],
    FechadeNacimientoM:['',[Validators.required]],
    IdentificacionMadre:['',[Validators.required]],
    ProfesionMadre:['',[Validators.required]],
    EmpresaMadre:['',[Validators.required]],
    CargoMadre:['',[Validators.required]],
    TelefonoCelularMadre:['',[Validators.required]],
    MailMadre:['',[Validators.required]],
    Pregunta1:['',[Validators.required]],
    Pregunta2:['',[Validators.required]],
    Pregunta3:['',[Validators.required]],
    Pregunta31:['',],
    Pregunta32:['',],
    FechadeCreacion:['',],
    FechadeModificacion:['',],
    IDAspirante:['',],
    Nota:[0,]

  })
  ngOnInit():void{
    var Token = localStorage.getItem('usuario');
    var tokenbyload:any = decode(Token);
    console.log("token:",tokenbyload);
    var tipousuario = tokenbyload.tipo;
    this.miFormulario.controls.vivecon.setValue([]);
    this.getCursos();
    this.departamentoService.getDepartamentos().subscribe(
      res=>{
        this.arreglo=res;
          for(let u of this.arreglo){
            this.departamentos.push(u.Departament);
           }  
           console.log(this.departamentos);
      },
      err =>console.error(err)
    );
    this.departamentoService.getCiudades().subscribe(
    res=>{
          this.lugares=res;
          this.lugares.forEach(element => {
            this.ciudades.push(element.City);
          });
          
    }
    )
    this.miFormulario.get('vivecon')?.valueChanges.subscribe(
      res=>{
        
        this.quienes=true;
          if(res.includes('Otros'))
          {
            this.quienes=false;
          }
      })
    
       
    this.miFormulario.get('DepartamentodeExpedicion')?.valueChanges.subscribe(
      Departamento=>{
      this.miFormulario.get('CiudaddeExpedicion')?.reset('');
        this.ciudades=[];
        this.arreglo.forEach(element => {
            if(element.Departament==Departamento){
              var IDdepa=element.IDDepartament;
                for(let u of this.lugares){
                        if(IDdepa==u.IDDepartament.IDDepartament){
                          this.ciudades.push(u.City);
                        }
                    }  
        }
        });
      }
    )
    this.miFormulario.get('DepartamentodeNacimiento')?.valueChanges.subscribe(
      
      Departamento=>{
          this.miFormulario.get('CiudaddeNacimiento')?.reset('');
        this.ciudades=[];
        this.arreglo.forEach(element => {
            if(element.Departament==Departamento){
              var IDdepa=element.IDDepartament;
                for(let u of this.lugares){
                        if(IDdepa==u.IDDepartament.IDDepartament){
                          this.ciudades.push(u.City);
                        }
                    }  
        }
        });
        }
    )
    if(tipousuario=='Secretaria')
    {
      
      this.fieldsetDisabled=true;
      var ruta = this.router.url.split('/');
      this.infoestudianteService.getExperienciaEscolar(ruta[4]).subscribe(res=>{
        this.exnew=res;
        this.exnew.forEach(element => {
      var estrings:string[]=[];
       estrings.push(element.NombredelColegio,element.DirecciondelColegio,element.TelefonodelColegio,element.AñosCursados);
       this.experiences.push(estrings);
    });
    
      },
      err=>console.error(err))
      this.infoestudianteService.getHermano(ruta[4]).subscribe(res=>{
        this.hernew=res;
        this.hernew.forEach(element => {
      var estrings:string[]=[];
       estrings.push(element.NombreHermano,element.EdadHermano,element.CursoHermano);
       this.names.push(estrings);
       console.log("hermanos",this.names);
    });
    
        
      },
      err=>console.error(err))

   

      this.infoestudianteService.getInfoEstudiante(ruta[4]).subscribe(res=>{
        this.info=res;
          this.miFormulario.patchValue({'IDInfoEstudiante':this.info.IDInfoEstudiante})
          this.miFormulario.patchValue({'Nombres':this.info.Nombres})
          this.miFormulario.patchValue({'PrimerApellido':this.info.PrimerApellido})
          this.miFormulario.patchValue({'SegundoApellido':this.info.SegundoApellido})
          this.miFormulario.patchValue({'Documento':this.info.Documento})
          this.miFormulario.patchValue({'TipoDocumento':this.info.TipoDocumento})
          this.miFormulario.patchValue({'DepartamentodeExpedicion':this.info.DepartamentodeExpedicion})
          this.miFormulario.patchValue({'CiudaddeExpedicion':this.info.CiudaddeExpedicion})
          this.miFormulario.patchValue({'DepartamentodeNacimiento':this.info.DepartamentodeNacimiento})
          this.miFormulario.patchValue({'CiudaddeNacimiento':this.info.CiudaddeNacimiento})
          this.miFormulario.patchValue({'Sexo':this.info.Sexo})
          this.miFormulario.patchValue({'Edad':this.info.Edad})
          this.miFormulario.patchValue({'RH':this.info.RH})
          this.miFormulario.patchValue({'Direccion':this.info.Direccion})
          this.miFormulario.patchValue({'Barrio':this.info.Barrio})
          this.miFormulario.patchValue({'Telefono':this.info.Telefono})
          this.miFormulario.patchValue({'Estrato':this.info.Estrato})
          this.miFormulario.patchValue({'Sisben':this.info.Sisben})
          this.miFormulario.patchValue({'GradoaIngresar':this.info.GradoaIngresar})
          this.miFormulario.patchValue({'EPS':this.info.EPS})
          this.miFormulario.patchValue({'CajaCompensacion':this.info.CajaCompensacion})
          this.miFormulario.patchValue({'FechadeNacimiento':this.info.FechadeNacimiento})
          this.miFormulario.patchValue({'Quienes':this.info.Quienes})
          this.miFormulario.patchValue({'NombrePadre':this.info.NombrePadre})
          this.miFormulario.patchValue({'FechadeNacimientoP':this.info.FechadeNacimientoP})
          this.miFormulario.patchValue({'IdentificacionPadre':this.info.IdentificacionPadre})
          this.miFormulario.patchValue({'ProfesionPadre':this.info.ProfesionPadre})
          this.miFormulario.patchValue({'EmpresaPadre':this.info.EmpresaPadre})
          this.miFormulario.patchValue({'CargoPadre':this.info.CargoPadre})
          this.miFormulario.patchValue({'TelefonoCelularPadre':this.info.TelefonoCelularPadre})
          this.miFormulario.patchValue({'MailPadre':this.info.MailPadre})
          this.miFormulario.patchValue({'NombreMadre':this.info.NombreMadre})
          this.miFormulario.patchValue({'FechadeNacimientoM':this.info.FechadeNacimientoM})
          this.miFormulario.patchValue({'IdentificacionMadre':this.info.IdentificacionMadre})
          this.miFormulario.patchValue({'ProfesionMadre':this.info.ProfesionMadre})
          this.miFormulario.patchValue({'EmpresaMadre':this.info.EmpresaMadre})
          this.miFormulario.patchValue({'CargoMadre':this.info.CargoMadre})
          this.miFormulario.patchValue({'TelefonoCelularMadre':this.info.TelefonoCelularMadre})
          this.miFormulario.patchValue({'MailMadre':this.info.MailMadre})
          this.miFormulario.patchValue({'Pregunta1':this.info.Pregunta1})
          this.miFormulario.patchValue({'Pregunta2':this.info.Pregunta2})
          this.miFormulario.patchValue({'Pregunta3':this.info.Pregunta3})
          this.miFormulario.patchValue({'Pregunta31':this.info.Pregunta31})
          this.miFormulario.patchValue({'Pregunta32':this.info.Pregunta32})
          var esplit = this.info.vivecon.split(',');
          this.miFormulario.controls.vivecon.setValue(esplit);
         console.log("aquies",this.miFormulario.value);
      },
      err=>console.error(err))
    }
    else{
      this.miFormulario.patchValue({'IDAspirante':tokenbyload.idAspirante})
      this.citasservice.getCitabyAspirante(tokenbyload.idAspirante).subscribe(res=>{
        this.citas=res;
        if(this.citas.length!=0)
        {
          this.router.navigate(['pages/admision/success'],{state:{cita:this.citas.Fecha} });
        }
      })
      // this.citasservice.getCitas().subscribe(res=>{
      //   this.citas=res;
      //   this.citas.forEach(element => {
      //     if(element.IDInfoEstudiante.IDAspirante.IDAspirantes==tokenbyload.idAspirante)
      //      {
      //        this.router.navigate(['pages/admision/success'],{state:{cita:element.Fecha} });
      //      }
      //   });
      // })
     // console.log(this.miFormulario.value);
    }
    
  }
  departamentos:string[]=[];
  constructor(private dialogService: NbDialogService,private fb:FormBuilder,private departamentoService:DepartamentosService,private gradesService:GradesService,private infoestudianteService:InfoestudianteService, private router:Router,private citasservice:CitasService) {
    this.experiencias=new Array<ExperienciasEscolares>();
    this.hermanos=new Array<Hermanos>();
   }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
 
  asignar(){
    this.exnew.forEach(element => {
      this.experiences.push(element);
    });
  }
  getCursos(){
    this.gradesService.getNivelCursos().subscribe(
      res=>{
        var cursos1;
        cursos1 =res;
        cursos1.forEach(element => {
          this.grades.push(element.levelgrade);
        });
    })
  }
  open3() {
    this.dialogService.open(DialogNamePromptComponent)
      .onClose.subscribe(name => name && this.names.push(name));
      console.log("comoqueda",this.names)
  }
  reiniciarhermanos(){
    this.names=[];
  }
  reiniciarexperiencias()
  {
    this.experiences=[];
  }
  formexperiencias()
  {
    this.dialogService.open(FormExperienciasComponent)
      .onClose.subscribe(experience => experience && this.experiences.push(experience));
  }
  submitinfoestudiante(){
    this.infoallobjeto=new infoallestudiante();
    this.infoallobjeto.infoEstudiante=this.miFormulario.value;
    if(this.experiences.length==0 && this.names.length==0)
          {
            console.log(this.infoallobjeto);
            this.infoestudianteService.saveInfoEstudiante(this.infoallobjeto)
            .subscribe(
              res =>{
                var a= res as any;
                console.log(a.IDInfoEstudiante);
                this.callCalendar(a.IDInfoEstudiante);
              },
              err => console.error(err)
            )
            return;
          }
          else{
            if(this.experiences.length!=0){
            this.experiences.forEach(element => {
              this.exobjeto=new ExperienciasEscolares();
              this.exobjeto.NombredelColegio=element[0];
              this.exobjeto.DirecciondelColegio=element[1];
              this.exobjeto.TelefonodelColegio=element[2];
              this.exobjeto.AñosCursados=element[3];
              this.exobjeto.IDInfoEstudiante=0;
              this.experiencias.push(this.exobjeto);
            });            
            this.infoallobjeto.experienciasEscolares=this.experiencias;
          }
            if(this.names.length!=0){
              this.names.forEach(element => {
                this.Herobjeto=new Hermanos();
                this.Herobjeto.NombreHermano=element[0];
                this.Herobjeto.EdadHermano=element[1];
                this.Herobjeto.CursoHermano=element[2];
                this.Herobjeto.IDInfoEstudiante=0;
                this.hermanos.push(this.Herobjeto);
              });
              this.infoallobjeto.hermanos=this.hermanos;
            }
          }
    console.log(this.infoallobjeto);
    this.infoestudianteService.saveInfoEstudiante(this.infoallobjeto)
    .subscribe(
      res  =>{
        var a= res as any;
        console.log(a.IDInfoEstudiante);
        this.callCalendar(a.IDInfoEstudiante);
      },
      err => console.error(err)
    )
  }
  callCalendar(IDinfo:any){
    this.router.navigate(['pages/admision/admision-citas/'+IDinfo]);
  }
  
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    this.submitinfoestudiante();
    
  }
  getvalues(){
    console.log(this.experiences);
  }

}
