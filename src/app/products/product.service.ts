import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, ProductAPIDelete, ProductAPIList, ProductAPIUpdate } from './product.interface';
import { delay } from 'rxjs';


const PRODUCT_API = 'https://codingfactory.ddns.net/api/product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productToUpdate!: Product
  public newList!: Product[]
  

  constructor(private http: HttpClient) {}

  findAll() {
    return this.http.get<ProductAPIList>(`${PRODUCT_API}/findall`)
  }

  insertProduct(product: Product) {
    return this.http.post<ProductAPIList>(`${PRODUCT_API}/create`, product)
  }

  deleteProduct(id: string) {
    return this.http.delete<ProductAPIDelete>(`${PRODUCT_API}/delete/${id}`).pipe(delay(1000))
  }

  updateProduct(product: Product) {
    console.log("service has startet")
    return this.http.patch<ProductAPIUpdate>(`${PRODUCT_API}/update`, product);
  }  
}
