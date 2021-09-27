import { Component, OnInit,ViewChild,EventEmitter,AfterViewInit  } from '@angular/core';
import { Calendar, CalendarApi, NowTimer } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi  } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { viewClassName } from '@angular/compiler';
import {CitasService} from '../../../services/citas.service';
import esLocale from '@fullcalendar/core/locales/es';
import {Citas} from '../../../models/Citas';
import {Router} from '@angular/router';
import { add } from 'date-fns';
import { title } from 'process';
import {createEventId} from '../../admision/event-utils';

var today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);

@Component({
  selector: 'ngx-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit,AfterViewInit {
  citass:any=[];
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
    eventDrop: this.soltar.bind(this),
    select: this.handleDateSelect.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];
  soltar(selectInfo: EventClickArg){
      let m=selectInfo.event.start.getMonth()+1;
    if(confirm('¿Desea cambiar la cita para el día'+selectInfo.event.start.getDate()+"/"+m+"/"+selectInfo.event.start.getFullYear()+" a las "+selectInfo.event.start.getHours()+":"+selectInfo.event.start.getMinutes()+'?')== true){
      var ruta = this.router.url.split('/'); 
      this.citaobjeto =new Citas();
      this.citaobjeto.Fecha = selectInfo.event.start;
      this.citasservice.updateCita(selectInfo.event.id,this.citaobjeto).subscribe(res=>{
        
      },
      err=>console.error(err))
    }
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); 
  }
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    
    
  }
  handleEventClick(clickInfo: EventClickArg) {

  }
  loadcitas(){
    
    let cal = this.calendarComponent.getApi();
    cal.removeAllEvents();
    this.citasservice.getCitas().subscribe(
      res=>{
        this.citass = res;
        console.log(this.citass);
        for (let ci = 0; ci < this.citass.length; ci++) {
      cal.addEvent({ id:this.citass[ci].IDCitas,title: this.citass[ci].IDInfoEstudiante.Nombres+ " " +this.citass[ci].IDInfoEstudiante.PrimerApellido+" Grado: "+this.citass[ci].IDInfoEstudiante.GradoaIngresar,start:this.citass[ci].Fecha});
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
  ngAfterViewInit(): void{
    this.loadcitas();
  }



}
