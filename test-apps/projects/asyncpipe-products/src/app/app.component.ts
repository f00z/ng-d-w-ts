import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService, Product } from 'projects/asyncpipe-products/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products$: Observable<Product[]>;
  constructor(private productService: ProductService) {}
  ngOnInit(){
    this.products$= this.productService.getProducts();
  }
}
