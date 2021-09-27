import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  usuarios: any = [];
  constructor(private usuariosService:UsersService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
    getUsers(){
    this.usuariosService.getUsuarios().subscribe(
      res=>{
        this.usuarios = res;
        console.log(res);
        
      },
      err =>console.error(err)
    );
  }
}
