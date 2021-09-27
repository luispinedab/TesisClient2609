import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {UsersService} from '../../services/users.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
   user: User={
   Name:'',
   Lastname:'',
   Identification:0,
   Email:'',
   PhoneNumber:'',
   Nickname:'',
   Password:'1234',
   UserState:1,
   IDUserType:0
 };
  edit:boolean = false;

   // ICONS
  constructor(private usuariosService:UsersService, private router:Router,private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.updatepage();
  }
   updatepage(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.usuariosService.getUsuario(params.id)
      .subscribe(
        res => {
          console.log(res);
          this.user=res;
          this.edit=true;
        },
        err => console.error(err)
      )
    }
  }
  saveNewUser(){
    console.log(this.user);
    this.usuariosService.saveUsuario(this.user)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
        this.router.navigate(['/administrar/usuarios']);
      },
      err => console.error(err)
    )
  }
  updateUser()
  {
    this.usuariosService.updateUsuario(this.user.IDUser,this.user)
    .subscribe(
      res =>{
        console.log(res);
        this.router.navigate(['/']);
        this.router.navigate(['/administrar/usuarios']);
      },
      err => console.error(err)
    )
  }
  deleteUser()
  {
    var txt;
    var r = confirm("Presione aceptar si desea eleminar el registro");
    if (r == true) {
      this.usuariosService.deleteUsuario(this.user.IDUser)
      .subscribe(
        res=>{
          console.log(res);
          this.router.navigate(['/']);
          this.router.navigate(['/administrar/usuarios']);
        },
        err=>console.error(err)
      )
    } else {
      this.router.navigate(['/']);
      this.router.navigate(['/administrar/usuarios']);
    }
  }
  alert()
  {
    alert("No se puede agregar registro");
  }

}
