import { Component, OnInit } from '@angular/core';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-consultarnotas',
  templateUrl: './consultarnotas.component.html',
  styleUrls: ['./consultarnotas.component.scss']
})
export class ConsultarnotasComponent implements OnInit {
  estudiante:any;
  constructor(private router:Router,private fb:FormBuilder,private infostudentservice:InfoestudianteService) { }
  miFormulario: FormGroup = this.fb.group({
    Periodo:['',[Validators.required]]
  })

  ngOnInit(): void {
  var Token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(Token);
  console.log("token:",tokenbyload);
  this.infostudentservice.getInfoEstudiantebyaspirante(tokenbyload.idAspirante).subscribe(res=>{
      this.estudiante=res;
      console.log(this.estudiante)
  })
  }
  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }
  guardar(){
    var hoy =new Date;
    var año= hoy.getFullYear();
    var a=[]
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
  var objeto={
    Periodo:this.miFormulario.value.Periodo,
    Grado:this.estudiante.GradoaIngresar,
    Año:año,
    IDInfoEstudiante:this.estudiante.IDInfoEstudiante
  }
  console.log(objeto)
  this.router.navigate(['/pages/estudiante/Consultarnotas/tabla'], { state: objeto });
  }

}
