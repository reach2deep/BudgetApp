import { TransactionData } from './../../providers/transaction-data';
import { Transaction } from './../../models/transaction.model';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController, ItemSliding, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthService } from '../../providers/auth-service';
import { TransactionService } from '../../providers/TransactionService';
import { AuthManager } from '../../providers/AuthManager';


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
    transactionType : string='';

    private start:number=0;

    constructor(public navCtrl: NavController, 
        public transactionService: TransactionService, 
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public alertController: AlertController,
        public auth: AuthManager,
        public navParams: NavParams,
        public transactionData: TransactionData) {
     //   this.currentItems = this.loadItems() ;//this.expenseService.getItemsList();
        
        //, JSON.stringify(this.currentItems ));

       
        this.transactionType = this.navParams.data.pageReferrer;
        this.title=this.transactionType;
        console.log('****' , this.transactionType);

        if(this.transactionType===undefined)
        {
          this.transactionType = 'Expense';
          this.title=this.transactionType;
          console.log('****' , this.transactionType);
        }
      }

    


      ionViewDidLoad() {
       
        console.log('ionViewDidLoad #####');
        console.log('TRANS:' + JSON.stringify(this.trans));        
   
        this.loadPageData();
      }

      loadPageData()
      {
        this.auth.LoadingControllerShow();
        let referrer =this.transactionType;
        switch (referrer) {
          case '': {
            break;
          }
          case 'Expense': {            
            this.loadExpenseList('Expense');      
            break;
          }
          case 'Income': {            
            this.trans = this.transactionService.getIncomeList();     
            break;
          }
        }
        this.auth.LoadingControllerDismiss();
      }
        
          ionViewWillEnter() {
            console.log('ionViewWillEnter #####');
            console.log(this.transactionData.getReferrer());
            console.log(this.transactionData.ismodified);

            //this.pageReferrer = this.transactionData.getReferrer();           
                if (this.transactionData.ismodified) {
                  console.log('ionViewWillEnter ##### loadPageData');
                  this.loadPageData();
                
              }
            }

          
        
          search() {
            console.log('search here');
          }
        
          filterBy(size: string) {
            
          }
        
          newTransaction() {
            

           this.navCtrl.push('TransactionPage',  { paramTransactionType: this.transactionType, paramMode: 'New'});
          }
        
          edit(transaction) { 
          
          }
        
          delete(transaction, slidingItem: ItemSliding) {
          
          }
        
          clearTransaction(transaction) {
          }
        
          myHeaderFn(transaction, recordIndex, transactions) {
        
            console.log('myHeaderFn #####');
            let format = 'MMMM DD, YYYY (ddd)';    
            
            let thisTransDate = moment(transaction.expenseDate).format(format);
        
            // Get previous transaction
            let prevTransaction = transactions[recordIndex - 1];
            if (prevTransaction === undefined) {
              return thisTransDate;
            }
            let prevTransDate = moment(prevTransaction.expenseDate).format(format);//prevmoment.format(format);
        
            // Compare dates between this transaction and the previous transaction
            if (prevTransDate === thisTransDate) {
              return null;
            } else {
              // If dates are different, add header and supress bottom border
              prevTransaction.ionitemclass = "1";
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
          }


          itemCount;
          doInfinite(infiniteScroll) {

            console.log('doInfinite #####');
            
                    console.log('Begin async operation');
                    
                    console.log('doInfinite, start is currently '+this.start);
                    this.start+=50;
                    
                    this.loadExpenseList(this.transactionType).then(()=>{
                      infiniteScroll.complete();                     
                    });
            
                    console.log('Async operation has ended');
                    infiniteScroll.complete();
              }

              loadExpenseList(any) {
                
                return new Promise(resolve => {
                  
                  this.transactionService.getExpenseListPager(this.start,this.transactionType)
                  .subscribe(data => {
                    
                   this.trans=data;                    
                    resolve(true);
                    
                  });
                        
                });
            
              }


}
