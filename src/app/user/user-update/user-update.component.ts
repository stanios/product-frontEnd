import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPIList } from '../user.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  constructor(private userServ: UserService){}

  loading = false;
  updateList = true;
  updateForm = false;
  userData! : User 
  userList : User[] = []
  subscription: Subscription | undefined

  ngOnInit(): void {
    console.log('starting "findAll" API call')
    this.loading = true
    this.subscription = this.userServ.findAll().subscribe({
      next: (apiData: UserAPIList) => {
        const {status, data} = apiData
        this.userList = data;
        console.log(status)
        console.log(data)
      },
      error: (error) => {
        this.loading = false;
        console.log(error)
      },
      complete: () => {
        this.loading = false;
        console.log('API call finished')
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onUpdateButtonClick(user: User) {
    this.userData = user;
    console.log(this.userData)
    this.updateList = false
    this.updateForm = true
  }
  receivedBoolean (newUser: User | undefined) {
  this.updateForm = newUser === undefined;
  this.updateList = true;
  if (newUser === undefined) return
  this.userList = this.userList.filter(user => user.username !== newUser.username)
  this.userList.push(newUser)
  }
}

