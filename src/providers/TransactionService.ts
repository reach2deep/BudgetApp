import { Transaction } from './../models/transaction.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Api } from './api/api';
import { Item } from './../models/item';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { TransactionData } from './transaction-data';

@Injectable()
export class TransactionService {

  url: string = 'http://localhost:3000/api'; //'https://v-farm.herokuapp.com/api/';

  
  constructor(public http: HttpClient) { }

  query(params?: any) {
    return this.http.get(this.url + '/' +'transaction', params);
  }

  add(item: Transaction, type:String) :Observable<any>{    
    console.log('in add');
  //  return this.api.post('expense', item).map((res: Response) => {
  //     if (res) {
  //         if (res.status === 201) {
  //             return [{ status: res.status, json: res }]
  //         }
  //         else if (res.status === 200) {
  //             return [{ status: res.status, json: res }]
  //         }
  //     }
  // }), error => {
  //     if (error.status === 500)
  //      {
  //         return Observable.throw(new Error(error.status));
  //     }     
  // };


  return this.http.post(this.url + '/' +'transaction/'+type, item,
  {
    headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8'),
    observe :'response'
  }).map((res) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res);
        if (res) {
          console.log('success');
          console.log('res.status',res.status);
                 if (res.status === 201) {
                  console.log('201');
              return { status: res.status, json: res.body }
          }
          else if (res.status === 200) {
            console.log('200');
              return { status: res.status, json: res.body }
          }
         } else {
          err => {
            console.error('ERROR', res.statusText);
            return err;
          }
        }
      }, (err: HttpErrorResponse)  => {
          console.log(err.error);
      console.log(err.name);
      console.log(err.message);
      console.log(err.status);
        return err;
      });
  
      //return seq;
    
}

  delete(item: Item) {
  }

  /**
   * Send a GET request to get data
   */
  getItemsList(params?: any) :Observable<any>{    
    let seq = this.http.get(this.url + '/' +'transaction', params).share();

    seq.map((res: any) => {
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

  getExpenseList() : Observable<any> {
    // ...using get request
    let response = this.http.get(this.url + '/' +'transaction')
       // ...and calling .json() on the response to return data
       .map(response => response);
   return response;
}

perpage:number = 50;

getExpenseListPager(start:any,type:String) : Observable<any> {
  // ...using get request

  console.log(this.url + '/' +'transaction/'+type+'/?limit='+this.perpage+'&skip='+start);
  let response = this.http.get(this.url + '/' +'transaction/'+type+'/?limit='+this.perpage+'&skip='+start)
     // ...and calling .json() on the response to return data
     .map(response => response);
 return response;
}

getIncomeList() : Observable<any> {
  // ...using get request
  let response = this.http.get(this.url + '/' +'income')
     // ...and calling .json() on the response to return data
     .map(response => response);
 return response;
}


}
