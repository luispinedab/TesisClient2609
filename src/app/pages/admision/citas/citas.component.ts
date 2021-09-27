import { Component, OnInit,ViewChild,EventEmitter,AfterViewInit  } from '@angular/core';
import { Calendar, CalendarApi, NowTimer } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import { viewClassName } from '@angular/compiler';
import {CitasService} from '../../../services/citas.service';
import esLocale from '@fullcalendar/core/locales/es';
import {Citas} from '../../../models/Citas';
import {Router} from '@angular/router';
import { add } from 'date-fns';
import { title } from 'process';



var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

@Component({
  selector: 'ngx-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit,AfterViewInit {
  citass:any=[];
  citas1:any=[];
  citaobjeto:Citas;
  constructor(private citasservice:CitasService, private router:Router){}

  @ViewChild("CALENDARIO") calendarComponent: FullCalendarComponent;
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    contentHeight: 'auto',
    allDaySlot: false,
    slotMinTime: "8:00:00",
    slotMaxTime: "16:00:00",
    locale: esLocale,
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'dayGridMonth'
    },
    initialView: 'dayGridMonth',
    weekends: false,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: function(info){
      var CDate = new Date(info.dateStr);
      if(info.view.type=="dayGridMonth" && CDate > today )
      { 
         this.changeView('timeGridDay', info.dateStr);
      }
    },  
    select: this.handleDateSelect.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    if(selectInfo.view.type!="dayGridMonth"){
    if(confirm('¿Desea agendar cita el día '+selectInfo.start.getDate()+"/"+selectInfo.start.getMonth()+"/"+selectInfo.start.getFullYear()+" a las "+selectInfo.start.getHours()+":"+selectInfo.start.getMinutes()+'?')== true){
      var ruta = this.router.url.split('/'); 
      this.citaobjeto =new Citas();
      this.citaobjeto.Fecha = selectInfo.start;
      this.citaobjeto.IDInfoEstudiante = parseInt(ruta[4]);
      this.citasservice.saveCitas(this.citaobjeto)
      .subscribe(
        res =>{
          var a= res as any;
          console.log(a);
          this.calendarOptions.selectable=false;
          this.router.navigate(['pages/admision/success'],{state:{cita:this.citaobjeto.Fecha} });
        },
        err => console.error(err)
      )
      var title ="Nuevo";
    }
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: "GREEN"
      });
    }
    }
    
  }
  
  loadcitas(){
    
    let cal = this.calendarComponent.getApi();
    cal.removeAllEvents();
    this.citasservice.getCitas().subscribe(
      res=>{
        this.citass = res;
        this.ValidarCita();
        for (let ci = 0; ci < this.citass.length; ci++) {
      cal.addEvent({ title: 'Ocupado',start:this.citass[ci].Fecha});
    }
      },
      err =>console.error(err)
    )
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  ngOnInit(): void {
    
  }
  ValidarCita(){
    var ruta = this.router.url.split('/'); 
   console.log(this.citass);
   this.citass.forEach(element => {
     if(element.IDInfoEstudiante.IDInfoEstudiante==ruta[4])
      {
        this.router.navigate(['pages/admision/success'],{state:{cita:element.Fecha} });
      }
   });
  }
  ngAfterViewInit(): void{
    this.loadcitas();
    
  }


}
