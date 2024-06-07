import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './components/list/list.component';
import { EmployeeService } from './employee.service';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { ErrorComponent } from './components/error/error.component';

const appRoute : Routes = [
  // do not start with a slash "/"
  // empty represent main page
  {path: '', component : EmployeeComponent},
  // mean /cat
  {path:'list', component: ListComponent},
  {path:'edit/:id', component: EditComponent},
  {path:'error', component: ErrorComponent},
  // ↓ this must be the last route
  // wildcard
  {path:'**', redirectTo: '/', pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ListComponent,
    EditComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute, {useHash: true})
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
