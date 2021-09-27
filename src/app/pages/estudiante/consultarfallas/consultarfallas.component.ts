import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-consultarfallas',
  templateUrl: './consultarfallas.component.html',
  styleUrls: ['./consultarfallas.component.scss']
})
export class ConsultarfallasComponent implements OnInit {
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
    var a=[]
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
  var objeto={
    Periodo:this.miFormulario.value.Periodo,
    Grado:this.estudiante.GradoaIngresar,
    Estudiante:this.estudiante.IDInfoEstudiante
  }
  console.log(objeto)
  this.router.navigate(['/pages/docente/Fallas/tabla-ver'], { state: objeto });
  }


}
