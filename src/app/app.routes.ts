import { Routes } from '@angular/router';
import { JournallistComponent } from './journallist/journallist.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JournalformComponent } from './journalform/journalform.component';
import { JournaldetailsComponent } from './journaldetails/journaldetails.component';

export const routes: Routes = [
    {path:'', component: JournallistComponent},
    {path:'home', component: JournallistComponent},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'create-journals', component:JournalformComponent},
    {path:'journals/:id', component:JournaldetailsComponent},
    {path: "**", redirectTo:"/home", pathMatch:"full"}
];
