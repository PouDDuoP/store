import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model'

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2022, 4, 12);
  showProductDetail = false;
  productChosen: Product = {
    id: 0,
    title: '',
    images: [],
    price: 0,
    description: '',
    category: {
      id: 0,
      name: ''
    }
  };
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.productService.getProductsByPage(10, 0)
    // .subscribe(data => {
    //   this.products = data
    //   this.offset += this.limit;
    // });
    this.loadMore()
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: number) {
    // console.log('id',id)
    this.productService.getProduct(id)
    .subscribe(data =>{
      // console.log('product', data)
      this.toggleProductDetail();
      this.productChosen = data;
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Venta de Truenos',
      images: ['https://placeimg.com/640/480/any','https://placeimg.com/640/480/any'],
      price: 500,
      categoryId: 2
    }
    this.productService.create(product)
    .subscribe( data => {
      console.log('created',data)
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo titulo x3'
    }
    const id = this.productChosen.id;
    this.productService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id
    this.productService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      console.log(productIndex)
      this.products.splice(productIndex, 1)
      this.showProductDetail = false;
    })
  }

  loadMore() {
    // this.productService.getProductsByPage(this.limit, this.offset)
    this.productService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

  // onSwiper([swiper]: string) {
  //   console.log(swiper);
  // }
  // onSlideChange() {
  //   console.log('slide change');
  // }

}
