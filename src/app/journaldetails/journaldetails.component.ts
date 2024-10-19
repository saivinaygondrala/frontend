import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DateFormatPipe } from "../date-format.pipe";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-journaldetails',
  standalone: true,
  imports: [HttpClientModule, DateFormatPipe, NgIf],
  templateUrl: './journaldetails.component.html',
  styleUrl: './journaldetails.component.css',
})
export class JournaldetailsComponent implements OnInit {
  endpoint: string = 'http://localhost:3000';
  // Base URL
  journal!: any;
  journalId!: any;
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentId();
    this.getCurrentArticle();
  }

  public getCurrentId() {
    this.route.paramMap.subscribe(params => {
      this.journalId = params.get('id');
      console.log(this.journalId);
    })
  }

  public getCurrentArticle(){
    this.http.get(`${this.endpoint}/get-journal-by-id/${this.journalId}`).subscribe(
      (res)=>{
        this.journal=res;
        console.log(res);
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
