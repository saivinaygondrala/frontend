import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface LoginResponse {
  loginToken: string;
  username: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule], // Import HttpClientModule for HTTP requests
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Corrected 'styleUrl' to 'styleUrls'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('loginToken')) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  handleSubmitLogin() {
    if (this.loginForm.valid) {
      this.http
        .post<LoginResponse>(
          'http://localhost:3000/login',
          this.loginForm.value
        )
        .subscribe(
          (res) => {
            console.log('Successful login', res);
            localStorage.setItem('loginToken', res.loginToken);
            localStorage.setItem('username', res.username);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error during login', error);
          }
        );
    }
  }
}
