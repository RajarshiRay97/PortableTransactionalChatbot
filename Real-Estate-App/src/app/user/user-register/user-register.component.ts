import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  user!: User;
  formSubmitted!: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }

  // Creating registration form using FormBuilder
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null,Validators.required],
      email: [null, [Validators.required, Validators.email]],
      mobile: [null, [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: [null, Validators.required]
    }, {validators: this.passwordMatchingValidator});
  }

  // Custom validator - for cross field validation
  passwordMatchingValidator(control: AbstractControl): ValidationErrors|null {
    return control.get('password')?.value === control.get('confirmPassword')?.value?null:{notMatched: true};
  }

  // getter method for all form controls
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }


  userData(): User{
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      mobile: this.mobile.value,
      password: this.password.value
    };
  }

  onSubmit(){
    console.log(this.registrationForm);
    this.formSubmitted = true;
    if (this.registrationForm.valid){
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.formSubmitted = false;
      this.alertify.success('Congrats, you are successfully registered');
    }
    else{
      this.alertify.error('Kindly provide the required fields correctly');
    }
  }

}
