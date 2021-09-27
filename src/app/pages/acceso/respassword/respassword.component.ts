import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS,NbAuthService,NbAuthResult } from '@nebular/auth';
import { getDeepFromObject } from '@nebular/auth';
import decode from 'jwt-decode';
import {AspirantesService} from '../../../services/aspirantes.service';
import {Aspirantes} from  '../../../models/Aspirtantes';

@Component({
  selector: 'ngx-respassword',
  templateUrl: './respassword.component.html',
  styleUrls: ['./respassword.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RespasswordComponent implements OnInit{
  id:any;

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';
  aspirantes: any;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,private aspirantesservice:AspirantesService) {

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }
  
  ngOnInit(): void {
    this.getinfo();
   }

  resetPass(formulario:any): void {
    
    this.errors = this.messages = [];
    this.submitted = true;
    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.aspirantes.Password=this.user.password;
        this.aspirantesservice.updateAspirante(this.id,this.aspirantes).subscribe(res=>{
          console.log(res);
        },
        err=>console.error(err))

      } else {
        this.errors = result.getErrors();
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }
  getinfo(){
    var token = localStorage.getItem('usuario');
    var tokenbyload:any = decode(token);
    console.log(tokenbyload);
    this.id = tokenbyload.idAspirante;
    this.aspirantesservice.getAspirante(this.id).subscribe(res=>{
      this.aspirantes=res;
    },
    err=>console.error(err))
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
