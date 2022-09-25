import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notify } from 'notiflix';
import { ToastService } from 'src/app/providers/services/alert/toast.service';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null

  constructor(
    private _user: UserService, 
    private _auth: AuthService, 
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _toast: ToastService) { }

  async ngOnInit(): Promise<void> {
    if(!this._user.get()) this._auth.status() 
                                ? await this._auth.refresh() 
                                : (this._auth.getRememberToken() ? this.remember() : this.logout())
    
    this._user.current.subscribe(user => this.user = user)
  }

  remember(){
    this._auth.rememberUser(this._auth.getRememberToken()).subscribe((res: any) => {
      if(res.data.token) this._auth.login(res.data.token, res.data.user)
      if(res.data.remember_token) this._auth.setRememberToken(res.data.remember_token)
    })
  }

  logout(){
    this._auth.logout()
    this._router.navigateByUrl('/login')
  }

  

}
