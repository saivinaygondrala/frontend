import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-journallist',
  standalone: true,
  imports: [HttpClientModule, NgFor ,NgIf, RouterModule],
  templateUrl: './journallist.component.html',
  styleUrls: ['./journallist.component.css'],
})
export class JournallistComponent implements OnInit {
  endpoint: string = 'http://localhost:3000'; // API base URL
  length!:number;
  journals!: any; // Variable to store the fetched journals

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if(localStorage.getItem("loginToken"))
    this.fetchJournals(); // Call the method to fetch journals on initialization
  else{
    this.router.navigate(['/login']);
  }
  }

  public fetchJournals() {
    this.http.get(`${this.endpoint}/get-journals`).subscribe(
      (res) => {
        this.journals = res; // Assign response data to the journals variable
        this.length = this.journals.length;
        console.log(res);
      },
      (error) => {
        // Error handling block
        console.error(error); // Log the error to the console
      }
    );
  }

  public logAndNavigate(journalId:string){
    console.log("clicked journal ID", journalId);
  }
}
