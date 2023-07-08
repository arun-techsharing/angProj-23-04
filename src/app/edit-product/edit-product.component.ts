import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iProduct } from '../Model/Iproduct';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { allZeros } from '../customFunctions/custom';
import { ProductService } from '../services/product.service';
import { HttpClient, HttpHandler } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  prodid: number = 0;

  prdFrm = new FormGroup({
    prdName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    price: new FormControl('', [Validators.required, Validators.pattern(/\d$/g), Validators.maxLength(5), allZeros]),
    category: new FormControl(''),
    qntAvl: new FormControl(),
    dscntPer: new FormControl(),
    productID: new FormControl(101, [Validators.required]),
    prodName: new FormControl(),
    prdCtgy: new FormControl(),
    quantityAvl: new FormControl(),
    dsctAvl: new FormControl(),
    prdImg: new FormControl(),
  });

  public productLst: iProduct[] = [];

  constructor(private actRou: ActivatedRoute, private rou: Router, private productSrv: ProductService, private tos:ToastrService) {

  }
  ngOnInit(): void {

    let userType = localStorage.getItem('userType')
    console.log('in Edit product', userType);
    // let httpHandler: any = new HttpHandler();
    // let httpClient = new HttpClient(httpHandler);
    // let router = new Router();
    // let prdSrv = new ProductService(router, httpClient);
    // console.log(prdSrv.prodID);
    // this.prodid = prdSrv.prodID;s

    //using dependency injection
    console.log(this.productSrv.prodID)
    this.prodid = this.productSrv.prodID;


    this.productLst = this.productSrv.getProductLst();

    // if(userType != 'Admin'){
    //   this.rou.navigate(['/login'])
    // }

    let prodID: number = 0;
    this.actRou.params.subscribe(p => {
      console.log(p);
      prodID = p['pid'];
    })

    let filteredProduct =this.productSrv.filterProductbyId(prodID);

    //call service method to get productbyID from backend
    this.productSrv.getProdById(prodID).subscribe(

      (rsp)=>{
        if(rsp != undefined){
          console.log(rsp)
          this.setFrmValue(rsp);
        }
      }
  
      )


    //template string
    console.log(`product Id selected by user ${prodID}`);

    // let filteredProduct = this.productLst.filter(p => p.productID == prodID);
    // console.log(filteredProduct);
    //this.product = filteredProduct[0];

    
  }

  ediProd() {
    console.log(this.prdFrm.value);
    let prod: iProduct = {
      prodName: this.prdFrm.controls.prdName.value,
      prdCtgy: this.prdFrm.controls.category.value,
      price: this.prdFrm.controls.price.value != null ? parseInt(this.prdFrm.controls.price.value) : null,
      quantityAvl: this.prdFrm.controls.qntAvl.value,
      dsctAvl: this.prdFrm.controls.dsctAvl.value,
      prdImg: this.prdFrm.controls.dsctAvl.value,
      productID: this.prdFrm.controls.dsctAvl.value,
    }

    console.log(prod)
    this.tos.success('Product added successfully')

    // we will calling a backend api - editProductById(prod)
  }


  setFrmValue(prod:any){
    this.prdFrm.patchValue({
      prdName: prod.title,
      price: prod.price,
      category: prod.category,
      dscntPer: 0,
      qntAvl: 10
    })
  }

}
