import { C } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
nombrepersona:any;
 baseCarouselImages = 'assets/images/';
  imageExtension = '.png';
  constructor() { }

  ngOnInit(): void { 
//     $('.carousel-control').on('click', function(e) {
//       console.log("alertaa")
//     // prevent the default action, in this case the following of a link
//     e.preventDefault();
//     // capture the href attribute of the a element
//     var url = $(this).attr('href');
//     // perform a get request using ajax to the captured href value
//     $.get(url, function() {
//         // success
//     });
// });
   this.getinfo();
  }
getinfo(){
  var token = localStorage.getItem('usuario');
  var tokenbyload:any = decode(token);
  console.log(tokenbyload);
  this.nombrepersona = tokenbyload.nombre;

  
}
}
