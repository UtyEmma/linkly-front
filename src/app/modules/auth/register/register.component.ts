import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators, ValidationErrors} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth/auth.service';
import { IResponse } from 'src/types/http-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  
  constructor(private _fb: FormBuilder, private _http: HttpClient, private _router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      password_confirmation: ['', Validators.compose([Validators.required])]
    })
  }

  register(){    
    this._http.post('register', this.registerForm.value).subscribe((res: any) => {
      this._auth.login(res.data.token, res.data.user)
      this._router.navigateByUrl('/')
    })
  }

}
