import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { iProduct } from '../Model/Iproduct';
import { Observable } from 'rxjs';
import { storeProduct } from '../Model/storeproduct';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiBaseURL: string = environment.apiURL;
  prodID!: number;
  private prodLst: iProduct[] = [
    {
      productID: 101,
      prodName: 'Chcolate',
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
      prodName: 'Waffles',
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
      prodName: 'Cheery',
      price: 110.2365,
      prdCtgy: 'Diary',
      quantityAvl: 10,
      dsctAvl: false,
      dsctPer: 0.15568,
      prdImg: '../../assets/images/cheese.JPG',
      offerExpDt: new Date()
    }
  ]
  constructor(private router: Router, private http: HttpClient) { }

  getProductLst(): iProduct[] {
    return this.prodLst;
  }

  addProduct(prd: iProduct) {
    // this.http.post('http://localhost:8080/addprodut',{prd})

    this.prodLst.push(prd);

  }

  filterProductbyId(prodId: number): iProduct[] {

    return this.prodLst.filter(p => p.productID == prodId);
  }

  filterProductbyCategory(prodCategory: string): iProduct[] {
    return this.prodLst.filter(p => p.prdCtgy == prodCategory);
  }

  getProdLength(): number {
    return this.prodLst.length;
  }

  getStoreProdcuts(): Observable<any> {

    return this.http.get(this.apiBaseURL + '/products');
  }

  getProdById(prdId: number): Observable<any> {
    return this.http.get(this.apiBaseURL + '/products/' + prdId)
  }

  getUser(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  getLimitedProds(limitVal: number): Observable<any> {

    let prm = new HttpParams();
    prm = prm.append('limit', limitVal);

    return this.http.get(this.apiBaseURL + '/products', {
      params: prm
    })
  }

  addProductStore(prod: storeProduct): Observable<any> {

    // let nwProdut = {
    //   title: 'test product',
    //   price: 13.5,
    //   description: 'lorem ipsum set',
    //   image: 'https://i.pravatar.cc',
    //   category: 'electronic'
    // }

    let lgn = {
      userName:'asdas',
      pwd:'asdad'
    }

    let multProds = [
      {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      },
      {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      },
      {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }
    ]
    let httpBody = JSON.stringify(multProds);
    // let headerInfo = new HttpHeaders();
    // headerInfo = headerInfo.append('content-type', 'application/json');
    // headerInfo = headerInfo.append('Accept-Language', 'en-gb');
    return this.http.post(this.apiBaseURL + '/products', httpBody )

  }


}
