import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],  // Import HttpClientModule for HTTP requests
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']  // Corrected 'styleUrl' to 'styleUrls'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSubmitSignUp(): void {
    if (this.signupForm.valid) {
      this.http.post("http://localhost:3000/signup", this.signupForm.value).subscribe(
        (res) => {
          console.log("Signup response: ", res);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error("Error during signup: ", error);
        }
      );
    }
  }
}
