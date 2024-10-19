import { Routes } from '@angular/router';
import { JournallistComponent } from './journallist/journallist.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JournalformComponent } from './journalform/journalform.component';
import { JournaldetailsComponent } from './journaldetails/journaldetails.component';
import { MyjournalsComponent } from './myjournals/myjournals.component';
import { UpdateformComponent } from './updateform/updateform.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'', component: JournallistComponent, canActivate:[authGuard]},
    {path:'home', component: JournallistComponent, canActivate:[authGuard]},
    {path:'login', component:LoginComponent},
    {path:'signup', component:SignupComponent},
    {path:'create-journals', component:JournalformComponent, canActivate:[authGuard]},
    {path:'journals/:id', component:JournaldetailsComponent, canActivate:[authGuard]},
    {path:'my-journals',component:MyjournalsComponent, canActivate:[authGuard]},
    {path:'update-journal/:id',component:UpdateformComponent, canActivate:[authGuard]},
    {path: "**", component:NotfoundComponent}
];
