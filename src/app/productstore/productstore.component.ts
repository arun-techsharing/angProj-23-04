import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { storeProduct } from '../Model/storeproduct';

@Component({
  selector: 'app-productstore',
  templateUrl: './productstore.component.html',
  styleUrls: ['./productstore.component.css']
})
export class ProductstoreComponent implements OnInit {

  public storeProducts: storeProduct[] = [];

  constructor(private prdSrv: ProductService) {

  }

  ngOnInit(): void {

    this.prdSrv.getLimitedProds(8).subscribe(
      (rsp) => {
        console.log(rsp);
        if(rsp.length > 0){
          this.storeProducts = rsp;
        }
        console.log(this.storeProducts)
      },
      (err) => {

      },

    )

  }



}
