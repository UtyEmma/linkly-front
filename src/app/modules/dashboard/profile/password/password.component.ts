import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  passwordForm!: FormGroup

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this._fb.group({
      oldPassword: [''],
      newPassword: [''],
      newPasswordConfirmation: ['']
    })
  }

  

}
