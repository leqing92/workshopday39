import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Employee } from '../models/models';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  private readonly formbuilder = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly employeeSvc = inject(EmployeeService);

  form !: FormGroup;
  id !: number;
  employee !: Employee;
  existingProfileUrl!: string;
  previewUrl!: string | ArrayBuffer | null;
  //method from slide 8 day37 ; require to put #file in html to indicate 
  @ViewChild('file') img !: ElementRef; 

  ngOnInit(): void {
    this.id  = this.activatedRoute.snapshot.params['id'];
    
    this.form = this.formbuilder.group({
      'file' : this.formbuilder.control("", [Validators.required]),
      firstName : this.formbuilder.control("", [ Validators.required]),
      lastName : this.formbuilder.control("", [ Validators.required]),
      email : this.formbuilder.control("", [ Validators.required, Validators.email])
    })

    //get data from backend and patch the value into form
    firstValueFrom(this.employeeSvc.getEmployeeById(this.id))
      .then(response => {
        this.employee = response;
        this.existingProfileUrl = this.employee.profileUrl;
        this.form.patchValue({
          firstName: this.employee.firstName,
          lastName: this.employee.lastName,
          email: this.employee.email
        });
      })
      .catch(error => {
        console.log(error);
        alert(JSON.stringify(error));
        console.log("Navigating to error page with state:", { errorMessage: JSON.stringify(error) });
        this.router.navigate(['/error'], { state: { errorMessage: JSON.stringify(error) }});
      });
  }

  update(){
    const formData = new FormData();
    formData.set('firstName', this.form.get('firstName')?.value);
    formData.set('lastName', this.form.get('lastName')?.value);
    formData.set('email', this.form.get('email')?.value);
    formData.set('profile', this.img.nativeElement.files[0]);    

    firstValueFrom(this.employeeSvc.updateEmployee(formData, this.id))
      .then(response => {
        // console.log("response: " + response);
        alert(response);
        this.router.navigate(['/list'])
      })
      .catch(error => {
        // console.log("error: " + JSON.stringify(error))
        alert(error);
      });
  }

  //immediately to preview the image to be uploaded
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}