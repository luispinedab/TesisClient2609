import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';
import { InfoestudianteService } from 'app/services/infoestudiante.service';

@Component({
  selector: 'ngx-menuinfo',
  templateUrl: './menuinfo.component.html',
  styleUrls: ['./menuinfo.component.scss']
})
export class MenuinfoComponent implements OnInit {

  anios:any=[];
  levelgrades:any=[];
  constructor(private infostudentservice:InfoestudianteService,private achievementsService:AchievementsService,private fb:FormBuilder,private router:Router) { }
  miFormulario: FormGroup = this.fb.group({
    Year: ['',[Validators.required]],
    IDLevelGrade: ['',[Validators.required]],
  })
  ngOnInit(): void {
    this.infostudentservice.getYears().subscribe(res=>{
      this.anios=res;
    },err=>{
      console.error(err)
    })
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      console.log(this.levelgrades);
    },
    err=>console.error(err)
    )
  }

  campoEsValido(campo:string){
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
    
  }

  guardar(){
    console.log(this.miFormulario.value);
    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      alert("Faltan campos por llenar");
      return;
    }
    this.router.navigate(['/pages/secretaria/descargarinfo/tabla'], { state: this.miFormulario.value });
  }
}
