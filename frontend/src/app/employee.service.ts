import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Employee } from "./components/models/models";
import { Observable } from "rxjs";

Injectable()

export class EmployeeService{

    private readonly http = inject(HttpClient);

    getEmployeeList() : Observable<Employee[]> {
        return this.http.get<Employee[]>("/api/list");
    }

    getEmployeeById(id : number) : Observable<Employee>{
        return this.http.get<Employee>(`/api/employees/${id}`)
    }

    deleteEmployeeById(id : number) : Observable<boolean>{
        return this.http.get<boolean>(`/api/employees/delete/${id}`)
    }
}