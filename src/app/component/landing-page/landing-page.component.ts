import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetailsService } from 'src/app/services/userDetails.service';
import { userDetails } from "../../model/userDetails";

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})



export class LandingPageComponent implements OnInit {


  
  
  emailPattern = '^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$';
  age: number=0;
  image = null;
  imageValid: boolean = true;

  userForm: FormGroup;

  showCompanyFlag: boolean = false;
  showHomeFlag: boolean = false;
  subcribe = false;

  constructor(private fb: FormBuilder,private userDetail: UserDetailsService,private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]{1,20}$')]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      age: ["", Validators.required],
      state: ["", [Validators.required]],
      country: ["", Validators.required],
      address: ["", Validators.required],
      address1: ["", Validators.required],
      address2: ["", Validators.required],
      companyAddress1: ["", Validators.required],
      companyAddress2: ["", Validators.required],
      subcribeNews: [false], 
      image: ["", Validators.required]

    });
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get mobile() {
    return this.userForm.get('mobile');
  }

  get state() {
    return this.userForm.get('state');
  }

  get country() {
    return this.userForm.get('country');
  }

  get address() {
    return this.userForm.get('address');
  }

  get address1() {
    return this.userForm.get('address1');
  }

  get address2() {
    return this.userForm.get('address2');
  }

  get companyAddress1() {
    return this.userForm.get('companyAddress1');
  }
  get companyAddress2() {
    return this.userForm.get('companyAddress2');
  }

  displayAddress(address) {
    if (address == "1") {
      this.showCompanyFlag = false;
      this.showHomeFlag = true;
    }
    if (address == "2") {
      this.showHomeFlag = false;
      this.showCompanyFlag = true;
    }
  }

  onSubmit(formvalue: userDetails) {
    console.log("this.userForm",this.userForm);
    console.log("age--->",this.userForm.get('age'));
    formvalue.image = this.image;
    
    this.userDetail.insertUserDetails(formvalue).subscribe(res => {

      if(res!=null ){
      this.router.navigate(["/home/profile"],{ queryParams: { id: res["id"] } });
    }
    });
  }


  ageRange(age) {
    this.age = age;
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      
      var reader = new FileReader();
      reader.onload = event => {
        this.image = (<FileReader>event.target).result;
       
      };
      
      reader.readAsDataURL(event.target.files[0]);
      
    }
  }


  resetForm() {
    this.userForm.reset();
  }


}
