import { Component,ChangeDetectorRef,Inject} from '@angular/core';
import { NbLoginComponent,NbAuthService } from '@nebular/auth';
import  {  NB_AUTH_OPTIONS } from  '@nebular/auth' ;
import { LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import {login} from '../../../models/login';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent  {
  authentication:boolean=true;
  loginobjeto:login;
  usuarios:any=[];

  constructor(cd: ChangeDetectorRef,authService:NbAuthService,router: Router,@Inject(NB_AUTH_OPTIONS) options = {}, private loginservice:LoginService) {
    super(authService, options, cd, router);
}
  ngOnInit(): void {
    this.logout();
  }
  logout(){
    this.loginservice.logout().subscribe((res)=>{
      localStorage.setItem('usuario',res['Token']);
      this.router.navigate(['/auth/login']);
        console.log(res);
      },
        err=>console.error(err))
  }
  guardar(formulario:any)
  { 
    this.loginobjeto=new login();
    this.loginobjeto.Nickname=formulario.value.email;
    this.loginobjeto.Password=formulario.value.password;
    this.loginservice.authentication(this.loginobjeto).subscribe((res)=>{
      this.authentication=res['auth'];
      if(this.authentication)
      {
        localStorage.setItem('usuario',res['Token']);
        var tokenbyload:any = decode(res['Token']);
        this.loginservice.rol=tokenbyload.tipo;
        
        if(res['asp'])
        { 
         
            this.router.navigate(['auth/reset-password'])
          
        }
        else{
          this.router.navigate(['pages/acceso/acceso-home'])
        }
        
        
      }
    },
    err=>{
      console.error(err);
    }
    )
  }

}
