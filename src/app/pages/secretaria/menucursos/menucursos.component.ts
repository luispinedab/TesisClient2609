import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';


@Component({
  selector: 'ngx-menucursos',
  templateUrl: './menucursos.component.html',
  styleUrls: ['./menucursos.component.scss']
})
export class MenucursosComponent implements OnInit {

  levelgrades:any=[];
  constructor(private achievementsService:AchievementsService,private fb:FormBuilder,private router:Router) { }
  miFormulario: FormGroup = this.fb.group({
    IDLevelGrade: ['',[Validators.required]],
  })
  ngOnInit(): void {
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
    this.router.navigate(['/pages/secretaria/asignarcursos/tabla'], { state: this.miFormulario.value });
  }

}
