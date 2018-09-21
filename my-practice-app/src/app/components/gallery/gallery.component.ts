import { Component, OnInit } from '@angular/core';
//import { Product } from '../../product';
import { PRODUCTS } from '../../mock-products'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  // product: Product = {
  //   id:1,
  //   url: '../../assets/zapatos1.jpg',
  //   title: 'Colchón dos plazas',
  //   price: 2000,
  //   description: 'lelelele',
  //   available: true
  // }
  title = 'Galería de productos';
  
  products = PRODUCTS;

  constructor() { }

  ngOnInit() {
  }

}
