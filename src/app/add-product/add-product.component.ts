import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { allZeros } from '../customFunctions/custom';
import { ProductService } from '../services/product.service';
import { iProduct } from '../Model/Iproduct';
import { storeProduct } from '../Model/storeproduct';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  notfication: boolean = false;
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

  constructor(private prdSrvc: ProductService) {

  }

  addProduct() {
    console.log(this.prdFrm.value);
    let prodLst: iProduct[] = this.prdSrvc.getProductLst();
    let nwProd: iProduct = {
      prodName: this.prdFrm.controls.prdName.value,
      prdCtgy: this.prdFrm.controls.prdCtgy.value,
      price: this.prdFrm.controls.price.value == null ? 0 : parseInt(this.prdFrm.controls.price.value),
      dsctAvl: this.prdFrm.controls.dsctAvl.value,
      quantityAvl: this.prdFrm.controls.dsctAvl.value,
      prdImg: '../../assets/images/Milk.JPG',
      // productID: this.prdSrvc.prodLst[this.prdSrvc.prodLst.length - 1].productID + 1,
      productID: prodLst[prodLst.length - 1].productID + 1
    }
    //new product has to be sent to backedn through api call
    this.prdSrvc.addProduct(nwProd);
  }

  addProdStore() {

    let newProduct: storeProduct = {
      title: this.prdFrm.controls.prdName.value,
      category: this.prdFrm.controls.category.value,
      description: this.prdFrm.controls.qntAvl.value,
      price: this.prdFrm.controls.price.value == null ? 0 : parseInt(this.prdFrm.controls.price.value),
      image: '../../assets/images/Milk.JPG'
    }
    this.prdSrvc.addProductStore(newProduct).subscribe(
      (resp) => {
        console.log(resp);
        if (resp['id'] != null && resp['id'] != '') {
          //alert('Product Added sucessfully');
          this.notfication = true;
          this.prdFrm.reset();
        }
      },
      (err)=>{
        alert('Product insertion failed!!')
      }
    )

  }
}
