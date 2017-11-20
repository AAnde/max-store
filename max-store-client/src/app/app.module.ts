import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'

import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {SignUpComponent} from './components/signup/signup.component';
import {PageNotFoundComponent} from './components/pagenotfound/pagenotfound.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path:'signup',component:SignUpComponent},
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    HomeComponent,HeaderComponent,SignUpComponent,PageNotFoundComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class AppModule { }
