import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  
  private readonly formbuilder = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  
  form !: FormGroup;
  previewUrl!: string | ArrayBuffer | null;
  @ViewChild('file') img !: ElementRef; 

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      'file' : this.formbuilder.control("", [Validators.required]),
      firstName : this.formbuilder.control("", [ Validators.required]),
      lastName : this.formbuilder.control("", [ Validators.required]),
      email : this.formbuilder.control("", [ Validators.required, Validators.email])
    })
  }

  submit(){
    const formData = new FormData();
    formData.set('firstName', this.form.get('firstName')?.value);
    formData.set('lastName', this.form.get('lastName')?.value);
    formData.set('email', this.form.get('email')?.value);
    formData.set('profile', this.img.nativeElement.files[0]);    

    firstValueFrom(this.http.post('/api/add', formData, { responseType: 'text' }))
      .then(response => {
        console.log("response: " + response);
        alert(response);
        this.router.navigate(['/list'])
      })
      .catch(error => {
        console.log("error: " + JSON.stringify(error))
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
