import { Component, contentChild } from '@angular/core';
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

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
    this.journalForm = this.fb.group({
      title: ['', Validators.required, Validators.minLength(20)],
      authors: ['', Validators.required],
      tags: ['', Validators.required],
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
    }

    console.log(this.journalForm.value);
  }
}
