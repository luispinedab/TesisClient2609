import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService,NbMenuItem} from '@nebular/theme';
import decode from 'jwt-decode';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  nombrepersona:any;
  tipousuario:any;

  currentTheme = 'default';

  // userMenu = [ { title: 'Perfil',data:{id:'Profile'} }, { title: 'Cerrar sesión',data:{id:'logout'}} ];
  userMenu = [{ title: 'Cerrar sesión',data:{id:'logout'}} ];
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router : Router,
              private loginservice:LoginService
              ) {
  }

  ngOnInit() {
    this.getinfo();
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);
    
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
      
      this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title =>  {
        if(title=="Cerrar sesión")
        { 
          this.loginservice.logout().subscribe((res)=>{
          localStorage.setItem('usuario',res['Token']);
          this.router.navigate(['/auth/login']);
            console.log(res);
          },
            err=>console.error(err))
        }
      });
   

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  getinfo(){
    var token = localStorage.getItem('usuario');
    var tokenbyload:any = decode(token);
    this.nombrepersona = tokenbyload.nombre;
    this.tipousuario = tokenbyload.tipo;
  }
}
