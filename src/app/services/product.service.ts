import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getProductBySku(sku: string) {
    return this.http.get<Product>(`${this.productsUrl}/${sku}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.productsUrl}/${id}`).pipe(
      map((response) => {
        return response
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
