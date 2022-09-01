import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { IResponse } from 'src/types/http-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private _fb: FormBuilder, 
    private _http: HttpClient,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  login () {
    this._http.post('login', this.loginForm.value).subscribe(
      ({data}: any) => {
        if(data.token) this._auth.login(data.token, data.user)
        return this._router.navigateByUrl('/')
      }
    )
  }

}
