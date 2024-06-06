import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Employee } from '../models/models';
import { EmployeeService } from '../../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
   
  private readonly http = inject(HttpClient);
  private readonly employeeSvc = inject(EmployeeService);
  private readonly router = inject(Router);

  employees !: Employee[];
  employees$ !: Observable<Employee[]>;

  ngOnInit(): void {
    this.getList();
  }

  getList(){
    firstValueFrom(this.employeeSvc.getEmployeeList())
      .then(response => {
        this.employees = response;        
      })
      .catch(error => {
        alert(error);
      })
    
    this.employees$ = this.employeeSvc.getEmployeeList();
  }

  toEdit(id: number) {
    firstValueFrom(this.employeeSvc.getEmployeeById(id))
      .then(response =>{
        console.log(response);
        this.router.navigate([`/edit/${id}`])
      })
  }

  toDelete(id : number){
    firstValueFrom(this.employeeSvc.deleteEmployeeById(id))
      .then(response =>{
        console.log(response);
        alert(response);
        this.employees = this.employees.filter(e => e.id !== id); // to make the view change immediately
      })
      .catch(error => {
        alert(error);
      });
  }
}
