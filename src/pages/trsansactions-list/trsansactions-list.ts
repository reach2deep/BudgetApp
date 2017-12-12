import { ExpenseService } from './../../providers/ExpenseService';
import { Transaction } from './../../models/transaction.model';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController, ItemSliding } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthService } from '../../providers/auth-service';


@IonicPage()
@Component({
    //moduleId: 'module.id',
    selector: 'trsansactions-list-page',
    templateUrl: 'trsansactions-list.html',
    styleUrls: ['/trsansactions-list.scss']
})
export class TrsansactionsListPage {

    title: string;
    trans: Observable<any>;
    
    searchTerm: string = '';
   // equalToSubject: Subject<any>;
    //orderByChild: Subject<any>;
    balancetoday: string = '';
    balancerunning: string = '';
    balancecleared: string = '';
  
    startTime;
    elapsedTime;

    constructor(public navCtrl: NavController, 
        public expenseService: ExpenseService, 
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertController: AlertController,
        public auth: AuthService) {
     //   this.currentItems = this.loadItems() ;//this.expenseService.getItemsList();
        
        console.log('RES' );//, JSON.stringify(this.currentItems ));
      }

    


      ionViewDidLoad() {
        this.trans = this.expenseService.getProducts();
        console.log('TRANS:' + JSON.stringify(this.trans));
        
            //this.startTime = Date.now();
            //this.equalToSubject = new BehaviorSubject(null);
            //this.orderByChild = new BehaviorSubject('date');
            //this.trans = this.auth.getFilteredTransactions(this.account, this.orderByChild, this.equalToSubject);
            // this.trans.first().subscribe(snapshots => {
            //   this.auth.syncAccountBalances(this.account);
            //   this.auth.LoadingControllerDismiss();
            //   this.elapsedTime = Date.now() - this.startTime;
            //   //console.log(this.elapsedTime);
            // });
          }
        
          ionViewWillEnter() {
            // let referrer = this.transactionData.getReferrer();
            // switch (referrer) {
            //   case 'TransactionPage': {
            //     if (this.transactionData.ismodified) {
            //       this.auth.syncAccountBalances(this.account);
            //     }
            //     break;
            //   }
            // }
          }
        
          search() {
            console.log('search here');
          }
        
          filterBy(size: string) {
            //this.orderByChild.next('payeelower');
            //this.equalToSubject.next('starbucks');
          }
        
          newTransaction() {
            // this.transactionData.setReferrer('TransactionsPage');
            // this.transactionData.ismodified = false;
           //  this.nav.push(TransactionPage, {paramTransaction: '', paramAccount: this.account, paramMode: 'New'});

           this.navCtrl.push('TransactionPage',  { paramTransactionType: 'Expense', paramMode: 'New'});
          }
        
          edit(transaction) { 
            // this.transactionData.setReferrer('TransactionsPage');
            // this.nav.push(TransactionPage, { paramTransaction: transaction, paramAccount: this.account, paramMode: 'Edit' });
          }
        
          delete(transaction, slidingItem: ItemSliding) {
            // let alert = this.alertController.create({
            //   title: 'Please Confirm',
            //   message: 'Are you sure you want to delete this transaction?',
            //   buttons: [
            //     {
            //       text: 'Cancel',
            //       handler: () => {
            //         slidingItem.close();
            //       }
            //     },
            //     {
            //       text: 'Delete',
            //       cssClass: 'alertDanger',
            //       handler: () => {
            //         this.trans.remove(transaction.$key);
            //         this.auth.syncAccountBalances(this.account);
            //       }
            //     }
            //   ]
            // });
            // alert.present();
          }
        
          clearTransaction(transaction) {
            // this.trans.update(transaction.$key, { 'iscleared': transaction.iscleared });
            // this.auth.syncAccountBalances(this.account);sa
          }
        
          myHeaderFn(transaction, recordIndex, transactions) {

            console.log('transaction:' + JSON.stringify(transaction));
            console.log('recordIndex:' + JSON.stringify(recordIndex));
            console.log('transactions:' + JSON.stringify(transactions));

            console.log('transaction.expenseDate:' + transaction.expenseDate);

            console.log('transaction.expenseDate/1000 :' +(transaction.expenseDate - 1000));
        
            let format = 'MMMM DD, YYYY (ddd)';    
            //let dtdb = transaction.expenseDate - 1000;
            //let thismoment = moment.unix(dtdb);
            let thisTransDate = moment(transaction.expenseDate).format(format);

            console.log('thisTransDate :' + thisTransDate);
        
            // Get previous transaction
            let prevTransaction = transactions[recordIndex - 1];
            if (prevTransaction === undefined) {
              return thisTransDate;
            }
        
            // Get date for previous transaction
            // let dtprev = prevTransaction.date - 1000;
            // let prevmoment = moment.unix(dtprev);
            let prevTransDate = moment(prevTransaction.expenseDate).format(format);//prevmoment.format(format);
        
            // Compare dates between this transaction and the previous transaction
            if (prevTransDate === thisTransDate) {
              return null;
            } else {
              // If dates are different, add header and supress bottom border
              //prevTransaction.ionitemclass = "1";
              return thisTransDate;
            }
        
          }
        
          getItems(searchbar) {
            var q = searchbar.srcElement.value;
            if (!q) {
              this.doFilterList(null);
            } else {
              this.doFilterList(q);
            }
          }
        
          doFilterList (q) {
            console.log(q);
            //this.orderByChild.next('payeelower');
           // this.equalToSubject.next(q);
          }


}
