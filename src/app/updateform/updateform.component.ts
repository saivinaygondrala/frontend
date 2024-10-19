import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updateform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css'],
})
export class UpdateformComponent implements OnInit {
  journalForm!: FormGroup;
  journalId!: string;
  endpoint: string = 'http://localhost:3000';  // Adjust as necessary for your API
  journal!: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.journalForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(20)]],
      authors: ['', Validators.required], // Comma-separated authors as string
      content: ['', [Validators.required, Validators.minLength(200)]],
      abstract: ['', Validators.required],
      description: ['', Validators.required],
      conclusion: ['', Validators.required],
      references: ['', Validators.required], // Comma-separated references as string
    });

    // Get the journal ID from the route
    this.getCurrentId();

    // Load the journal data for the given ID
    this.loadJournalData();
  }

  // Get current journal ID from URL
  public getCurrentId() {
    this.route.paramMap.subscribe((params) => {
      this.journalId = params.get('id') || '';
      console.log('Journal ID:', this.journalId);
    });
  }

  // Load journal data by its ID
  public loadJournalData() {
    this.http
      .get<any>(`${this.endpoint}/get-journal-by-id/${this.journalId}`)
      .subscribe(
        (res) => {
          this.journal = res;
          // Patch form with journal data, converting array fields (authors, references) to strings
          this.journalForm.patchValue({
            title: res.title,
            authors: res.authors.join(', '), // Convert array to comma-separated string
            content: res.content,
            abstract: res.abstract,
            description: res.description,
            conclusion: res.conclusion,
            references: res.references.join(', '), // Convert array to comma-separated string
          });
        },
        (error) => {
          console.error('Error in fetching journal:', error);
        }
      );
  }

  // Handle the form submission for updating the journal
  public handleJournalUpdate() {
    if (this.journalForm.invalid) {
      alert('Please fill out all required fields.');
      return;
    }

    // Convert authors and references back to arrays
    const formValues = {
      ...this.journalForm.value,
      authors: this.journalForm.value.authors.split(',').map((author: string) => author.trim()),
      references: this.journalForm.value.references.split(',').map((ref: string) => ref.trim()),
    };

    this.http.put(`${this.endpoint}/update-journal-by-id/${this.journalId}`, formValues).subscribe(
      (res) => {
        console.log('Journal updated successfully:', res);
        // Redirect to another page or show a success message
        this.router.navigate(['/home']);  // Redirect after successful update
      },
      (error) => {
        console.error('Error updating journal:', error);
      }
    );
  }
}
