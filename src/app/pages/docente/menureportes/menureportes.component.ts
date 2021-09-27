import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';
import { GradesService } from 'app/services/grades.service';
import { SubjectsService } from 'app/services/subjects.service';

@Component({
  selector: 'ngx-menureportes',
  templateUrl: './menureportes.component.html',
  styleUrls: ['./menureportes.component.scss']
})
export class MenureportesComponent implements OnInit {

  constructor(private router:Router,private subjectService:SubjectsService,private gradeService:GradesService,private fb:FormBuilder,private achievementsService:AchievementsService) { }
  miFormulario: FormGroup = this.fb.group({
    IDLevelGrade: ['',[Validators.required]],
    Periodo:['',[Validators.required]]
  })
  levelgrades:any=[];
  ngOnInit(): void {
    this.getinfo();
  }
  getinfo(){
    this.achievementsService.getNivelCursos().subscribe(res=>{
      this.levelgrades=res;
      console.log(this.levelgrades);
    });
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
    console.log(this.miFormulario.value)
    this.router.navigate(['/pages/docente/Reportes/boletin_nuevo'], { state: this.miFormulario.value });
    
  }
}
