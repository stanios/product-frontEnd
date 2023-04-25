import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: ProductService, private router: Router) {
    this.form = this.fb.group({
      product: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
    })
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      const product = this.form.value as Product;
      this.service.insertProduct(product).subscribe((response) => {
        console.log(response)
      })
      this.router.navigate(['product/list'])
    } else {
      console.log('Form is not Valid')
    }
  }


}
