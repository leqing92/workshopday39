import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Employee, ErrorMessage } from "./components/models/models";
import { Observable, catchError, throwError } from "rxjs";

Injectable()

export class EmployeeService{

    private readonly http = inject(HttpClient);
// Create
    addEmployee(data : any) : Observable<string>{
        return this.http.post('/api/add', data, { responseType: 'text' }); // text | arraybuffer | blob | json (default)
    }

// Read
    getEmployeeList() : Observable<Employee[]> {
        return this.http.get<Employee[]>("/api/list");
    }

    getEmployeeById(id : number) : Observable<Employee>{
        return this.http.get<Employee>(`/api/employees/${id}`)
        // .pipe(
        //     catchError(this.handleError)
        //   );
    }

// Update
    updateEmployee(data : any, id : number) : Observable<string>{
        return this.http.post(`/api/employees/update/${id}`, data, { responseType: 'text' });
    }

// Delete
    deleteEmployeeById(id : number) : Observable<boolean>{
        return this.http.get<boolean>(`/api/employees/delete/${id}`)
    }

//error handling
    private handleError(error: HttpErrorResponse) {
        let errorMessage: ErrorMessage;
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = {
            statusCode: 0,
            timeStamp: error.error.timeStamp.toString(),
            message: error.error.message,
            description: 'Client-side error'
          };
        } else {
          // Server-side error
          errorMessage = error.error;
        }
        return throwError(() => errorMessage);
      }
}


