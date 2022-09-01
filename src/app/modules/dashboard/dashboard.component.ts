import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { UserService } from 'src/app/providers/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: any = null

  constructor(private _user: UserService, private _auth: AuthService, private _cdr: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    if(!this._user.get()) this._auth.status() ? await this._auth.refresh() : this._auth.logout()
    this._user.current.subscribe(user => this.user = user)
  }

  

}
