import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators}  from '@angular/forms';
import {AspirantesService} from '../../../services/aspirantes.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  constructor(private fb:FormBuilder,private aspirantesservice:AspirantesService,private router:Router) { }
  miFormulario: FormGroup = this.fb.group({
    Nombres:['',[Validators.required]],
    Documento:['',[Validators.required]],
    Correo:['',[Validators.required]],
    Nickname:['',],
    Password:['',],
    FechaCreacion:['',],
    FechaModificacion:['',],
    UserState:['',],
    CheckMatricula:['',]
  })

  ngOnInit(): void {
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }
  guardar(){
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    else{
      if(window.confirm("¿Está seguro que desea crear el usuario?")){
        this.aspirantesservice.saveAspirante(this.miFormulario.value).subscribe(res=>{
          console.log(res);
          this.router.navigate(['pages/secretaria/succes']);
        },
        err=>console.error(err)
        )
      }
      
    }
  }

}
