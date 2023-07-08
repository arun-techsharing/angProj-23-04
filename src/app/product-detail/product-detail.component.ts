import { Component, EventEmitter, OnInit, Output, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { iProduct } from '../Model/Iproduct';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Output() userDataChanged: EventEmitter<number> = new EventEmitter();
  @Input() prodID!: number;
  prvsValTracker: any[] = [];
  userLoginCount = 0;
  loginIncre() {
    this.userLoginCount++;
    console.log(this.userLoginCount)
    this.userDataChanged.emit(this.userLoginCount);
  }

  public product!: iProduct;

  public productLst: iProduct[] = [
    {
      productID: 101,
      prodName: 'Butter',
      price: 110.5854,
      prdCtgy: 'Diary',
      quantityAvl: 0,
      dsctAvl: true,
      dsctPer: 0.1256,
      prdImg: '../../assets/images/butter.JPG',
      offerExpDt: new Date()
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
      offerExpDt: new Date()
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
      offerExpDt: new Date()
    }
  ];

  constructor(private actRou: ActivatedRoute) {

  }

  public ngOnChanges(chnge: SimpleChanges) {
    console.log('Is this a first change?', chnge['prodID'].firstChange)
    console.log('Previous Value:', chnge['prodID'].previousValue)
    console.log('current value:', chnge['prodID'].currentValue)
    console.log('ng onchnages:', this.prodID);
    this.prvsValTracker.push(chnge['prodID'].previousValue)
  }

  public ngOnInit() {
    console.log('child compoent initialized')
    let prodID: number = 0;
    this.actRou.params.subscribe(p => {
      console.log(p);
      prodID = p['pid'];
    })

    //template string
    console.log(`product Id selected by user ${prodID}`);

    let filteredProduct = this.productLst.filter(p => p.productID == prodID);
    console.log(filteredProduct);
    this.product = filteredProduct[0];

    // for (let pIndex = 0; pIndex < this.productLst.length; pIndex++) {

    //   if (this.productLst[pIndex]['productID'] == prodID) {
    //     console.log('Product identified -' + this.productLst[pIndex]['productID'])
    //     this.product = this.productLst[pIndex];
    //     break;
    //   }
    //   console.log(this.productLst[pIndex]);
    // }

    // this.product = {
    //   productID: 103,
    //   prodName: 'Cheese',
    //   price: 110.2365,
    //   prdCtgy: 'Diary',
    //   quantityAvl: 10,
    //   dsctAvl: false,
    //   dsctPer: 0.15568,
    //   prdImg: '../../assets/images/cheese.JPG',
    //   offerExpDt: new Date()
    // }

  }

  ngOnDestroy(): void {
    console.log('component is destroyed')
    
  }


}
