import { Component, OnInit } from '@angular/core';
import {InfoestudianteService} from '../../../services/infoestudiante.service';
import {InfoEstudiante} from '../../../models/InfoEstudiante';
import {infoallestudiante} from '../../../models/infoallstudent';
import {ExperienciasEscolares} from '../../../models/ExperienciasEscolares';
import {Hermanos} from '../../../models/Hermanos';
import * as XLSX from 'xlsx'; 
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  settings = {
    actions: { 
      custom: [
        { name: 'ourCustomAction', title: '<i class="nb-paper-plane" title="Ver"></i>' }
    ],
    add:false,
    edit:false,
    delete:false,
    position:'right'
     },
    columns: {
      Nombres: {
        title: 'Nombres',
        type: 'string',
      },
      PrimerApellido: {
        title: 'Primer Apellido',
        type: 'string',
      },
      SegundoApellido: {
        title: 'Segundo Apellido',
        type: 'string',
      },
      TipoDocumento: {
        title: 'Tipo Documento',
        type: 'string',
      },
      Documento: {
        title: 'Documento',
        type: 'string',
      },
      DepartamentodeExpedicion: {
        title: 'Departamento Exp',
        type: 'string',
      },
      CiudaddeExpedicion: {
        title: 'Ciudad Exp',
        type: 'string',
      },
      DepartamentodeNacimiento: {
        title: 'Departamento Nac',
        type: 'string',
      },
      CiudaddeNacimiento: {
        title: 'Ciudad Nac',
        type: 'string',
      },
      FechadeNacimiento: {
        title: 'Fecha Nac',
        type: 'string',
      },
      Sexo: {
        title: 'Sexo',
        type: 'string',
      },
      Edad: {
        title: 'Edad',
        type: 'string',
      },
      RH: {
        title: 'RH',
        type: 'string',
      },
      Direccion: {
        title: 'Dirección',
        type: 'string',
      },
      Barrio: {
        title: 'Barrio',
        type: 'string',
      },
      Telefono: {
        title: 'Telefono',
        type: 'string',
      },
      Estrato: {
        title: 'Estrato',
        type: 'string',
      },
      Sisben: {
        title: 'Sisben',
        type: 'string',
      },
      GradoaIngresar: {
        title: 'Grado',
        type: 'string',
      },
      EPS: {
        title: 'EPS',
        type: 'string',
      },
      CajaCompensacion: {
        title: 'Caja Compensacion',
        type: 'string',
      },
    },
  };
data:any;
  constructor(private infoestudiante:InfoestudianteService, private router:Router) {
    this.data = this.router.getCurrentNavigation().extras.state;
    this.data = history.state;
   }
  imprimir: any[][]=[];
  info:InfoEstudiante[];
  infoallobjeto:infoallestudiante[];
  exobjeto:any=[];
  Herobjeto:any=[];
  ngOnInit(): void {
      this.infoestudiante.getInfoestudiantes_grade(this.data.IDLevelGrade,this.data.Year).subscribe(res=>{
        this.info=res as InfoEstudiante[];
      },err=>console.error(err))
    this.infoestudiante.getExperienciasEscolares().subscribe(res=>
      {
        this.exobjeto=res as ExperienciasEscolares[];
        console.log(res);
      }),
      err=>{console.error(err);}
      this.infoestudiante.getHermanos().subscribe(res=>
        {
          this.Herobjeto= res as Hermanos[];
          console.log(res);
        }),
        err=>{console.error(err);}
    
  }
  descargar(){
    var c=1,d=1,e=1;

      this.imprimir[0]=[['IDInfoEstudiante','Nombres','PrimerApellido','SegundoApellido','Documento','TipoDocumento','DepartamentodeExpedicion','CiudaddeExpedicion','DepartamentodeNacimiento','CiudaddeNacimiento','Sexo','Edad','RH','Direccion','Barrio','Telefono','Estrato','Sisben','GradoaIngresar','EPS','CajaCompensacion','FechadeNacimiento','vivecon','Quienes','NombrePadre','FechadeNacimientoP','IdentificacionPadre','ProfesionPadre','EmpresaPadre','CargoPadre','TelefonoCelularPadre','MailPadre','NombreMadre','FechadeNacimientoM','IdentificacionMadre','ProfesionMadre','EmpresaMadre','CargoMadre','TelefonoCelularMadre','MailMadre','Pregunta1','Pregunta2','Pregunta3','Pregunta31','Pregunta32']];
      this.imprimir[1]=[['IDExperienciasEscolares','NombredelColegio','DirecciondelColegio','TelefonodelColegio','AñosCursados','Estudiante','Documento']]
      this.imprimir[2]=[['IDHermanos','NombreHermano','EdadHermano','CursoHermano','Estudiante','Documento']]
        this.info.forEach(element => {
        this.imprimir[0][c]=[element.IDInfoEstudiante,element.Nombres,element.PrimerApellido,element.SegundoApellido,element.Documento,element.TipoDocumento,element.DepartamentodeExpedicion,element.CiudaddeExpedicion,element.DepartamentodeNacimiento,element.CiudaddeNacimiento,element.Sexo,element.Edad,element.RH,element.Direccion,element.Barrio,element.Telefono,element.Estrato,element.Sisben,element.GradoaIngresar,element.EPS,element.CajaCompensacion,element.FechadeNacimiento,element.vivecon,element.Quienes,element.NombrePadre,element.FechadeNacimientoP,element.IdentificacionPadre,element.ProfesionPadre,element.EmpresaPadre,element.CargoPadre,element.TelefonoCelularPadre,element.MailPadre,element.NombreMadre,element.FechadeNacimientoM,element.IdentificacionMadre,element.ProfesionMadre,element.EmpresaMadre,element.CargoMadre,element.TelefonoCelularMadre,element.MailMadre,element.Pregunta1,element.Pregunta2,element.Pregunta3,element.Pregunta31,element.Pregunta32]
        c++;
      });
      this.exobjeto.forEach(element => {
        this.imprimir[1][d]=[element.IDExperienciasEscolares,element.NombredelColegio,element.DirecciondelColegio,element.TelefonodelColegio,element.AñosCursados,element.IDInfoEstudiante.Nombres+' '+element.IDInfoEstudiante.PrimerApellido+' '+element.IDInfoEstudiante.SegundoApellido,element.IDInfoEstudiante.Documento]
        d++;
      });
      
      this.Herobjeto.forEach(element => {
        this.imprimir[2][e]=[element.IDHermanos,element.NombreHermano,element.EdadHermano,element.CursoHermano,element.IDInfoEstudiante.Nombres+' '+element.IDInfoEstudiante.PrimerApellido+' '+element.IDInfoEstudiante.SegundoApellido,element.IDInfoEstudiante.Documento];
        e++;
      });
      console.log(this.imprimir);
      this.descargarExcel('InfoEstudiante');
  }
  descargarExcel(nombre: string) {
    const sheetName = ["InfoEstudiante", "Experiencias Escolares", " Hermanos"];

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    for (var i = 0; i < sheetName.length; i++) {
      let ws = XLSX.utils.aoa_to_sheet(this.imprimir[i]);
      XLSX.utils.book_append_sheet(wb, ws, sheetName[i]);
    }
    
    const today = new Date();
    const date = '_' + today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate();

    XLSX.writeFile(wb, nombre + date + '.xlsx');
  }
  onCustom(event) {
    this.router.navigate(['pages/admision/admision-formulario/'+event.data.IDInfoEstudiante]);
  }

}
