import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductAPIDelete, ProductAPIList } from '../product.interface';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit, OnDestroy{
  constructor(private productService: ProductService) {}
 
  
  loading = false;
  productList : Product[] = []
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

  onDeleteButtonClick(id: string, product: Product) {
    console.log("The delete progress has started")
    product.loading = true
    this.subscription = this.productService.deleteProduct(id).subscribe({
      next: (apiData :ProductAPIDelete) => {
        const status = apiData
        console.log(status)
        this.productList = this.productList.filter(product => product._id !== id);
      },
      error: (error) => {
        product.loading = false
        console.log(error)
      },
      complete: () => {
        product.loading = false
        console.log("The delete progress has finished")
      }
    })
  }

  
  
}
