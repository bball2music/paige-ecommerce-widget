import { OnInit, Component, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'color', 'type', 'cost', 'actions'];
  products: MatTableDataSource<Product>;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = new MatTableDataSource<Product>(data);
        this.products.sort = this.sort;
        this.paginator.pageSize = 10;
        this.products.paginator = this.paginator;
      },
      error: error => {
        console.log(error)
      }
    });
  }

  applyFilter(filterValue: string) {
    this.products.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe({
      next: data => {
        // Remove the deleted product from the products array
        const index = this.products.data.indexOf(product);
        if (index >= 0) {
          this.products.data.splice(index, 1);
          this.products._updateChangeSubscription();
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
