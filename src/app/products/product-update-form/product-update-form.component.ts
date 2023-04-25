import { Component } from '@angular/core';

import { ProductService } from '../product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.css']
})
export class ProductUpdateFormComponent {

  form: FormGroup;

  constructor(private fb: FormBuilder, public service: ProductService, private router: Router) {
    this.form = this.fb.group({
      _id: [service.productToUpdate._id, [Validators.required, Validators.minLength(3)]],
      product: ['', [Validators.required, Validators.minLength(3)]],
      cost: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
    })
  }

  onSubmit(): void {
    if(this.form.valid) {
      const product = this.form.value as Product;
      this.service.updateProduct(product).subscribe((response => {console.log(response)}))
      this.router.navigate(['product/update'])
    } else {
      console.log('Form is not valid')
    }
  }
}
