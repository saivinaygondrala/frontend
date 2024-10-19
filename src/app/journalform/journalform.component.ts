import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-journalform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './journalform.component.html',
  styleUrl: './journalform.component.css',
})
export class JournalformComponent {
  journalForm!: FormGroup;
  username!: string;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.journalForm = this.fb.group({
      title: ['', Validators.required, Validators.minLength(20)],
      authors: ['', Validators.required],
      content: ['', Validators.required, Validators.minLength(200)],
      abstract: ['', Validators.required],
      description: ['', Validators.required],
      conclusion: ['', Validators.required],
      references: ['', Validators.required],
      username: [this.username, Validators.required],
    });
  }

  handleJournalSubmit() {
    if (this.journalForm.invalid) {
      alert('Please fill out all the necessary fields.');
      return;
    } else {
      const formVals = this.journalForm.value;
      formVals.authors = formVals.authors.split(',').map((author: string) => {
        author.trim();
      });
      formVals.authors.push(this.username);
      formVals.references = formVals.references
        .split(',')
        .map((ref: string) => ref.trim());
      console.log(formVals.value);
      console.log(this.journalForm.value);
      this.http
        .post('http://localhost:3000/create-journal', formVals)
        .subscribe((res) => {
          console.log('Successfully Created Journal', res);
          alert("Successfully created Journal");
        },
      (error)=>{
        alert("Issue in creating Journal");
        console.error("Error in creating journal", error);
      });
    }
  }
}
