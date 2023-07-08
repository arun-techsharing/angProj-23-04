import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFrm = new FormGroup({
    userNm: new FormControl('', [Validators.required]),
    pwd: new FormControl('', [Validators.required])
  })

  constructor(private rou: Router) {

  }
  login() {
    if (this.loginFrm.valid) {
      console.log(this.loginFrm.value)

      if (this.loginFrm.controls['userNm'].value != "") {
        let userName: string | null = this.loginFrm.controls['userNm'].value;
        if (userName == 'ashok') {
          localStorage.setItem('userType', 'Admin');
          sessionStorage.setItem('userName', userName);
        }
        else if(userName != null) {
          localStorage.setItem('userType', 'user');
          sessionStorage.setItem('userName', userName);
        }

        this.rou.navigateByUrl('/product');
      }
    }

  }

}
