import { Api } from './api/api';
import { Item } from './../models/item';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(public api: Api) { }

  // query(params?: any) {
  //   return this.api.get('/expense', params);
  // }

  add(item: Item) {
  }

  delete(item: Item) {
  }

  /**
   * Send a GET request to get data
   */
  getCategoryList(params?: any) : Observable<any>{    
    let seq = this.api.get('category',params).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.success == true) {
        console.log('success');
      
      } else {
        err => {
          console.error('ERROR', res.statusText);
        }
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  getProducts(params?: any) : Observable<any> {
    console.log('in getProducts');
    // ...using get request
    let response = this.api.get('category')
       // ...and calling .json() on the response to return data
       .map(response => response);
   return response;
}
// getFilteredTransactions(params?: any): Observable<any> {
//   //return this.api.get('/houses/' ,params).map(response: Response) as Observable<any[]>;
// }


}
