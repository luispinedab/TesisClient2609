import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentosService } from 'app/services/documentos.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';

@Component({
  selector: 'ngx-verdocs',
  templateUrl: './verdocs.component.html',
  styleUrls: ['./verdocs.component.scss']
})
export class VerdocsComponent implements OnInit {
  documentos:any=[{url:"",check:false,value:'REGISTRO_CIVIL',nombre:'REGISTRO CIVIL'},{url:"",check:false,value:'CERTIFICADO_MEDICO',nombre:'CERTIFICADO MEDICO'},{url:"",check:false,value:'HOJA_DE_VIDA_SENCILLA',nombre:'HOJA DE VIDA SENCILLA'},{url:"",check:false,value:'CERTIFICADO_LABORAL_O _DE_INGRESOS',nombre:'CERTIFICADO LABORAL O DE INGRESOS'},{url:"",check:false,value:'FOTOCOPIA_DEL_CARNET_DE_LA_EPS',nombre:'FOTOCOPIA DEL CARNET DE LA EPS'},{url:"",check:false,value:'ULTIMO_BOLETIN_Y_PAZ_Y_SALVO_DEL_COLEGIO_ANTERIOR',nombre:'ULTIMO BOLETIN Y PAZ Y SALVO DEL COLEGIO ANTERIOR'},{url:"",check:false,value:'BOLETINES_FINALES_DESDE_QUINTO_GRADO',nombre:'PARA LOS ALUMNOS DE BACHILLERATO BOLETINES FINALES DESDE QUINTO GRADO'},{url:"",check:false,value:'RETIRO_DEL_SIMAT',nombre:'RETIRO DEL SIMAT'},{url:"",check:false,value:'FORMULARIO_MATRICULA',nombre:'FORMULARIO MATRICULA'}];
  documentosviejos:any=[];
  url:any;
  ruta:any;
  level:any;
  año:any;
  estudiante:any;
  nombre:any;
  constructor(private infoservice:InfoestudianteService,private documentoservice:DocumentosService,private router:Router) { }

  ngOnInit(): void {
    this.ruta = this.router.url.split('/');
    this.level=this.ruta[4].split('&')[0];
    this.año=this.ruta[4].split('&')[1];
    this.getinfo(this.level);
    this.validarDocumentos(this.level);
  }
  getinfo(id:any){
      this.infoservice.getInfoEstudiante(id).subscribe(res=>{
        this.estudiante=res;
        console.log(this.estudiante)
        this.nombre=' '+this.estudiante.Nombres+' '+this.estudiante.PrimerApellido+' '+this.estudiante.SegundoApellido;
      },err=>console.error(err))
  }
  validarDocumentos(idest:any){
    this.documentosviejos=[];
    console.log("length",this.documentos.length)
    this.documentos.forEach((element,indexdoc) => {
      this.documentoservice.getDocumentobyID(element.value,idest).subscribe(res=>{
        this.url=res;
        if(res!=null && indexdoc!=this.documentos.length-1)
        { var doc ={
          "Tipo":element.value,
           "ID":this.url.IDDocumento,
           "Ruta":this.url.Ruta,
           "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
          }
          this.documentosviejos.push(doc)
          element.check=true;
          element.url=this.url.Ruta;
          console.log("ruta",element.url)
        }
      },err=>console.error(err))
       if(indexdoc==this.documentos.length-1)
      {
        var fech = new Date();
        var yearFormato;
          if(fech.getMonth()==11)
          {
            yearFormato=fech.getFullYear()+1;
          }
          else
          {
            console.log(fech.getMonth())
            yearFormato =fech.getFullYear();
          }
        this.documentoservice.getDocumentobyyear(element.value,idest,this.año).subscribe(res=>{
          console.log(res)
          this.url=res[0];
          if(res[0]!=null)
        { var doc ={
          "Tipo":element.value,
           "ID":this.url.IDDocumento,
           "Ruta":this.url.Ruta,
           "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
          }
          this.documentosviejos.push(doc)
          element.check=true;
          element.url=this.url.Ruta;
          console.log("ruta",element.url)
        }
        })
      }
    });
  }

}
