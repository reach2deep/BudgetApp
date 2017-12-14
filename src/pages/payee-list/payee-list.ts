import { PayeeService } from './../../providers/PayeeService';
import { TransactionData } from './../../providers/transaction-data';
import { AuthService } from './../../providers/auth-service';
import { Component } from '@angular/core';

import { NavController , IonicPage} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'payeelist-page',
  templateUrl: 'payee-list.html'
})

export class PayeeListPage {
  
  searchTerm: string = '';
  transaction;
  payeeList: any;
  loadedPayeeList: any;
   
  constructor(
      public nav: NavController,
      public auth: AuthService,
      public payeeService: PayeeService,
      public transactionData: TransactionData) {}

  ionViewDidLoad() {
    this.payeeService.getPayeeList().subscribe(
    (payees) => {
      let arrpayees = [];
      payees.forEach(function(spanshot, key){
        //let payee = spanshot.val();
        let tempPayee = ({
          $key: spanshot._id,
          payeename: spanshot.name
        });
        arrpayees.push(tempPayee);
      });
      this.payeeList = arrpayees;
      this.loadedPayeeList = arrpayees;
      if (this.transactionData.getPayee() != '') {
        this.searchTerm = this.transactionData.getPayee();
        this.doFilterList(this.searchTerm);
      }
      this.auth.LoadingControllerDismiss();
    });
  }

  initializeItems(){
    this.payeeList = this.loadedPayeeList;
  }

  getItems(searchbar) {
    
    // Reset items back to all of the items
    this.initializeItems();

    // set q to the value of the searchbar
    var q = searchbar.srcElement.value;

    // if the value is an empty string don't filter the items
    if (!q) {
      return;
    }

    this.doFilterList(q);
  }

  doFilterList (q) {
    this.payeeList = this.payeeList.filter((v) => {
      if(v.payeename && q) {
        if (v.payeename.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  selectPayee(payee) {
    this.transactionData.setReferrer('PickPayeePage');
    this.transactionData.setPayee(payee.payeename);
    this.transactionData.setPayeeId(payee.$key);
    console.log(this.transactionData.payee);
    console.log(this.transactionData.payeeid);

    this.goBack();
  }

  goBack() {
    this.nav.pop();
  }

  savePayee() {
    // var newPayee = {
    //     'lastamount': '',
    //     'lastcategory': '',
    //     'lastcategoryid': '',
    //     'payeename': this.searchTerm
    // }
    // this.auth.addPayee(newPayee);
    //this.selectPayee(newPayee);
  }

}