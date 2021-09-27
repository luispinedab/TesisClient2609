import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AchievementsService } from 'app/services/achievements.service';

@Component({
  selector: 'ngx-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss']
})
export class VerComponent implements OnInit {
  data:any;
  info:any=[];
  fechas:any=[];
  fallasporgrado:any=[];
  total:any;
  periodo:any;
  constructor(private router:Router,private achievementservice:AchievementsService) {
    this.data = this.router.getCurrentNavigation().extras.state;
   }

  ngOnInit(): void {
    this.data = history.state;
    
    this.getinfo();
  }
  getinfo(){
    this.achievementservice.getFallasbyStudent(this.data.Periodo,this.data.Estudiante).subscribe(res=>{
      this.info=res;
      for (let index = 0; index < this.info.length; index++) {
        var moonLanding = new Date(this.info[index].FechaReporte);
        var año= moonLanding.getFullYear();
        var mes = moonLanding.getMonth()+1;
        var dia = moonLanding.getDate();
        var date = dia + "/" + mes + "/" + año
        console.log(date);
        this.fechas.push(date);
      }
      this.total=this.fechas.length;
      this.periodo=this.info[0].Periodo;
      console.log(this.fechas);

    })
  }

}
