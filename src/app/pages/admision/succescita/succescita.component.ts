import { Component, ComponentFactoryResolver, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Aspirantes } from 'app/models/Aspirtantes';
import { Documentos } from 'app/models/Documentos';
import { AspirantesService } from 'app/services/aspirantes.service';
import { CitasService } from 'app/services/citas.service';
import { DocumentosService } from 'app/services/documentos.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import { UploadService } from 'app/services/upload.service';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-succescita',
  templateUrl: './succescita.component.html',
  styleUrls: ['./succescita.component.scss']
})
export class SuccescitaComponent implements OnInit {
  documento:Documentos;
  formatoviejo:any={url:"",check:false,value:'FORMULARIO_MATRICULA',nombre:'FORMULARIO DE MATRICULA'};
  stepperIndex:any=0;
  finalizar:any=true;
  object:Aspirantes;
  loading = false;
  public datosFormulario = new FormData();
  estudiante:any;
  Nota:any;
  documentosviejos:any=[];
  data:any;
  listo:boolean = false;
  dt:any;
  avanzar:any;
  citas:any;
  aspir:any;
  formate:any={url:""};
  url:any;
  idaspirante:any
  URLPublica:any = '';
  cedula:any;
  documentos:any=[{url:"",check:false,value:'REGISTRO_CIVIL',nombre:'REGISTRO CIVIL'},{url:"",check:false,value:'CERTIFICADO_MEDICO',nombre:'CERTIFICADO MEDICO'},{url:"",check:false,value:'HOJA_DE_VIDA_SENCILLA',nombre:'HOJA DE VIDA SENCILLA'},{url:"",check:false,value:'CERTIFICADO_LABORAL_O _DE_INGRESOS',nombre:'CERTIFICADO LABORAL O DE INGRESOS'},{url:"",check:false,value:'FOTOCOPIA_DEL_CARNET_DE_LA_EPS',nombre:'FOTOCOPIA DEL CARNET DE LA EPS'},{url:"",check:false,value:'ULTIMO_BOLETIN_Y_PAZ_Y_SALVO_DEL_COLEGIO_ANTERIOR',nombre:'ULTIMO BOLETIN Y PAZ Y SALVO DEL COLEGIO ANTERIOR'},{url:"",check:false,value:'BOLETINES_FINALES_DESDE_QUINTO_GRADO',nombre:'PARA LOS ALUMNOS DE BACHILLERATO BOLETINES FINALES DESDE QUINTO GRADO'},{url:"",check:false,value:'RETIRO_DEL_SIMAT',nombre:'RETIRO DEL SIMAT'}];
  constructor(private aspiranteservice:AspirantesService,private dialogService: NbDialogService,private toastrService:NbToastrService,private citasservice:CitasService,private documentoservice:DocumentosService,private upload:UploadService,private router:Router,private infostudentservice:InfoestudianteService, private fb:FormBuilder) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }
   miFormulario: FormGroup = this.fb.group({
    Tipo: ['',[Validators.required]],
    Archivo: ['',[Validators.required]]
   });
  ngOnInit(): void {
    
    var Token = localStorage.getItem('usuario');
    var tokenbyload:any = decode(Token);
    this.idaspirante=tokenbyload.idAspirante;
    this.getinfo(tokenbyload);
  }
  getinfo(tokenbyload:any){
    this.aspiranteservice.getAspirante(this.idaspirante).subscribe(res=>{
      this.aspir=res;
      console.log(this.aspir);
      if(this.aspir.CheckMatricula==1)
      {
        this.avanzar=false;
      }
      else if(this.aspir.CheckMatricula==0)
      {
        this.avanzar=true;
      }
    })
    try {
      var nombrearchivo=`Formulario_Matricula/Formato.pdf`;
    let referencia = this.upload.getArchivos(nombrearchivo);
    referencia.getDownloadURL().subscribe(res=>{
      this.formate.url=res;
      console.log(res)
    });
      
    } catch (error) {
      console.log(error,"no hay archivos")
    } 
    // this.citasservice.getCitas().subscribe(res=>{
    //   this.citas=res;
    //   this.citas.forEach(element => {
    //     if(element.IDInfoEstudiante.IDAspirante.IDAspirantes==tokenbyload.idAspirante)
    //      {
    //        this.data=element.Fecha;
    //        this.dt = new Date(this.data);
    //      }
    //   });
    // });
    this.citasservice.getCitabyAspirante(tokenbyload.idAspirante).subscribe(res=>{
      this.citas=res;
      if(this.citas.length!=0)
      { console.log("aquies",this.citas)
        this.data=this.citas[0].Fecha;
        this.dt = new Date(this.data);
      }
    })
      this.documentosviejos=[];
      this.infostudentservice.getInfoEstudiantebyaspirante(tokenbyload.idAspirante).subscribe(res=>{
        this.estudiante=res;
        this.validarDocumentos(this.estudiante.IDInfoEstudiante)
        console.log(this.documentosviejos);
        this.Nota=this.estudiante.Nota;
        this.cedula=this.estudiante.Documento;
        console.log(this.estudiante)
    })
  }
  validarDocumentos(idest:any){
    this.documentosviejos=[];
    this.documentos.forEach(element => {
      this.documentoservice.getDocumentobyID(element.value,idest).subscribe(res=>{
        this.url=res;
        if(res!=null)
        { var doc ={
          "Tipo":element.value,
           "ID":this.url.IDDocumento,
           "Ruta":this.url.Ruta,
           "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
          }
          this.documentosviejos.push(doc)
          element.check=true;
          element.url=this.url.Ruta;
          this.listo=true;
          console.log("ruta",element.url)
        }
      },err=>console.error(err))
    });
    var actual= new Date();
    if(actual.getMonth()==11)
    { 
      this.documentoservice.getDocumentobyyear(this.formatoviejo.value,idest,actual.getFullYear()+1).subscribe(res=>{
        console.log(res)
        this.url=res[0];
        if(res[0]!=null)
      { 
        this.finalizar=false;
        var doc ={
        "Tipo":this.formatoviejo.value,
         "ID":this.url.IDDocumento,
         "Ruta":this.url.Ruta,
         "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
        }
          this.documentosviejos.push(doc)
          this.formatoviejo.check=true;
          this.formatoviejo.url=this.url.Ruta;
          this.listo=true;
      }
      })
    }
    else{
      this.documentoservice.getDocumentobyyear(this.formatoviejo.value,idest,actual.getFullYear()).subscribe(res=>{
        console.log(res)
        this.url=res[0];
        if(res[0]!=null)
      { this.finalizar=false;
        var doc ={
        "Tipo":this.formatoviejo.value,
         "ID":this.url.IDDocumento,
         "Ruta":this.url.Ruta,
         "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
        }
          this.documentosviejos.push(doc)
          this.formatoviejo.check=true;
          this.formatoviejo.url=this.url.Ruta;
          this.listo=true;
      }
      })
    }
    // this.documentoservice.getDocumentobyID(this.formatoviejo.value,idest).subscribe(res=>{
    //   this.url=res;
    //     if(res!=null)
    //     { this.finalizar=false;
    //       var doc ={
    //       "Tipo":this.formatoviejo.value,
    //        "ID":this.url.IDDocumento,
    //        "Ruta":this.url.Ruta,
    //        "IDInfoEstudiante":this.url.IDInfoEstudiante.IDInfoEstudiante
    //       }
    //       this.documentosviejos.push(doc)
    //       this.formatoviejo.check=true;
    //       this.formatoviejo.url=this.url.Ruta;
    //       this.listo=true;
    //       console.log("ruta",this.formatoviejo.url)
    //     }
    // })
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    var documento=new Documentos;
    this.loading = true;
    var nombrearchivo;
    let archivo = this.datosFormulario.get('archivo');
    nombrearchivo=`${this.miFormulario.value.Tipo}/${this.cedula}_${this.miFormulario.value.Tipo}.pdf`;
    console.log(nombrearchivo,this.miFormulario.value);
    let referencia = this.upload.getArchivos(nombrearchivo);
    console.log("referencia",referencia)
    var eventoarchivo=this.upload.SubirArchivos(nombrearchivo,archivo);
    eventoarchivo.percentageChanges().subscribe(porcentaje=>{
      porcentaje = Math.round(porcentaje);
      if(porcentaje==100)
      { 
        this.loading =false;
        this.toastrService.show('El Archivo se ha subido correctamente',`ENHORABUENA`,{ status:'success' });
        referencia.getDownloadURL().subscribe(res=>{
          console.log(res);
          documento.IDInfoEstudiante= this.estudiante.IDInfoEstudiante;
         documento.Tipo=this.miFormulario.value.Tipo;
          documento.Ruta=res;
          var encontro= false;
          console.log(this.documentosviejos)
          this.documentosviejos.forEach((docviejo,index) => {
            console.log(index,this.documentosviejos.length)
            if(documento.Tipo==docviejo.Tipo)
            {
              encontro = true;
              this.documentoservice.actualizarDocumentos(docviejo.ID,documento).subscribe(res=>{
                console.log(res);
                this.validarDocumentos(this.estudiante.IDInfoEstudiante);
              },err=>console.error(err))
            }
            if(!encontro&&(index==this.documentosviejos.length-1))
            { 
              this.documentoservice.saveDocumentos(documento).subscribe(res=>{
                console.log(res);
                this.validarDocumentos(this.estudiante.IDInfoEstudiante);
              },err=>console.error(err))
            }
          });
          if(this.documentosviejos.length==0)
          {
            this.documentoservice.saveDocumentos(documento).subscribe(res=>{
              console.log(res);
              this.validarDocumentos(this.estudiante.IDInfoEstudiante);
            },err=>console.error(err))
          }
        }
          );
        
      }
    })
    referencia.getDownloadURL().subscribe((URL)=>{
      this.URLPublica=URL;
      console.log(this.URLPublica)
    });
  }
  guardar1(){
    this.miFormulario.controls['Tipo'].setValue('FORMULARIO_MATRICULA')
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    var documento=new Documentos;
    var fech = new Date();
    var yearFormato;
    console.log(fech.getMonth())
    if(fech.getMonth()==11)
    {
      yearFormato=fech.getFullYear()+1;
    }
    else
    {
      console.log(fech.getMonth())
      yearFormato =fech.getFullYear();
    }
    this.loading = true;
    var nombrearchivo;
    let archivo = this.datosFormulario.get('archivo');
    nombrearchivo=`${this.miFormulario.value.Tipo}/${yearFormato}/${this.cedula}_${this.miFormulario.value.Tipo}.pdf`;
    console.log(nombrearchivo,this.miFormulario.value);
    let referencia = this.upload.getArchivos(nombrearchivo);
    console.log("referencia",referencia)
    var eventoarchivo=this.upload.SubirArchivos(nombrearchivo,archivo);
    eventoarchivo.percentageChanges().subscribe(porcentaje=>{
      porcentaje = Math.round(porcentaje);
      if(porcentaje==100)
      { 
        this.loading =false;
        this.toastrService.show('El Archivo se ha subido correctamente',`ENHORABUENA`,{ status:'success' });
        referencia.getDownloadURL().subscribe(res=>{
          console.log(res);
          documento.IDInfoEstudiante= this.estudiante.IDInfoEstudiante;
         documento.Tipo=this.miFormulario.value.Tipo;
          documento.Ruta=res;
          var encontro= false;
          console.log(this.documentosviejos)
          this.documentosviejos.forEach((docviejo,index) => {
            console.log(index,this.documentosviejos.length)
            if(documento.Tipo==docviejo.Tipo)
            {
              encontro = true;
              this.documentoservice.actualizarDocumentos(docviejo.ID,documento).subscribe(res=>{
                console.log(res);
                this.validarDocumentos(this.estudiante.IDInfoEstudiante);
              },err=>console.error(err))
            }
            if(!encontro&&(index==this.documentosviejos.length-1))
            { 
              this.documentoservice.saveDocumentos(documento).subscribe(res=>{
                console.log(res);
                this.validarDocumentos(this.estudiante.IDInfoEstudiante);
              },err=>console.error(err))
            }
          });
          if(this.documentosviejos.length==0)
          {
            this.documentoservice.saveDocumentos(documento).subscribe(res=>{
              console.log(res);
              this.validarDocumentos(this.estudiante.IDInfoEstudiante);
            },err=>console.error(err))
          }
        }
          );
        
      }
    })
    referencia.getDownloadURL().subscribe((URL)=>{
      this.URLPublica=URL;
      console.log(this.URLPublica)
    });
  }
  Validar(dialog: TemplateRef<any>){
    if(this.avanzar)
    { 
      this.dialogService.open(dialog);
    }
  }
  cambioArchivo(event){
    this.datosFormulario.delete('archivo');
    this.datosFormulario.append('archivo', event.target.files[0], event.target.files[0].name)
  }
  finish(){
    var objetonew = new Aspirantes();
    objetonew.UserState=1;
    this.aspiranteservice.updatestateAspirante(this.idaspirante,objetonew).subscribe(res=>{
      console.log(res)
      this.router.navigate(['/']);
    })
  }
}
