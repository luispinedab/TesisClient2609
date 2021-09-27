import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AchievementsService} from '../../../services/achievements.service';
@Component({
  selector: 'ngx-tablaconsultarnotas',
  templateUrl: './tablaconsultarnotas.component.html',
  styleUrls: ['./tablaconsultarnotas.component.scss']
})
export class TablaconsultarnotasComponent implements OnInit {
  settings = {
    actions: {
    add:false,
    edit:false,
    delete:false,
     },
    columns: {
      IDSubject: {
        title: 'Asignatura',
        type: 'string',
        width:'75%',
        filter: false
      },
      Nota: {
        title: 'Nota',
        type: 'number',
        width:'25%',
        filter: false
      }
    },
  };
  
notas:any;
data:any;
periodo:any;
  constructor(private router:Router,private achievementService:AchievementsService) { }

  ngOnInit(): void {
    this.data = history.state;
    console.log(this.data);
    this.periodo=this.data.Periodo;
    this.getinfo();
  }
  getinfo(){
    this.achievementService.getNotasbyEstudiante(this.data.Periodo,this.data.Grado,this.data.IDInfoEstudiante).subscribe(res=>{
        this.notas=res;
        this.notas.forEach(element => {
          element.IDSubject=element.IDSubject.IDNameSubject.namesubject;
        });
        console.log(this.notas)
    })
  }

}
