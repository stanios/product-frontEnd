import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product, ProductAPIList } from '../product.interface';

import { Subscription } from 'rxjs';
import { orderBy } from 'lodash-es';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}
  
  loading = false;
  productList : Product[] = []
  subscription: Subscription | undefined

  productNameSortType: 'asc' | 'desc' = 'asc'
  costSortType: 'asc' | 'desc' = 'asc'
  quantitySortType: 'asc' | 'desc' = 'asc'
  
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

  toggleSort(key: string) {
    switch(key) {
      case 'product':
        this.productNameSortType = this.productNameSortType === 'asc' ? 'desc' : 'asc'
        this.productList = orderBy(this.productList, [key], [this.productNameSortType])
        break;
        case 'cost':
          this.costSortType = this.costSortType == 'asc' ? 'desc' : 'asc'
          this.productList = orderBy(this.productList, [key], [this.costSortType])
          break;
          case 'quantity':
            this.quantitySortType = this.quantitySortType === 'asc' ? 'desc' : 'asc'
            this.productList = orderBy(this.productList, [key], [this.quantitySortType])

    }
  }

}
