import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iProduct } from '../Model/Iproduct';
import { ageValidation, allZeros } from '../customFunctions/custom'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  cntFmr = new FormGroup({
    fstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cntNbr: new FormControl('', [Validators.required, Validators.pattern(/\d$/g), Validators.maxLength(10), allZeros]),
    rsnforEnq: new FormControl(''),
    age: new FormControl('', [ageValidation]),
    city: new FormControl()
  });

  public productList: iProduct[] = [
    {
      productID: 101,
      prodName: 'Butter',
      price: 110.5854,
      prdCtgy: 'Diary',
      quantityAvl: 0,
      dsctAvl: true,
      dsctPer: 0.1256,
      prdImg: '../../assets/images/butter.JPG',
      offerExpDt: new Date(),
      rating: 3
    },
    {
      productID: 102,
      prodName: 'Milk',
      price: 50.7214,
      prdCtgy: 'Diary',
      quantityAvl: 9,
      dsctAvl: true,
      dsctPer: 0.22359,
      prdImg: '../../assets/images/Milk.JPG',
      offerExpDt: new Date(),
      rating: 5
    },
    {
      productID: 103,
      prodName: 'Cheese',
      price: 110.2365,
      prdCtgy: 'Diary',
      quantityAvl: 10,
      dsctAvl: false,
      dsctPer: 0.15568,
      prdImg: '../../assets/images/cheese.JPG',
      offerExpDt: new Date(),
      rating: 4
    }
  ]
  submitEnq() {
    console.log(this.cntFmr);
    this.cntFmr['controls']['fstName'].value;
    if (this.cntFmr['controls']['age'].value != '' && this.cntFmr['controls']['age'].value != undefined) {
      if (parseInt(this.cntFmr['controls']['age'].value) > 18) {
        // call backed api to submit the contact enquiry
        console.log(this.cntFmr);
      }
      else {
        alert(' age should be greater than 18')
      }
    }

    //
    if (this.cntFmr['controls']['cntNbr'].value != '' && this.cntFmr['controls']['cntNbr'].value != undefined) {
      if (this.cntFmr['controls']['cntNbr'].value.length == 10) {
        // call backed api to submit the contact enquiry
        console.log(this.cntFmr.value);
      }
      else {
        alert(' Contact number should of length 10')
      }
    }
  }


}
