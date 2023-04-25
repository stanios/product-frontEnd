import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductAPIList } from '../product.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  
  constructor(private productService: ProductService, private router: Router) {}
  

  loading = false;
  productList!: Product[] 
  subscription: Subscription | undefined

  ngOnInit(): void {
    console.log('starting "findAll" API call')
    this.loading = true
    this.subscription = this.productService.findAll().subscribe({
      next: (apiData: ProductAPIList) => {
        const {status, data} = apiData
        this.productList = data;
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

  onUpdateButtonClick(product : Product) {
    this.productService.productToUpdate = product
    this.productService.newList = this.productList
    this.router.navigate(['product/updateForm'])
  }

  

}

