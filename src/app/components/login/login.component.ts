import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  loginFormGroup!: FormGroup;
  submitted = false
  isError = false;
  errorMessage = "";
  signup = false;
  showPassword = false;
  userDetails: any;

  constructor(
    private _sharedService: SharedService,
    private _route: Router,
  ) { 
    this.usernameCtrl = new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(100),
      Validators.required,
    ]);
    this.passwordCtrl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32)
    ]);
    this.loginFormGroup = new FormGroup({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    });
  }

  get formData() { return this.loginFormGroup.controls; }

  ngOnInit(): void {
  }

  login() {
    this.submitted = true;
    if (this.loginFormGroup.invalid) {
      this.submitted = false;
      return;
    }
    this._sharedService.login(this.formData['username'].value.toLowerCase(), this.formData['password'].value)
      .subscribe({
        next: (data) => {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.isError = false;
          this.submitted = false;
          localStorage.removeItem('movies');
          this._route.navigateByUrl('movies');
        },
        error: (e) => {
          this.submitted = false;
          this.isError = true;
          this.errorMessage = "User not found. Please try again.";
        },
      });
  }

  handleKeyUp(event: any){
    if(event.keyCode === 13){
       this.login();
    }
 }

}
