import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-myjournals',
  standalone: true,
  imports: [NgFor, HttpClientModule, NgIf, RouterModule,DateFormatPipe],
  templateUrl: './myjournals.component.html',
  styleUrl: './myjournals.component.css'
})
export class MyjournalsComponent implements OnInit{
  journals!:any;
  username!:string;
  endpoint:string="http://localhost:3000";
  length:number=0;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
      this.username = localStorage.getItem("username") || '';
      this.fetchMyJournals();
  }

  public fetchMyJournals(){
    this.http.get(`${this.endpoint}/get-my-journals/${this.username}`).subscribe(
      (res)=>
      {
        this.journals = res;
        this.length = this.journals.length;
        console.log(res);
      },
      (error)=>{
        console.error(error)
      }
    )
  }
  
  public deleteMyJournal(index:number){
    this.http.delete(`${this.endpoint}/delete-journal/${this.journals[index]._id}`).subscribe(
      (res)=>{
        console.log(res, "Successfully Deleted");
      },
      (error)=>{
        console.error(error);
      }
    )
  }

}
