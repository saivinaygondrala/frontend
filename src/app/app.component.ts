import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { JournalformComponent } from './journalform/journalform.component';
import { JournallistComponent } from './journallist/journallist.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    JournalformComponent,
    JournallistComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Final-Project';

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.fetchDetails()
  }

  public fetchDetails(){
    this.http.get("http://localhost:3000/get-journals").subscribe(
      (res:any) =>{
        console.log(res);
      }
    )
  }
}
