import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements OnInit {

  // message!: string;
  timestamp !: string;
  status !: number;
  // statusText !: string;
  description !: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log("history:" , history.state)
    const errorMessage = history.state['errorMessage'];

    if(errorMessage){
      const errorMessageObj = JSON.parse(errorMessage);
      console.log(errorMessage);
      // this.message = errorMessageObj.message || "message cannnot be read"; //become ok although status code is 404 when build into server
      this.timestamp = errorMessageObj.error.timeStamp || "message cannnot be read";
      this.status = errorMessageObj.status || "message cannnot be read";
      // this.statusText = errorMessageObj.statusText || "message cannnot be read"; //become ok although status code is 404 when build into server
      this.description = errorMessageObj.error.message || "message cannnot be read";
    }
  }

}

// sample errorMessage :
/*
{
    "headers":
    {
        "normalizedNames":{},
        "lazyUpdate":null
    },
    "status":404,
    "statusText":"Not Found",
    "url":"http://localhost:4200/api/employees/1",
    "ok":false,
    "name":"HttpErrorResponse",
    "message":"Http failure response for http://localhost:4200/api/employees/1: 404 Not Found",
    //below add by myself from java
    "error":
    {
        "statusCode":404,
        "timeStamp":"Fri Jun 07 08:30:08 SGT 2024",
        "message":"No employee is found with ID = 1",
        "description":"http://localhost:4200/api/employees/1"
    }
}
*/