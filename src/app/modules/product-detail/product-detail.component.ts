import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.sass']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  productForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const sku = this.route.snapshot.paramMap.get('sku');
    if (sku === null) {
      this.router.navigate(['/product-list']);
      return;
    }

    this.productService.getProductBySku(sku).subscribe({
      next: product => {
        this.product = product;
        if (this.product) {
          this.productForm = this.fb.group({
            name: [this.product.name, [Validators.required, Validators.maxLength(55)]],
            type: [this.product.type, [Validators.required, Validators.maxLength(55)]],
            description: [this.product.description, [Validators.required, Validators.maxLength(55)]],
            color: [this.product.color, [Validators.required, Validators.maxLength(55)]],
            price: [this.product.price, Validators.min(0)]
          });
        }
      },
      error: error => {
        console.log(error)
      }
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      const updatedProduct = Object.assign({}, this.product, this.productForm.value);
      this.productService.updateProduct(updatedProduct).subscribe({
        next: () => {
          this.router.navigate(['/product-list']);
        },
        error: error => {
          console.log(error)
        }
      });
    } else {
      Object.values(this.productForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
