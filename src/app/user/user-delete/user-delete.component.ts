import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserAPIDelete, UserAPIList } from '../user.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit, OnDestroy{
  constructor(private userServ: UserService) {}
 
  
  loading = false;
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

  onDeleteButtonClick(username: string, user: User) {
    console.log("The delete progress has started")
    user.loading = true
    this.subscription = this.userServ.deleteUser(username).subscribe({
      next: (apiData: UserAPIDelete) => {
        const status = apiData
        console.log(status)
        this.userList = this.userList.filter(user => user.username !== username)
      },
      error:(error) => {
        user.loading = false
        console.log(error)
      },
      complete: () => {
        user.loading = false
        console.log("The delete progress has finished")
      }
    })

  }
}
