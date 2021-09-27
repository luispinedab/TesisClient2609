import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { UploadService } from 'app/services/upload.service';

@Component({
  selector: 'ngx-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.scss']
})
export class FormatoComponent implements OnInit {
  public datosFormulario = new FormData();
  formate:any ={nombre:'Formulario de Matricula',check:false};
  loading = false;
  constructor(private upload:UploadService,private fb:FormBuilder,private toastrService:NbToastrService) { }
  miFormulario: FormGroup = this.fb.group({
    Archivo: ['',[Validators.required]]
   });
  ngOnInit(): void {
    this.validararchivo();
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  validararchivo(){
    
    try {
      var nombrearchivo=`Formulario_Matricula/Formato.pdf`;
    let referencia = this.upload.getArchivos(nombrearchivo);
    referencia.getDownloadURL().subscribe(res=>{
      this.formate.url=res;
      this.formate.check=true;
      console.log(res)
    });
      
    } catch (error) {
      console.log(error,"no hay archivos")
    }
  }
  cambioArchivo(event){
    this.datosFormulario.delete('archivo');
    this.datosFormulario.append('archivo', event.target.files[0], event.target.files[0].name)
  }
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }

    this.loading = true;
    var nombrearchivo;
    let archivo = this.datosFormulario.get('archivo');
    nombrearchivo=`Formulario_Matricula/Formato.pdf`;
    console.log(nombrearchivo,this.miFormulario.value);
    let referencia = this.upload.getArchivos(nombrearchivo);
    console.log("referencia",referencia)
    var eventoarchivo=this.upload.SubirArchivos(nombrearchivo,archivo);
    eventoarchivo.percentageChanges().subscribe(porcentaje=>{
      porcentaje = Math.round(porcentaje);
      if(porcentaje==100)
      { 
        this.loading =false;
        referencia.getDownloadURL().subscribe(res=>{
          this.toastrService.show('El Archivo se ha subido correctamente',`Enhorabuena`,{ status:'success' });
          this.validararchivo();
          console.log(res)
        });
      }
    })
  }

}
