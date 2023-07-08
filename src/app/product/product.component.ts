import { Component, OnDestroy, OnInit } from '@angular/core';
import { iProduct } from '../Model/Iproduct';
import { city } from '../Model/city';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  public prdID: number = 101;
  prdDtlFlag: boolean = false;
  public pagetitle: string = "Products";
  public imgURL: string = '../../assets/images/mobilephone.jpg';
  candNm: string = 'Raja';
  userType: string | null = '';
  public discountProducts: boolean = true;
  public dayvalue: number = (new Date()).getDay();
  public day: string = "";
  public cities: city[] = [
    {
      ctyKey: 'chn',
      usrVal: 'Chennai'
    },
    {
      ctyKey: 'blr',
      usrVal: 'Bengalrur'
    },
    {
      ctyKey: 'hyd',
      usrVal: 'Hyderabad'
    },
    {
      ctyKey: 'tvm',
      usrVal: 'Tirvanthapuram'
    }
  ]
  public productCtgy: string[] = ['Groceries', 'Apparels', 'Veggies', 'Utensils', 'Games', 'plastics'];
  public productList: iProduct[] = []

  userCount: number = 0;
  constructor(private objRou: Router, private productSrv: ProductService) {

  }

  public ngOnInit(): void {

    console.log('parent compoent is initialized')


    //using dependency injection
    console.log(this.productSrv.prodID)
    this.productList = this.productSrv.getProductLst();

    this.userType = localStorage.getItem('userType');

    console.log('in product localstorage', this.userType);
    let userNm = sessionStorage.getItem('userName');
    console.log('in product session storage', userNm);


    //call service method which is calling backed api
    this.productSrv.getStoreProdcuts().subscribe(

      //success response
      (resp) => {
        console.log('inside the subcribe method')
        console.log('Backend Response', resp)
        this.productList = [];
        if (resp.length > 0) {
          resp.forEach((p: any) => {
            this.productList.push(
              {
                prodName: p.title,
                prdCtgy: p.category,
                price: p.price,
                prdImg: p.image,
                dsctAvl: false,
                productID: p.id,
                quantityAvl: 10
              }
            )
          })
        }
        // this.productList = [
        //   {
        //     prodName: resp[0].title,
        //     prdCtgy: resp[0].category,
        //     price: resp[0].price,
        //     prdImg: resp[0].image,
        //     dsctAvl: false,
        //     productID: resp[0].id,
        //     quantityAvl: 10
        //   },
        //   {
        //     prodName: resp[1].title,
        //     prdCtgy: resp[1].category,
        //     price: resp[1].price,
        //     prdImg: resp[1].image,
        //     dsctAvl: false,
        //     productID: resp[1].id,
        //     quantityAvl: 10
        //   },
        //   {
        //     prodName: resp[2].title,
        //     prdCtgy: resp[2].category,
        //     price: resp[2].price,
        //     prdImg: resp[2].image,
        //     dsctAvl: false,
        //     productID: resp[2].id,
        //     quantityAvl: 10
        //   }
        // ]

      },
      //error response
      // (err)=>{
      //   console.log(err)
      //   alert('server response failed, please try again later')
      // },
      //completed
      () => {
        console.log('completed');
      }

    );
    console.log('next to subscribe method')


    // if (this.userType == null) {
    //   this.objRou.navigateByUrl('/login')
    // }
    // this.productList.forEach(p => {
    //   console.log(p)
    //   p.price = '₹' + p.price;
    // })
  }
  public updateNm() {
    this.candNm = "Ramesh";
  }

  public getTodayDay(): string {
    let dayNumber: number = (new Date()).getDay();
    let todyDay: string = "";
    switch (dayNumber) {
      case 0:
        this.day = "Sunday";
        break;

      case 1:
        this.day = 'Monday';
        break;

      case 2:
        this.day = 'Tuesday';
        break;
      case 3:
        this.day = 'Wednesday';
        break;

      case 4:
        this.day = "Thursday";
        break;

      case 5:
        this.day = "Friday";
        break;

      case 6:
        this.day = "Saturday"
        break;

      default:
        this.day = "";
        break;
    }

    return this.day;
  }

  public redirectDtl(pId: number) {

    this.objRou.navigateByUrl('/product/product-details/' + pId);
  }


  getUpdatedCount(cnt: any) {
    this.userCount = cnt;
  }

  generateArray(val?: number): Array<number> {
    let tempArr: number[] = new Array(val);
    return tempArr;
  }

  updID() {
    this.prdID++;
  }
  showdetail() {
    this.prdDtlFlag = this.prdDtlFlag == true ? false : true;
  }

  ngOnDestroy(): void {
    console.log('component is destroyed');
    this.productSrv.prodID = 0;

  }
}
