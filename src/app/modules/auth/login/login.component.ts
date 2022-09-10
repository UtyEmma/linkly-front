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
  loading: boolean = false

  constructor(
    private _fb: FormBuilder, 
    private _http: HttpClient,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  login () {
    this.loading = true
    this._http.post('login', this.loginForm.value).subscribe(
      (res: any) => {
        this.loading = false
        if(res.data.token) this._auth.login(res.data.token, res.data.user)
        return this._router.navigateByUrl('/')
      }
    )
  }

}
