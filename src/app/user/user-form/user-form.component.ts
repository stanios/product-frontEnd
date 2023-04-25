import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User, UserAPIList, UserAPIUpdate } from '../user.interfaces';
// import { EMPTY, catchError, map } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Output() hide = new EventEmitter<User | undefined>()
  @Input() user!: User 

  ngOnInit(): void {
    this.form.patchValue(this.user); 
  }
  
  form: FormGroup;

  constructor(private fb: FormBuilder, private userServ: UserService) {
    this.form = this.fb.group({
      username: [[Validators.required, Validators.minLength(3)]],
      name: [Validators.required],
      surname: [Validators.required],
      email: [[Validators.required, Validators.email]],
      address: this.fb.group({
        area: [Validators.required],
        road: [Validators.required],
      }),
      phone: this.fb.array([this.initPhone()]),
    });
}
 
get phoneControls() {
  return (this.form.get('phone') as FormArray).controls;
}

  initPhone(): FormGroup {
    return this.fb.group({
      type: [Validators.required],
      number: [[Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if(this.form.valid) {
      const user = this.form.value as User;
      this.userServ.updateUser(user).subscribe({
        next: (apiData: UserAPIUpdate) => {
          const{status, data} = apiData
          this.hide.emit(status? data: undefined)
        },
        error:(error) => {
          console.log(error)
          this.hide.emit(undefined)
        }
      })
      this.hide.emit(user)
    } else {
      console.log('Form is not valid')
    }
  } 

}
