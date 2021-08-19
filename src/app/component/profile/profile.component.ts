import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { userDetails } from 'src/app/model/userDetails';
import { UserDetailsService } from 'src/app/services/userDetails.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  emailPattern = '^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$';
  editForm: FormGroup;
  editPhotoForm: FormGroup;
  profileData: userDetails = null;
  id: number;
  showHomeFlag: boolean = false;
  showCompanyFlag: boolean = false;
  age: number = 0;
  profileImage = null;

  image = null;


  constructor(private activatedRoute: ActivatedRoute,
    private service: UserDetailsService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log("inputId--->", this.id);
    });



    this.editForm = this.formBuilder.group({
      id: [""],
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

    this.editPhotoForm = this.formBuilder.group({
      id: [""],
      image: [""]
    });

    this.gerUserDetails();

  }

  gerUserDetails() {
    this.service.getUserDetails(this.id).subscribe(res => {
      this.profileData = res;
      this.editForm.controls.subcribeNews.setValue(res["subcribeNews"]);
    });
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get mobile() {
    return this.editForm.get('mobile');
  }

  get state() {
    return this.editForm.get('state');
  }

  get country() {
    return this.editForm.get('country');
  }

  get address() {
    return this.editForm.get('address');
  }

  get address1() {
    return this.editForm.get('address1');
  }

  get address2() {
    return this.editForm.get('address2');
  }

  get companyAddress1() {
    return this.editForm.get('companyAddress1');
  }
  get companyAddress2() {
    return this.editForm.get('companyAddress2');
  }


  editProfile(id) {
    
    this.gerUserDetails();
    
    
        if (this.profileData["address"] == "1") {
          this.showHomeFlag = true;
          this.showCompanyFlag = false;
          this.editForm.controls.id.setValue(this.profileData["id"]);
          this.editForm.controls.firstName.setValue(this.profileData["firstName"]);
          this.editForm.controls.lastName.setValue(this.profileData["lastName"]);
          this.editForm.controls.email.setValue(this.profileData["email"]);
          this.editForm.controls.mobile.setValue(this.profileData["mobile"]);
          this.editForm.controls.age.setValue(this.profileData["age"]);
          this.age = this.profileData["age"];
          this.editForm.controls.state.setValue(this.profileData["state"]);
          this.editForm.controls.country.setValue(this.profileData["country"]);
          this.editForm.controls.address.setValue(this.profileData["address"]);
          this.editForm.controls.address1.setValue(this.profileData["address1"]);
          this.editForm.controls.address2.setValue(this.profileData["address2"]);
          this.editForm.controls.subcribeNews.setValue(this.profileData["subcribeNews"]);
          this.profileImage = this.profileData["image"];
          this.showHomeFlag = true;
          this.showCompanyFlag = false;
  
        }
        else if (this.profileData["address"] == "2") {
          this.showHomeFlag = false;
          this.showCompanyFlag = true;
  
          this.editForm.controls.id.setValue(this.profileData["id"]);
          this.editForm.controls.firstName.setValue(this.profileData["firstName"]);
          this.editForm.controls.lastName.setValue(this.profileData["lastName"]);
          this.editForm.controls.email.setValue(this.profileData["email"]);
          this.editForm.controls.mobile.setValue(this.profileData["mobile"]);
          this.editForm.controls.age.setValue(this.profileData["age"]);
          this.age = this.profileData["age"];
          this.editForm.controls.state.setValue(this.profileData["state"]);
          this.editForm.controls.country.setValue(this.profileData["country"]);
          this.editForm.controls.address.setValue(this.profileData["address"]);
          this.editForm.controls.companyAddress1.setValue(this.profileData["companyAddress1"]);
          this.editForm.controls.companyAddress2.setValue(this.profileData["companyAddress2"]);
          this.editForm.controls.subcribeNews.setValue(this.profileData["subcribeNews"]);
          this.profileImage = this.profileData["image"];
          this.showHomeFlag = false;
          this.showCompanyFlag = true;
        }else {
          this.showHomeFlag=false;
          this.showCompanyFlag=false;
        }
      
    }


  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = event => {
        this.profileImage = (<FileReader>event.target).result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  

  ageRange(agevalue) {
    this.age = agevalue;
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

  submitedForm(editFormData) {
    editFormData.image = this.profileImage;
    console.log('editFormData', editFormData);
    this.service.updateUserDetails(editFormData).subscribe();
  }

  editPhoto(id) {
    this.service.getUserDetails(this.id).subscribe(res => {
      this.editPhotoForm.controls.id.setValue(res["id"]);
      this.profileImage = res["image"];
    });
  }

  submitedProfilePhoto(editPhotoData) {
    editPhotoData.image = this.profileImage;
    this.service.updateProfileDetails(editPhotoData).subscribe((res) => {
      console.log("updateProfileDetails res--->", res);
    });
  }

  closeModal() {
    this.editForm.reset();
    this.editPhotoForm.reset();
    this.gerUserDetails();
  }


}
