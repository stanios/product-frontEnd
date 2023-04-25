import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { UserService } from './user.service';

import { UsersListComponent } from './users-list/users-list.component';
import { UserInsertComponent } from './user-insert/user-insert.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserFormComponent } from './user-form/user-form.component';

const routes: Routes = [
  { path: 'list', component: UsersListComponent },
  { path: 'insert', component: UserInsertComponent },
  { path: 'delete', component: UserDeleteComponent },
  { path: 'update', component: UserUpdateComponent }
];

@NgModule({
  declarations: [UsersListComponent, 
                UserInsertComponent, 
                UserDeleteComponent,
                UserUpdateComponent,
                UserFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
})
export class UserModule {}