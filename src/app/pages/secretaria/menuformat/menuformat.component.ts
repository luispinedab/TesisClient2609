import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoestudianteService } from 'app/services/infoestudiante.service';

@Component({
  selector: 'ngx-menuformat',
  templateUrl: './menuformat.component.html',
  styleUrls: ['./menuformat.component.scss']
})
export class MenuformatComponent implements OnInit {

  constructor(private infostudentservice:InfoestudianteService,private fb:FormBuilder,private router:Router) { }
  miFormulario: FormGroup = this.fb.group({
    Year: ['',[Validators.required]]
  })
  anios:any;
  ngOnInit(): void {
    this.infostudentservice.getYears().subscribe(res=>{
      this.anios=res;
    },err=>{
      console.error(err)
    })
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
    this.router.navigate(['/pages/secretaria/FotmatoEstudiantes'], { state: this.miFormulario.value });
  }
}
